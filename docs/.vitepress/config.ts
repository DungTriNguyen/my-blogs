import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dũng Nguyễn Blog",
  description: "Chia sẻ kinh nghiệm thực chiến lập trình React Native, tối ưu hiệu năng và quy chuẩn Clean Code.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Trang chủ", link: "/" }],

    sidebar: [
      {
        text: "📱 Lập Trình React Native",
        items: [
          {
            text: "Firebase FCM Cloud Messaging",
            link: "/react-native-with-firebase-fcm",
          },
          {
            text: "Hot Updater OTA Cloudflare",
            link: "/hot-updater-cloudflare-react-native",
          },
          {
            text: "Google Sign-In Authentication",
            link: "/google-react-native-authentication",
          },
          {
            text: "Xcode Instruments & Tối Ưu RAM",
            link: "/instrument-performance",
          },
        ],
      },
      {
        text: "💻 Kỹ Năng & Quy Chuẩn",
        items: [
          {
            text: "Nghệ Thuật Viết Code Sạch",
            link: "/clean-code",
          },
          {
            text: "Làm Chủ Dòng Lệnh Terminal",
            link: "/learn-code-terminal",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/DungTriNguyen" }],
  },
});
