---
title: Tích Hợp Firebase FCM Trong React Native
description: Hướng dẫn tích hợp Firebase Cloud Messaging (FCM) để nhận Push Notification trên iOS và Android với Expo/React Native chi tiết nhất.
outline: deep
---

# 📱 Tích Hợp Firebase FCM Trong React Native

> [!IMPORTANT]
> **Điều Kiện Tiên Quyết:** Bạn bắt buộc phải cấu hình [React Native Firebase](https://rnfirebase.io/) trong dự án vì **Firebase Cloud Messaging (FCM)** là nền tảng trung gian cốt lõi giúp thiết bị đăng ký Token, giao tiếp với máy chủ, và tiếp nhận các thông báo đẩy (Push Notifications) một cách ổn định nhất trên cả Android và iOS. Không có FCM, ứng dụng di động của bạn sẽ thiếu đi kênh giao tiếp thời gian thực chung để nhận tin nhắn từ Backend.

---

## 📊 1. Mô Hình Kết Nối (Connection Flow)

Mô hình hoạt động của FCM dựa trên kiến trúc 3 thành phần chính: **Client App (React Native)** $\leftrightarrow$ **Firebase Cloud Messaging Services** $\leftrightarrow$ **App Server (Backend)**.

![Firebase System](/images/firebase-system.png)

---

## 🛠️ 2. Quy Trình Thiết Lập Từng Bước (Step-by-Step)

### 📌 Bước 1: Tạo dự án tại Firebase Console
Truy cập [Firebase Console](https://console.firebase.google.com/u/1/) và tạo một dự án mới cho tổ chức hoặc cá nhân của bạn.

![Firebase Console Project](/images/firebase-console-project.png)

---

### 📌 Bước 2: Cài đặt các Package cần thiết
Trong thư mục gốc của dự án React Native, hãy cài đặt các gói thư viện Firebase cơ bản của cộng đồng:

```bash
# Cài đặt mô-đun Firebase Core App
yarn add @react-native-firebase/app

# Cài đặt mô-đun Firebase Cloud Messaging
yarn add @react-native-firebase/messaging
```

---

### 📌 Bước 3: Đăng ký ứng dụng nền tảng (Android / iOS)
Tại màn hình tổng quan dự án trên Firebase Console, lần lượt chọn biểu tượng Android và iOS để thêm cấu hình tương ứng cho ứng dụng của bạn.

![Firebase Register App](/images/firebase-project-ios.png)

---

### 📌 Bước 4: Tải file cấu hình & Thiết lập trong `app.json`
* Tải xuống tệp `google-services.json` đối với Android.
* Tải xuống tệp `GoogleService-Info.plist` đối với iOS.
* Đặt cả hai file này ở thư mục gốc hoặc đường dẫn bạn chọn cấu hình trong dự án. Cấu hình plugin trong file `app.json` của Expo như sau:

```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.mycorp.myapp"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.mycorp.myapp"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

---

### 📌 Bước 5: Cấu hình Firebase iOS Credentials (React Native 0.77+)
Kể từ React Native phiên bản `0.77+`, quá trình liên kết thư viện tĩnh yêu cầu thêm một số tinh chỉnh đặc thù về Podfile và định danh Apple Development.
* Tham khảo hướng dẫn chi tiết tại: [Configure Firebase with iOS credentials (react-native 0.77+)](https://rnfirebase.io/#configure-firebase-with-ios-credentials-react-native-077)

---

### 📌 Bước 6: Cấu hình chứng chỉ đẩy cho iOS (APNs Setup)
iOS yêu cầu cơ chế bảo mật nghiêm ngặt hơn thông qua Apple Push Notification service (APNs). Bạn cần:
1. Tạo khoá **APNs Auth Key (.p8)** trên trang Apple Developer.
2. Tải khóa lên phần cài đặt Cloud Messaging của Firebase Console.
* Đọc tài liệu hướng dẫn từng bước của Firebase: [iOS Messaging Setup | React Native Firebase](https://rnfirebase.io/messaging/usage/ios-setup)

::: warning ⚠️ LƯU Ý KHI BUILD TRÊN PODFILE
Nếu gặp lỗi tích hợp thư viện tĩnh dạng:
> *Swift pods cannot yet be integrated as static libraries FirebaseCoreInternal-library*
  
Hãy tham khảo cách giải quyết lỗi xung đột này tại bài thảo luận: [StackOverflow Solution](https://stackoverflow.com/questions/72289521/swift-pods-cannot-yet-be-integrated-as-static-libraries-firebasecoreinternal-lib)
:::

---

### 📌 Bước 7: Khởi tạo code lắng nghe thông báo trong Frontend
Đặt logic đăng ký quyền và nhận diện sự kiện thông báo tại điểm khởi đầu của ứng dụng (ví dụ: `App.tsx` hoặc tệp Root Layout của bạn):

```typescript
import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFcmToken();
    }
  }

  async function getFcmToken() {
    try {
      const token = await messaging().getToken();
      console.log('🔥 FCM Token của bạn là:', token);
      // Gửi token này lên Backend server của bạn để lưu lại và gửi thông báo sau này
    } catch (error) {
      console.error('Không thể lấy FCM Token:', error);
    }
  }

  useEffect(() => {
    // 1. Yêu cầu quyền thông báo
    requestUserPermission();

    // 2. Lắng nghe thông báo khi ứng dụng đang chạy ở Foreground (màn hình hoạt động)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title ?? 'Thông báo mới',
        remoteMessage.notification?.body ?? ''
      );
    });

    // 3. Xử lý khi nhấn vào thông báo và mở app từ trạng thái Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App mở từ trạng thái background bởi thông báo:', remoteMessage.notification);
    });

    // 4. Xử lý khi ứng dụng bị tắt hẳn (Quit state) và mở lại bằng thông báo
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App mở từ trạng thái bị tắt hẳn bởi thông báo:', remoteMessage.notification);
        }
      });

    return unsubscribe;
  }, []);

  return (
    // ... UI chính của app
    null
  );
}
```
* Xem tài liệu đầy đủ về thiết lập frontend: [Cloud Messaging | React Native Firebase](https://rnfirebase.io/messaging/usage#android---requesting-permissions)

---

### 📌 Bước 8: Biên dịch (Build) ứng dụng và Kiểm thử
Hãy chạy ứng dụng trên thiết bị thật thông qua Xcode / Android Studio để kiểm thử việc gửi tin nhắn mẫu từ thẻ "Compose notification" trên Firebase Console.

> **Chúc bạn tích hợp thành công! 🎉**
