---
name: vitepress-blogs-dev
description: Kỹ năng và quy tắc phát triển, thêm bài viết mới cho dự án VitePress Blogs.
---

# 🚀 Kỹ Năng Phát Triển Dự Án VitePress Blogs (SKILL.md)

Chào mừng bạn đến với tài liệu hướng dẫn phát triển và quản trị dự án **VitePress Blogs**! Tài liệu này đóng vai trò như một cẩm nang kỹ thuật giúp bạn vận hành, chỉnh sửa, và mở rộng blog một cách tối ưu, chuyên nghiệp và nhất quán nhất.

---

## 📌 1. Tổng Quan Dự Án & Định Hướng Nội Dung
Dự án **vite-press-blogs** là một trang blog công nghệ siêu nhẹ và tốc độ cao được xây dựng trên nền tảng **VitePress** và quản lý runtime bằng **Bun**. 
* **Chủ đề chính**: Các bài viết chia sẻ chuyên sâu về lập trình Mobile (React Native, Expo), cấu hình hệ thống (Firebase FCM, Google Auth, Hot Updater OTA qua Cloudflare/AWS S3), và kỹ năng thao tác Terminal.
* **Đối tượng người đọc**: Lập trình viên Mobile và DevOps đang tìm kiếm hướng dẫn cấu hình thực tế và nhanh chóng.

---

## 📂 2. Cấu Trúc Mã Nguồn (Project Structure)
Hiểu rõ cấu trúc thư mục giúp bạn dễ dàng bổ sung nội dung và tùy biến giao diện:

```text
vite-press-blogs/
├── .git/                 # Quản lý phiên bản Git
├── .agents/              # Thư mục kỹ năng cho AI Agent (Antigravity)
│   └── skills/
│       └── vitepress-blogs/
│           └── SKILL.md  # File định nghĩa kỹ năng này
├── .vitepress/           # Thư mục cấu hình cốt lõi của VitePress
│   └── config.js         # Tùy chỉnh tiêu đề, mô tả, sidebar, navbar, theme
├── docs/                 # Thư mục chứa toàn bộ bài viết (Markdown)
│   ├── public/           # Tài nguyên tĩnh được sử dụng trong bài viết
│   │   ├── images/       # Chứa các ảnh minh họa (PNG, JPG, WEBP)
│   │   └── videos/       # Chứa các video mô phỏng (MOV, MP4, WebM)
│   ├── api-examples.md    # Bài mẫu minh họa API VitePress
│   ├── markdown-examples.md # Bài mẫu minh họa cú pháp Markdown
│   ├── google-react-native-authentication.md # Hướng dẫn Google Sign In
│   ├── hot-updater-cloudflare-react-native.md # Hướng dẫn cấu hình OTA Hot Updater
│   ├── react-native-with-firebase-fcm.md # Hướng dẫn cấu hình Firebase Cloud Messaging
│   ├── learn-code-terminal.md # Cẩm nang phím tắt & câu lệnh Terminal
│   └── index.md          # Giao diện trang chủ (Home Page Layout)
├── package.json          # Quản lý script khởi chạy & thư viện phụ thuộc
├── tsconfig.json         # Cấu hình TypeScript (nếu mở rộng thêm component Vue)
├── bun.lock              # Lockfile quản lý package của Bun
└── README.md             # Tài liệu giới thiệu nhanh dự án
```

---

## 🛠️ 3. Quy Trình Vận Hành & Lệnh CLI (Workflow Commands)
Sử dụng **Bun** làm trình quản lý gói chính để đạt hiệu năng tối ưu:

| Câu lệnh | Mục đích | Tần suất sử dụng |
| :--- | :--- | :--- |
| `bun install` | Cài đặt toàn bộ thư viện cần thiết | Khi setup dự án mới hoặc cập nhật thư viện. |
| `bun docs:dev` | Khởi chạy máy chủ phát triển cục bộ (`http://localhost:5173`) | Thường xuyên khi viết bài hoặc chỉnh sửa cấu hình. |
| `bun docs:build` | Biên dịch toàn bộ tài liệu Markdown thành trang tĩnh (HTML/CSS/JS) | Trước khi deploy lên server hoặc hosting (Netlify, Vercel, Cloudflare Pages). |
| `bun docs:preview` | Xem trước bản build tĩnh ở local để kiểm tra lỗi hiển thị | Sau khi build và trước khi deploy. |

---

## ✍️ 4. Hướng Dẫn Soạn Thảo & Thêm Bài Viết Mới (Writing Guidelines)
Để bài viết mới đồng bộ với giao diện và phong cách hiện tại, hãy tuân thủ các quy tắc sau:

### 4.1. Quy ước đặt tên file (Naming Convention)
* Định dạng: Sử dụng chữ thường, phân tách bằng dấu gạch ngang (kebab-case).
* Ví dụ: `huong-dan-viet-bai-moi.md`, `deploy-vitepress-vercel.md`.

### 4.2. Cấu trúc Frontmatter (Phần đầu file)
Mỗi bài viết nên khai báo Frontmatter ở đầu file để cấu hình Outline, Giao diện hoặc SEO:
```markdown
---
title: Tiêu đề bài viết (dùng cho SEO và Title Tab)
description: Mô tả ngắn gọn nội dung bài viết
outline: deep # Cho phép hiển thị mục lục chi tiết bên phải (H2, H3, H4)
---
```

### 4.3. Chèn ảnh và Video (Media Assets)
* Luôn lưu trữ hình ảnh trong `docs/public/images/` và video trong `docs/public/videos/`.
* **Cách chèn hình ảnh**:
  ```markdown
  ![Mô tả ảnh](./public/images/ten-file-anh.webp)
  ```
* **Cách chèn video (hỗ trợ điều khiển autoplay/controls)**:
  ```html
  <video width="100%" height="480" controls>
    <source src="./public/videos/ten-video.mov" type="video/quicktime">
  </video>
  ```

---

## 💡 5. Kỹ Năng Markdown Nâng Cao & Trang Trí Bài Viết
Để các bài viết trở nên chuyên nghiệp và bắt mắt, bạn nên sử dụng các tính năng nâng cao của VitePress:

### 5.1. Sử dụng Alert Boxes (Custom Containers)
Để nhấn mạnh các lưu ý quan trọng, hãy dùng cú pháp container của VitePress:

::: info ℹ️ THÔNG TIN CHUNG
Đây là một lưu ý cung cấp thêm thông tin hữu ích cho người đọc.
:::

::: tip 💡 MẸO HAY
Mẹo nhỏ giúp thực hiện thao tác nhanh hơn hoặc tối ưu hơn.
:::

::: warning ⚠️ CẢNH BÁO
Những điều cần lưu ý tránh làm sai dẫn đến lỗi cấu hình.
:::

::: danger 🔥 NGUY HIỂM
Các thao tác có thể gây mất mát dữ liệu hoặc ảnh hưởng nghiêm trọng đến hệ thống.
:::

### 5.2. Định dạng Code Block sinh động
Luôn chỉ định rõ ngôn ngữ trong block code (ví dụ: `js`, `bash`, `json`, `yaml`, `md`, `typescript`) để trình hiển thị thực hiện highlight cú pháp chuẩn xác nhất:
```typescript
// Ví dụ về highlight code Typescript
const welcomeMessage: string = "Chào mừng tới thế giới VitePress!";
console.log(welcomeMessage);
```

---

## 📈 6. Kế Hoạch Mở Rộng Hệ Thống (Roadmap & Upgrades)
Để blog ngày càng chuyên nghiệp hơn, dưới đây là các bước tối ưu hóa tiếp theo bạn có thể thực hiện:
1. **Cấu hình Sidebar & Navbar**: Cập nhật `.vitepress/config.js` để tổ chức các bài viết theo danh mục (Ví dụ: nhóm bài "React Native", nhóm bài "Terminal & Tools").
2. **SEO Optimization**: Bổ sung thẻ `meta` nâng cao, cấu hình `sitemap` để tăng thứ hạng tìm kiếm trên Google.
3. **Deploy Tự Động (CI/CD)**: Kết nối kho lưu trữ GitHub với Cloudflare Pages hoặc Vercel để kích hoạt tự động xây dựng và xuất bản mỗi khi bạn push bài viết mới lên nhánh `main`.
