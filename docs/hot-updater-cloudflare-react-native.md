---
outline: deep
---
<!-- <iframe
  width="100%"
  height="420"
  src="/videos/deploy.mov"
  title="HotUpdater Video"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe> -->

# [Hot Updater](https://hot-updater.dev/) [CloudFlare](https://www.cloudflare.com/)

### Giới thiệu

Hot Updater is a powerful alternative to react-native-codepush that provides self-hostable Over-The-Air (OTA) update capabilities for React Native applications. Unlike traditional app store updates, Hot Updater allows you to instantly update your JavaScript bundle, enabling rapid deployment of bug fixes and feature updates without waiting for app store approval.

<video width="100%" height="480" controls>
  <source src="./public/videos/deploy.mov" type="video/quicktime" />
  Trình duyệt của bạn không hỗ trợ video.
</video>

## Tại sao phải sử dụng Hot Updater

Self-Hosting: Maintain complete control over your update infrastructure and data
Multi-Platform Support: Seamless compatibility with both iOS and Android platforms
Flexible Deployment: Support for multiple environments and channels

## AWS S3 Storage + Lambda@Edge
In this comprehensive guide, we'll walk through setting up Hot Updater using the AWS S3 Storage + Lambda@Edge Function provider for storing React Native bundles in the cloud. Hot Updater supports multiple providers as shown below.

## Mô hình Connect

![Firebase System](./public/images/firebase-system.png)

### Bước 1: Tạo project ở [firebase console](https://console.firebase.google.com/u/1/)

![Firebase System](./public/images/firebase-console-project.png)

### Bước 2: Cài package cần thiết

```md
# Install & setup the app module

yarn add @react-native-firebase/app

# Install the messaging module

yarn add @react-native-firebase/messaging
```

### Bước 3: Tạo App trong project đã tạo ở firebase console (IOS/android)

![Firebase System](./public/images/firebase-project-ios.png)

### Bước 4: Tải file GoogleService-Info.plist (IOS), google-services.json (android) và config trong app.json

```md
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

### Bước 5: Configure Firebase with iOS credentials (react-native 0.77+)

[Configure Firebase with iOS credentials (react-native 0.77+)](https://rnfirebase.io/#configure-firebase-with-ios-credentials-react-native-077)

### Bước 6: For IOS => config: steps by steps

[iOS Messaging Setup | React Native Firebase](https://rnfirebase.io/messaging/usage/ios-setup)

Note: config error in podfile [Swift pods cannot yet be integrated as static libraries FirebaseCoreInternal-library](https://stackoverflow.com/questions/72289521/swift-pods-cannot-yet-be-integrated-as-static-libraries-firebasecoreinternal-lib)

### Bước 7: Setup in frontend (layout.tsx or App.tsx)

[Cloud Messaging | React Native Firebase](https://rnfirebase.io/messaging/usage#android---requesting-permissions)

### Bước 8: Build in xcode and test

## Thanks you
