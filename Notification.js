// import React, { useState, useEffect } from 'react';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {
//   StyleSheet,
//   Button,
//   TextInput,
//   View,
//   Text,
//   Keyboard,
//   Image,
//   Alert,
//   Modal,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from 'react-native';

// import {
//   cancelAllNotication,
//   showNotification,
//   showTimeNotification,
// } from './src/notification.android';

// const Notification = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <TouchableOpacity onPress={() => showNotification('my message', 'hello')}>
//         <Text style={{ borderWidth: 1, color: 'black', margin: 20 }}>
//           show Notification on click
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => showTimeNotification('My message', 'hello after 5')}>
//         <Text style={{ borderWidth: 1, color: 'black', margin: 20 }}>
//           show after time Notification
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => cancelAllNotication()}>
//         <Text>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Notification;

// import React from 'react';
// import { View, Button } from 'react-native';
// import notifee from '@notifee/react-native';

// function Notification() {
//   async function onDisplayNotification() {
//     // Request permissions (required for iOS)
//     await notifee.requestPermission()

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//       title: 'Notification Title',
//       body: 'this is background notification',
//       android: {
//         channelId,
//         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//         // pressAction is needed if you want the notification to open the app when pressed
//         pressAction: {
//           id: 'default',
//         },
//       },
//       schedule: {
//        dealy:5*60*1000
//       },

//     });
//   }

//   return (
//     <View>
//       <Button title="Display Notification" onPress={() => onDisplayNotification()} />
//     </View>
//   );
// }
// export default Notification;
import notifee, {
    AuthorizationStatus,
    EventType,
    Notification,
    TriggerType
  } from '@notifee/react-native';
  import { useNavigation } from '@react-navigation/native';
  // import MedicineHome from './Screens/MedicineHome';
  // const navigation = useNavigation();
  class Notifications {
    constructor() {
      // Bootstrap method is called when the app is launched from a notification
      this.bootstrap();
  
      // Listen for events
      // This is called when the app is in the foreground

      notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('this is foreground User pressed notification', detail.notification);
            this.handleNotificationOpen(detail.notification);
            // navigation.navigate('Medicine Home');
            break;
        }
      });
  
      // This is called when the app is in the background
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification } = detail;
        console.log('Notification received: background', type, detail);
        if (notification) {
          this.handleNotificationOpen("Medicine Home");
        }
      });
     
    }
    

      scheduleNotification=async({ reminder, date })=> {
        const hasPermissions = await this.checkPermissions();
      
        if (hasPermissions) {
          try {
            console.log("background notification creating")
            const trigger = {
              type: TriggerType.TIMESTAMP,
              timestamp: Date.now() +(2*60*1000),
              alarmManager:{
                allowWhileIdle:true,
              }
            };
            
            console.log("creating background Notification")
            const notificationDetails = {
              id: '1',
              title: `🔔 You asked for this reminder -  ${reminder}`,
              body: 'Tap on it to check',
              android: {
                channelId:'reminder',
                pressAction: {
                  id: 'default',
                },
              },
              // data: {
              //   id: '1',
              //   action: 'reminder',
              //   details: {
              //     name: reminder,
              //     date: date,
              //   },
              // },
            };
      
            await notifee.createTriggerNotification(notificationDetails, trigger);
            // await notifee.displayNotification(notificationDetails);
            console.log("created")
            // await notifee.displayNotification(notificationDetails)
          } catch (error) {
            console.error('Error creating notification:', error);
          }
        }
      }
      


    handleNotificationOpen(notification) {
        const { data } = notification;
        console.log(' background Notification Opened', data);
      }
      
  
    // This method is called when the app is launched from a notification
     async bootstrap() {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        this.handleNotificationOpen(initialNotification.notification);
      }
    }
  
    // This method is called to check if the user has granted permission to send notifications
     async checkPermissions() {
      const settings = await notifee.requestPermission();
  
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission settings:', settings);
        return true;
      } else {
        console.log('User declined permissions');
        return false;
      }
    }
  }
    
  
  // Exporting an instance of the class
  export default new Notifications();