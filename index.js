/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from 'react-native-push-notification'
import notifee, { EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

RNFetchBlob.config();
/// adding for notification
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN index:", token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION in index:", notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);
  
    //   // process the action
    // },
  
    // // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function(err) {
    //   console.error(err.message, err);
    // },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initi
    popInitialNotification: true,
  
    requestPermissions:Platform.OS==='ios',
  });
  
AppRegistry.registerComponent(appName, () => App);
