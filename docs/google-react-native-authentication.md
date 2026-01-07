# [Google Sign In Install](https://react-native-google-signin.github.io/docs/install)

Firstly, we have to understand why we using @react-native-google-signin/google-signin instead of expo-auth-session. Because there is a error with deeplink that expo unable to handle. 
[Common issues | 2. Google OAuth ](https://github.com/expo/expo/issues/9677#issuecomment-782558428)

Workaround: Downgrade the project to lower SDK version or just switch to other libraries.

# Expo setup without Firebase

If you're not using Firebase, provide the iosUrlScheme option to the config plugin.
To obtain iosUrlScheme, follow [these instructions](https://react-native-google-signin.github.io/docs/setting-up/get-config-file?firebase-or-not=cloud-console#ios).

### app.json

```md
{
  "expo": {
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
        }
      ]
    ]
  }
}
```

# Build the native app

Run the following to generate the native project directories.

```md
npx expo prebuild --clean
```

Rebuild your app and read the [config guide!](https://react-native-google-signin.github.io/docs/setting-up/get-config-file)

```md
npx expo run:android && npx expo run:ios
```

# API Auth Company

Auth API use Google AccessToken to get user info then generate accessToken accordingly

So we need to sent those infomation to API: 

```md
{
  "tenant-id": EXPO_PUBLIC_TENANT_ID,
  client_id: EXPO_PUBLIC_APP_ID,
  client_secret: EXPO_PUBLIC_APP_SECRET,
  google_mobile_ac: {access_token_here},
  grant_type: GRANT_TYPE.GOOGLE_AC
}
enum GRANT_TYPE {
  EMAIL_OTP = 'email-otp',
  PHONE_OTP = 'phone-otp',
  REFRESH_TOKEN = 'refresh_token',
  FACEBOOK_AC = 'exchange-fb-mobile-to-tenant-token',
  GOOGLE_AC = 'exchange-google-mobile-to-tenant-token'
}
```
## Then go to Google Cloud Console and configure accordingly

* Go to Credentials within the Google Cloud Console (Menu > APIs & Services > Credentials).

* Click Create credentials and select OAuth client ID.

* Choose the appropriate Application type (e.g, Android, iOS, Desktop app).

* Provide a Name for the credential (visible only in the console).

* Depending on the application type, you may need to provide additional details, such as:

  * Authorized redirect URIs: where Google can send the authentication response after a user grants consent.

* Click Create to generate your Client ID and Client Secret. These are crucial for your application to interact with Google's authentication services.

  > Android will automatically handle it in the background if you config the SHA-1 fingerprint  correctly while the other platform need to put clientId into your codebase.

#  But how to get your project fingerprint? 

Go to your project repository

make sure you are at top-level directory 

then run: 

```md
keytool -keystore android/app/debug.keystore -list -v

```

enter the password. Usually, the password will be android

## Now everything should work perfectly fine.

### What about production ?

1. Upload app bundle file into production 

2. Go to YourApp → Test and release → App integrity → App Signing → Setting 

3. Get SHA-1 certificate fingerprint 

4. Go to Google Cloud Console → OAuth consent screen → Create Client

5. Create ClientId for Android and IOS

## Note:

If you want to config login Apple follow instrustion [Expo AppleAuthentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
