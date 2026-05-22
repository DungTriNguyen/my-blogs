---
title: Tự Host Cập Nhật OTA Với Hot Updater & Cloudflare/S3
description: Hướng dẫn cài đặt giải pháp cập nhật ứng dụng tức thì (Over-The-Air) tự host thay thế CodePush sử dụng Hot Updater, AWS S3/Cloudflare R2 và Lambda@Edge.
outline: deep
---

# ⚡ Tự Host Cập Nhật OTA Với Hot Updater & Cloudflare/S3

> [!TIP]
> **Over-The-Air (OTA) là gì?** Không giống như các bản cập nhật ứng dụng truyền thống qua App Store hoặc Google Play Store đòi hỏi phê duyệt phức tạp, **OTA** cho phép bạn ngay lập tức cập nhật gói mã nguồn JavaScript Bundle của React Native. Điều này giúp sửa các lỗi khẩn cấp và triển khai tính năng mới đến tay người dùng cuối trong vài giây.

[Hot Updater](https://hot-updater.dev/) là một thư viện mã nguồn mở mạnh mẽ thay thế hoàn hảo cho *Microsoft React Native CodePush* đã lỗi thời, hỗ trợ cơ chế lưu trữ tự vận hành (Self-Hostable) hoàn toàn miễn phí và an toàn bảo mật tuyệt đối.

---

## 🎬 1. Minh Họa Quy Trình Triển Khai (Deployment Demo)

Hãy xem video ghi lại quá trình đẩy một bản cập nhật bundle mới siêu tốc từ CLI lên máy chủ tự host và thiết bị lập tức nhận bản cập nhật:

<div style="border-radius: 12px; overflow: hidden; margin: 20px 0; border: 1px solid var(--vp-c-brand-light);">
  <video width="100%" height="auto" autoplay muted loop controls>
    <source src="/videos/deploy.mov" type="video/quicktime">
    Trình duyệt của bạn không hỗ trợ tag video.
  </video>
</div>

---

## 🚀 2. Tại Sao Nên Chọn Hot Updater?

* **Chủ động 100% (Self-Hosting):** Toàn quyền kiểm soát cơ sở hạ tầng, khóa ký số và cơ sở dữ liệu lưu trữ cập nhật của bạn mà không phụ thuộc bên thứ ba.
* **Đa nền tảng (Multi-Platform):** Tương thích hoàn hảo với cả ứng dụng chạy Expo hoặc React Native CLI (iOS & Android).
* **Môi trường linh hoạt (Flexible Channels):** Phân chia luồng cập nhật theo các kênh như `Development`, `Staging`, `Production` dễ dàng.

---

## 📐 3. Kiến Trúc AWS S3 / Cloudflare R2 + Lambda@Edge

Hệ thống hoạt động bằng cách lưu trữ các bản phân phối JS Bundle nén dưới dạng tệp tin tĩnh trên Cloud Storage (như Amazon S3 hoặc Cloudflare R2). Một hàm serverless như **Lambda@Edge** hoặc **Cloudflare Workers** sẽ chịu trách nhiệm kiểm tra phiên bản từ thiết bị gửi lên và trả về tệp bundle phù hợp nhất.

![Kiến Trúc Hot Updater S3](/images/hot-updater-ws3.webp)

---

## 🛠️ 4. Hướng Dẫn Cấu Hình Từng Bước

### 📌 A. Điều kiện chuẩn bị
1. **Node.js**: Phiên bản `20.x` trở lên để đảm bảo tính ổn định của bundler.
2. **AWS CLI** hoặc **Wrangler (Cloudflare CLI)**: Đã được cấu hình quyền quản trị bộ nhớ lưu trữ Cloud.

### 📌 B. Cài đặt Hot Updater SDK
Cài đặt thư viện máy khách (Client library) trong dự án React Native của bạn:

```bash
# Cài đặt client SDK cho ứng dụng React Native
yarn add @hot-updater/react-native
```

### 📌 C. Thiết lập mã nguồn kiểm tra OTA trong App
Tích hợp đoạn mã sau tại điểm khởi chạy ứng dụng để tự động dò tìm bản cập nhật khi người dùng mở ứng dụng:

```typescript
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HotUpdater } from '@hot-updater/react-native';

export default function App() {
  useEffect(() => {
    // Cấu hình endpoint API cập nhật tự host của bạn
    HotUpdater.initialize({
      source: 'https://ota.yourcompany.com/api/update',
      enabled: !__DEV__, // Chỉ bật khi chạy thực tế (không phải môi trường Debug dev)
    });

    // Thực hiện kiểm tra bản cập nhật mới
    const checkAndInstallUpdates = async () => {
      try {
        const update = await HotUpdater.checkForUpdate();
        if (update && update.shouldUpdate) {
          console.log('🔄 Đang tải bản cập nhật mới:', update.version);
          await HotUpdater.downloadUpdate();
          console.log('🎉 Đã cài đặt! Khởi động lại ứng dụng để áp dụng...');
          await HotUpdater.reload();
        } else {
          console.log('✨ Ứng dụng đã ở phiên bản mới nhất!');
        }
      } catch (err) {
        console.warn('⚠️ Lỗi kiểm tra cập nhật OTA:', err);
      }
    };

    checkAndInstallUpdates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Production App v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  text: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});
```

---

## 📖 5. Tài Liệu Tham Khảo Nâng Cao

> [!NOTE]
> Bạn có thể tham khảo bài viết hướng dẫn chi tiết từng bước xây dựng hạ tầng lưu trữ AWS S3 kết hợp CloudFront CDN và Lambda@Edge tại Dev.to:
> * 🔗 [Complete Guide OTA: Setting up Hot Updater with AWS S3 on Dev.to](https://dev.to/ajmal_hasan/complete-guide-ota-setting-up-hot-updater-with-aws-s3-and-lambdaedge-for-react-native-11mb)
> 
> Đọc tài liệu API và cách cấu hình các Driver lưu trữ khác (như Azure, Google Cloud Storage, Cloudflare R2) tại:
> * 🔗 [Tài liệu chính thức Hot Updater CLI & SDK](https://hot-updater.dev/docs/get-started/introduction/)

---

> **Cảm ơn bạn đã theo dõi bài viết! Chúc hệ thống OTA của bạn vận hành trơn tru! 🚀**
