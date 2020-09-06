# Drexel University Summer 2020 SE-572 project

## Native mobile (Android) app using React Native (Expo)

### Instructions

- Clone this repo.
- Run `npm install`
- Run `npm start`. 

Expo should prepare the packages for development and testing. Once it is done, Expo console opens in your default browser. The console allows you to test the app in various forms (in-browser, Android/iOS device, emulators, etc.,).
- Choose your preferred way of testing. 

I have targeted the app for Android, and have tested only on Android. It may/may not run in other platforms.

- You can test the application by installing Expo app for iOS or Android, and scanning the QR code in the console from the Expo app in your phone, when connected to the same network.
- Any changes to the code are instantly refreshed in the phone, as long as the Expoo CLI is running, and your phone is connected to the same network.
- Run `expo build:android` to build the apk.

Building requires Expo acount, the process of which will be run through in the console.

Building happens in Expo's servers and might take time.

- Once the build is complete, a link to download the apk is provided, which can be used for deployment.
 
 This app works in conjunction with the web app that is also part of the course.
 
 - The containers of *nginx*, the *express* app, and the *mongo* database must also be running for the app to be fully functioning. 
 - The URI of the API must also be changed in *App.js* to reflect the IP address of the server. Change the `serverIP` variable's value to the fit IP address + port number combo in the first line of `class App` (line 14 - subject to change).
