import React, { useContext, useEffect,useState } from 'react';

// import firebase from 'firebase/app';
import { AuthProvider } from './Hooks/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from './Hooks/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import OnBoarding from './src/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FrontScreen from './src/FrontScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import DoctorNavigator from './src/DoctorNavigator'; // Import your DoctorNavigator
import PatientNavigator from './src/PatientNavigator';
import PatientHomeScreen from './Screens/PatientHomeScreen';
import PushNotification from 'react-native-push-notification';
import firebase from 'firebase/app';
import DoctorHomeScreen from './DoctorScreen/DoctorHomeScreen';


// const firebaseConfig = {
//   apiKey: 'AIzaSyCx2uII1yF7rs57W2bil5Gr9NrIWcRKLfw',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'awesomeproject-bbf0f',
//   storageBucket: 'awesomeproject-bbf0f.appspot.com',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
const Stack = createNativeStackNavigator();

function App() {

  // const [Data,setData] =useState();
  // const loadDataFromStorage = async () => {
  //   try {
  //     const savedData = await AsyncStorage.getItem('Reminder');
  //     if (savedData !== null) {
  //       const parsedData = JSON.parse(savedData);
  //       setData(parsedData);
  //       // console.log('Data loaded successfully');
  //       // console.log(Data)
  //     }
  //   } catch (error) {
  //     console.error('Error loading data:', error);
  //   }
  // };


  // useEffect(() => {
  //   console.log(Data);
  // }, [Data]);
  // useEffect(() => {
  //   const fetchData = async () => {
   
  
  //     SplashScreen.hide();
  //     await loadDataFromStorage();
  //     createChannels();
  //     // Schedule notification at a specific time (e.g., 8:00 AM)
  //     scheduleNightlyNotification();
  //   };
  
  //   fetchData();
  // }, []);
  
  // const createChannels=()=>{
  //   PushNotification.createChannel(
  //     {
  //       channelId:'test-channel',
  //       channelName:'Test Channel'
  //     }
  //   )
  // }

  

  //   // Schedule the notification
  //   const scheduleNightlyNotification = () => {
  //     // Get the current date
  //     const currentDate = new Date();
    
  //     // Set the time to 11:50 PM
  //     currentDate.setHours(0); // Set to midnight
  //     currentDate.setMinutes(58);
  //     currentDate.setSeconds(0);
    
  //     // Ensure that the scheduled time is in the future
  //     if (currentDate <= new Date()) {
  //       currentDate.setDate(currentDate.getDate() ); // Schedule for the next day
  //     }
    
  //     // Schedule the notification
  //     PushNotification.localNotificationSchedule({
  //       channelId: 'test-channel',
  //       date: Data.reminderTime,
  //       title: 'Nightly Reminder',
  //       message: 'It\'s time to take your nightly medicine!',
  //       repeatTime: 'daily',
        
  //     });
  //   };
  




  const [Data, setData] = useState();
  const [Time, setTime] = useState(0);
// const loadDataFromStorage = async () => {
//   try {
//     const savedData = await AsyncStorage.getItem('Reminder');
//     if (savedData !== null) {
//       const parsedData = JSON.parse(savedData);
//       setData(parsedData);
//       console.log('data agya')
//     }
//   } catch (error) {
//     console.error('Error loading data:', error);
//   }
const [datalist,setdatalist] = useState()
const retrieveDataList = async () => {
  try {
    const existingList = await AsyncStorage.getItem('ReminderList');
    const dataList = existingList ? JSON.parse(existingList) : [];
    
    // Process the list as needed
    console.log('Retrieved data list:', dataList);

    setdatalist(dataList)
    console.log('asfaf',dataList)
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};



const createChannels = () => {
  PushNotification.createChannel({
    channelId: 'test-channel',
    channelName: 'Test Channel',
  });
};



const scheduleNightlyNotifications = async () => {
  try {
    const existingList = await AsyncStorage.getItem('ReminderList');
    const dataList = existingList ? JSON.parse(existingList) : [];

    // Process the list as needed
    console.log('Retrieved data list:', dataList);

    setdatalist(dataList);
    console.log('asfaf', dataList);

    if (dataList && dataList.length > 0) {
      console.log('data arha ha yar')
      try {
        dataList.forEach((data) => {
          // Parse reminderTime as a Date object for each item in the list
          const parsedReminderTime = new Date(data.reminderTime);

          // Check if parsing was successful
          if (isNaN(parsedReminderTime.getTime())) {
            console.error('Error parsing reminderTime. Unable to schedule notification for data:', data);
          } else {
            // Format the reminderTime as a string in the desired format
            const formattedReminderTime = parsedReminderTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });

            // Ensure that the scheduled time is in the future
            if (parsedReminderTime <= new Date()) {
              parsedReminderTime.setDate(parsedReminderTime.getDate() + 1); // Schedule for the next day
            }

            console.log('Formatted reminderTime:', formattedReminderTime);

            // Check if PushNotification is defined and push notifications are supported
            if (PushNotification && PushNotification.localNotificationSchedule) {
              // Schedule the notification using parsedReminderTime
              PushNotification.localNotificationSchedule({
                channelId: 'test-channel',
                date: parsedReminderTime,
                title: 'kuch bhi',
                message: `It's time to take your nightly medicine at ${formattedReminderTime}!`,
                repeatTime: 'daily',
              });
            } else {
              console.error('Push notifications not supported or PushNotification.localNotificationSchedule is not defined.');
            }
          }
        });
      } catch (error) {
        console.error('Error scheduling notifications:', error);
      }
    } else {
      console.log('No data or empty list. Unable to schedule notifications.');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

// Example usage
// Assuming datalist is set somewhere in your code

// Call scheduleNightlyNotifications when needed
// scheduleNightlyNotifications();




// useEffect(() => {
//   console.log(Data);
// }, [Data]);


useEffect(() => {
  const fetchData = async () => {
    try {
      SplashScreen.hide();

      // Ensure retrieveDataList is called first
      // await retrieveDataList();
console.log(datalist)
      // Continue with other operations
      createChannels();
      scheduleNightlyNotifications();
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  };

  fetchData();
}, []);






// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // SplashScreen.hide();
//            scheduleNightlyNotification();
     
//       // Schedule notification at a specific time (e.g., 8:00 AM) only if data is loaded
     
//     } catch (error) {
//       console.error('Error in fetchData:', error);
//     }
//   };

//   fetchData();
// }, []);
 

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="FrontScreen" component={FrontScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />


          {/* Use a Screen to wrap the DoctorNavigator */}
          {/* {UserRole === 'doctor' ? (
            <Stack.Screen name="DoctorHomeScreen" options={{ headerShown: false }}>
              {() => <DoctorNavigator />}
            </Stack.Screen>
          ) : <Stack.Screen name="PatientHomeScreen" options={{ headerShown: false }}>
          {() => <PatientNavigator />}
        </Stack.Screen>} */}

          <Stack.Screen name="DoctorNavigator" component={DoctorNavigator } />

          <Stack.Screen name="PatientNavigator" component={PatientNavigator} />

        </Stack.Navigator>

      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;