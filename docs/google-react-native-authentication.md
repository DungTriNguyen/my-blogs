---
title: Tích Hợp Google Sign-In Trong Expo React Native
description: Cẩm nang cấu hình và triển khai xác thực Google Sign-In trong ứng dụng di động Expo/React Native chi tiết từ môi trường thử nghiệm đến phát hành chính thức.
outline: deep
---

# 🔐 Tích Hợp Google Sign-In Trong Expo React Native

> [!IMPORTANT]
> **Tại sao nên sử dụng thư viện `@react-native-google-signin/google-signin` thay vì `expo-auth-session`?**
> Thư viện mặc định `expo-auth-session` của Expo thường gặp phải các vấn đề nghiêm trọng liên quan đến cơ chế chuyển hướng liên kết sâu (Deep Link) trên một số phiên bản hệ điều hành di động, dẫn đến việc ứng dụng không thể tiếp nhận phản hồi từ trang xác thực của Google.
> * Bạn có thể đọc thảo luận chi tiết về lỗi này tại: [Expo GitHub Issues | Google OAuth Bug](https://github.com/expo/expo/issues/9677#issuecomment-782558428)
>
> **Giải pháp tối ưu:** Sử dụng thư viện Native `@react-native-google-signin/google-signin` thông qua Expo Prebuild để đảm bảo trải nghiệm đăng nhập mượt mà và ổn định nhất.

---

## 🛠️ 1. Cấu Hình Dự Án Expo (Không Dùng Firebase)

Nếu dự án của bạn không tích hợp dịch vụ Firebase mà kết nối trực tiếp đến Google Cloud Console, bạn cần cấu hình khóa `iosUrlScheme` trong tệp cấu hình của Expo:

### 📌 Cấu hình tệp `app.json`
Thêm plugin cấu hình của Google Sign-in vào danh sách plugins trong dự án của bạn:

```json
{
  "expo": {
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps.123456789-xxxxxx"
        }
      ]
    ]
  }
}
```
* Làm thế nào để lấy được khóa `iosUrlScheme`? Hãy xem hướng dẫn chi tiết tại: [Hướng dẫn lấy file cấu hình iOS](https://react-native-google-signin.github.io/docs/setting-up/get-config-file?firebase-or-not=cloud-console#ios)

---

## 🚀 2. Tạo Thư Mục Bản Địa (Expo Prebuild)

Do thư viện Google Sign-In sử dụng các API native trực tiếp từ Android SDK và iOS SDK, bạn cần biên dịch dự án dưới dạng Native Project:

```bash
# Tạo/cập nhật lại các thư mục native android và ios
npx expo prebuild --clean

# Chạy ứng dụng trên thiết bị giả lập hoặc thiết bị thật ở chế độ Development
npx expo run:android
npx expo run:ios
```
* Xem thêm hướng dẫn thiết lập chi tiết tại: [Tài liệu cài đặt Google Sign-in](https://react-native-google-signin.github.io/docs/setting-up/get-config-file)

---

## 🛰️ 3. Quy Trình Xác Thực Phía Backend (API Integration)

Khi người dùng đăng nhập thành công ở phía Client App, bạn sẽ nhận được một `accessToken` hoặc `idToken` từ Google. Bạn cần gửi các tham số này lên API của Server doanh nghiệp để xác minh danh tính và khởi tạo phiên làm việc (Access/Refresh Token nội bộ).

### 📌 Cấu trúc dữ liệu yêu cầu (API Payload)
```json
{
  "tenant-id": "YOUR_EXPO_PUBLIC_TENANT_ID",
  "client_id": "YOUR_EXPO_PUBLIC_APP_ID",
  "client_secret": "YOUR_EXPO_PUBLIC_APP_SECRET",
  "google_mobile_ac": "access_token_nhan_duoc_tu_client",
  "grant_type": "exchange-google-mobile-to-tenant-token"
}
```

### 📌 Định nghĩa các kiểu xác thực (Grant Types Enum)
```typescript
enum GRANT_TYPE {
  EMAIL_OTP = 'email-otp',
  PHONE_OTP = 'phone-otp',
  REFRESH_TOKEN = 'refresh_token',
  FACEBOOK_AC = 'exchange-fb-mobile-to-tenant-token',
  GOOGLE_AC = 'exchange-google-mobile-to-tenant-token'
}
```

---

## ☁️ 4. Thiết Lập Trên Google Cloud Console

Để ứng dụng của bạn được phép giao tiếp với API của Google, bạn cần đăng ký Client ID trên trang điều khiển lập trình viên:

1. Truy cập **Google Cloud Console** $\rightarrow$ Chọn dự án của bạn.
2. Tìm đến menu **APIs & Services** $\rightarrow$ **Credentials**.
3. Nhấp vào nút **Create Credentials** và chọn **OAuth client ID**.
4. Lần lượt tạo các Client ID tương ứng cho từng môi trường:
   * **Android**: Cần cấu hình chính xác mã vân tay chữ ký **SHA-1** của tệp keystore để Google tự động phê duyệt ngầm mà không cần điền clientId thủ công trong code.
   * **iOS**: Điền đúng Bundle Identifier của ứng dụng.

---

## 🔑 5. Cách Lấy Mã Vân Tay Chữ Ký SHA-1 (Debug Fingerprint)

Để lấy được mã SHA-1 của môi trường phát triển (Debug), hãy chạy lệnh sau tại thư mục gốc của dự án:

```bash
# Lấy danh sách chữ ký bảo mật keystore
keytool -keystore android/app/debug.keystore -list -v
```
* **Mật khẩu mặc định của Keystore**: Thường là `android` (viết thường).

---

## 🎯 6. Cấu Hìn Khi Đưa Lên Môi Trường Sản Xuất (Production)

::: warning ⚠️ BƯỚC QUAN TRỌNG KHI PHÁT HÀNH
Khi bạn phát hành ứng dụng lên Google Play Store, chữ ký số của ứng dụng sẽ được Play Store tự động ký lại (Google Play App Signing). Do đó chữ ký SHA-1 trên máy phát triển cá nhân của bạn sẽ không còn trùng khớp với ứng dụng thực tế trên Store.
:::

Để lấy chính xác mã SHA-1 cho môi trường production, hãy thực hiện theo các bước sau:
1. Đăng nhập vào **Google Play Console** $\rightarrow$ Chọn ứng dụng của bạn.
2. Tìm đến mục **Test and release** $\rightarrow$ **App integrity** $\rightarrow$ Chọn thẻ **App Signing**.
3. Copy mã vân tay **SHA-1 certificate fingerprint**.
4. Truy cập **Google Cloud Console** $\rightarrow$ Tạo mới hoặc cập nhật một OAuth Client ID cho Android bằng mã SHA-1 vừa sao chép ở trên.

---

> [!TIP]
> **Đăng nhập bằng tài khoản Apple (iOS):**
> Nếu dự án của bạn yêu cầu hỗ trợ thêm đăng nhập bằng tài khoản Apple (Apple Sign-in), hãy tham khảo hướng dẫn chính thức và thư viện Expo tại:
> * 🔗 [Expo AppleAuthentication | Expo Documentation](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)

---

> **Chúc bạn cấu hình hệ thống xác thực thành công và bảo mật! 🔐**
