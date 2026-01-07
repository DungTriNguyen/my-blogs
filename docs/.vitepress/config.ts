import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "dung-nguyen-blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          {
            text: "Firebase FCM (React Native)",
            link: "/react-native-with-firebase-fcm",
          },
          {
            text: "Hot Updater Cloudflare (React Native)",
            link: "/hot-updater-cloudflare-react-native",
          },
          {
            text: "Login with Google Auth (React Native)",
            link: "/google-react-native-authentication",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
