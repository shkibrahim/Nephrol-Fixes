import React, { useState, useEffect,useContext } from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Image,SafeAreaView,Modal, Pressable,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import MedicineReminder from './MedicineReminder';
import Fontisto from 'react-native-vector-icons/Fontisto'; 
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { useRoute } from '@react-navigation/native';
import notifee from '@notifee/react-native';
// import Notification from '../Notification';
import { UserContext } from '../Hooks/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MedicineHome = ({ navigation}) => {















  
//   const [Data, setData] = useState();

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
// };

// const createChannels = () => {
//   PushNotification.createChannel({
//     channelId: 'test-channel',
//     channelName: 'Test Channel',
//   });
// };

// const scheduleNightlyNotification = () => {
//   if (Data && Data.reminderTime) {
//     try {
//       // Parse reminderTime as a Date object
//       const parsedReminderTime = new Date(Data.reminderTime);

//       // Check if parsing was successful
//       if (isNaN(parsedReminderTime.getTime())) {
//         console.error('Error parsing reminderTime. Unable to schedule notification.');
//       } else {
//         // Format the reminderTime as a string in the desired format
//         const formattedReminderTime = parsedReminderTime.toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         });







//         // const currentDate = new Date();
    
//         // // Set the time to 11:50 PM
//         // currentDate.setHours(2);
//         // currentDate.setMinutes(58);
//         // currentDate.setSeconds(45);
      
//         // // Ensure that the scheduled time is in the future
//         // if (currentDate <= new Date()) {
//         //   currentDate.setDate(currentDate.getDate() ); // Schedule for the next day
//         // }
  

//         console.log('Formatted reminderTime:', formattedReminderTime);

//         // Schedule the notification
//         PushNotification.localNotificationSchedule({
//           channelId: 'test-channel',
//           date:  parsedReminderTime,
//           title: 'kuch bhi',
//           message: `It's time to take your nightly medicine at !`,
//           repeatTime: 'daily',
//         });
//       }
//     } catch (error) {
//       console.error('Error scheduling notification:', error);
//     }
//   } else {
//     console.log('Reminder time is missing. Unable to schedule notification.');
//   }
// };


// // useEffect(() => {
// //   console.log(Data);
// // }, [Data]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // SplashScreen.hide();
//       await loadDataFromStorage();
//       createChannels();
//       // Schedule notification at a specific time (e.g., 8:00 AM) only if data is loaded
//       scheduleNightlyNotification();
//     } catch (error) {
//       console.error('Error in fetchData:', error);
//     }
//   };

//   fetchData();
// }, []); // Empty dependency array to execute only once when component mounts

 
  const {patientEmail}=useContext(UserContext)
  notifee.createChannel({
    id: 'medicine-reminders',
    name: 'Medicine Reminders',
    // importance: notifee.Importance.HIGH,
  });
  // const {patientID}=route.params;
  const [reminderList, setReminderList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editReminderData, setEditReminderData] = useState(null);

  useEffect(() => {
    console.log("i ran first")
    fetchReminders();
  }, []); // Empty dependency array means this effect runs only once (when the component mounts)

  useEffect(() => {
    console.log("second use effect")
    const newinterval = setInterval(() => {
      checkAndSendReminders();
      console.log("----------------")
      console.log("Running after 30 sec")
    }, 60000);
    return () =>
    {clearInterval(newinterval) 
      console.log("interval cleared")}
  }, [reminderList]);

  const fetchReminders = async() => {
    console.log("fetcReminder is called")
    // Replace 'YOUR_BACKEND_API_URL_HERE' with the actual API endpoint for fetching reminders
    // axios.get(`http://10.0.2.2:8080/patient/allReminder/${patientEmail}`)
    axios.get(`http://192.168.100.14:8080/patient/allReminder/${patientEmail}`)

      .then(response => {
        const fetchedReminders = response.data; // Assuming your API returns an array of reminders
        setReminderList(fetchedReminders);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('Error fetching reminders:', error);
      });
  };
  const openEditModal = (selectedReminder) => {
    setEditReminderData(selectedReminder);
    setModalVisible(true);
  };
  const updateMedicine = async (reminderID) => {
    setModalVisible(true)

    try {
      const response = await axios.patch(`http://192.168.100.14:8080/patient/updateReminder/${reminderID}`, {
        MedicationName:"Medicine 2", // Provide the updated fields
        Type:"Capsule",
        dosage: "1+1+1",
        frequency: "1",
        startDate: new Date(),
        endDate: new Date(),
        reminderTime: new Date(),
        patientEmail:patientEmail
      });
  
      // Log the updated reminder
      console.log("Updated Reminder:", response.data);
  
      // You can fetch the updated reminders again if needed
      fetchReminders();
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };
  
  const checkAndSendReminders = () => {
    console.log("---------------------")
    console.log("check and send reminder function called")
    const utcOffset = 5 * 60 * 60 * 1000;
    const currentUTCDate = new Date();
    const PresentTime= currentUTCDate.getUTCHours() + ":"+currentUTCDate.getMinutes();
    console.log("this is before fetchching")

    reminderList.forEach(item => {
      console.log("fetching list")
      const reminderTimeUTC = new Date(item.reminderTime);
      const startUTC = new Date(item.startDate);
      const endUTC = new Date(item.endDate);

      const reminderTime= reminderTimeUTC.getUTCHours() + ":"+reminderTimeUTC.getMinutes();
      // console.log(reminderTimeUTC,startUTC,endUTC);
      console.log("this is reminder",reminderTime)
      //  console.log( currentUTCDate >= startUTC)
        // console.log(currentUTCDate <= endUTC)
      

      if (
        PresentTime == reminderTime &&
        currentUTCDate>= startUTC &&
        currentUTCDate <= endUTC
      ) {
        // Send push notification using Notifee
        notifee.displayNotification({
          title: 'Medicine Reminder',
          body: `Time to take ${item.MedicationName}`,
          android: {
            channelId: 'medicine-reminders', // Use the created channel ID
          },
          ios: {
            sound: 'default',
          },
          schedule: {
            timestamp: reminderTimeUTC,
          },
        });
      }
    });
  };  

const addMedicine=()=>{
    // navigation.navigate('MedicineReminder')
    // console.log(patientID)
    // setEditReminderData(null);
    setModalVisible(true)
  };
  const deleteReminder=async(reminderID)=>{
   try{
    // const res=await axios.delete(`http://10.0.2.2:8080/patient/deleteReminder/${reminderID}`)
    const res=await axios.delete(`http://192.168.100.14:8080/patient/deleteReminder/${reminderID}`)

    console.log(res.data)
    // const updatedResponse = await axios.get(`http://10.0.2.2:8080/patient/allReminder/${patientID}`);
    //   setReminderList(updatedResponse.data)
    //   console.log("reminderlist updated")
    fetchReminders();
   }catch(error){
    console.error(error)
   }
  }
  const updateMedicineChange = () => {
    setMedicineChange(!medicineChange);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
       <TouchableOpacity onPress={()=>{navigation.navigate("PatientHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
        <AntDesign
                       name="arrowleft"
                       size={30}
                       color='black'
                       >
                       </AntDesign></TouchableOpacity>
       <Text style={[styles.headerTxt]}>Medicine Reminder</Text>
         </View>
      
      {reminderList.length > 0 ? (
        <FlatList
          data={reminderList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
            <View style={[styles.medicineContainer]}>
                     <View style={styles.timeCard}>
                      <Text style={{fontSize:22,margin:5,fontWeight:'bold',color:"#1E2843"}}>
                        {new Date(item.reminderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                        </View>
                      
                      <View style={{flexDirection:"row",marginLeft:20,marginTop:10,}}>
                        {item.Type==='capsule' &&(<Image source={require('../Images/pill.png')} style={{ width: 50, height: 50 }} />)}
                        {item.Type==='tablet' &&(<Image source={require('../Images/tablet2.png')} style={{ width: 50, height: 50 }} />)}
                        {item.Type==='syrup' &&(<Image source={require('../Images/syrup.png')} style={{ width: 50, height: 50 }} />)}

                      <View style={{flexDirection:"column",justifyContent:"space-evenly"}}>
                      <Text style={styles.medicationName}>{item.MedicationName}</Text> 
                      <Text style={styles.medInfo}>{item.Type}</Text> 
                      {/* <Text style={styles.medInfo}>{item.frequency}</Text> */}
                      </View>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:"flex-end",margin:10,}}>
                      {/* <TouchableOpacity style={styles.buttonUpdate}><Text style={styles.buttonTxt} onPress={()=>updateMedicine(item._id)}>Update</Text></TouchableOpacity> */}
                      <TouchableOpacity onPress={()=>{deleteReminder(item._id)}} style={styles.buttonDelete}><Text style={styles.buttonTxt2}>Delete</Text></TouchableOpacity>
                      </View>
                    </View>
                   </View>
                    
                  )}
          contentContainerStyle={{ paddingBottom: 16 }}
      
        />
    
      ): (
        <View>
        <Image source={require('../Images/Calendar-amico.png')} style={styles.Image1}/>
        <Text style={styles.endtext}>No medicine added yet.</Text> 
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
           
         <ScrollView style={{width:355,height:700,marginTop:60,marginLeft:20,backgroundColor:"#f8f8f8",
         borderRadius:20,elevation:5}}>
         <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={{alignItems:"flex-end",marginTop:5,marginRight:5}}>
         <Fontisto
         name="close-a"
         size={15}/></TouchableOpacity>
          <MedicineReminder 
          navigation={navigation} 
          // patientID={patientID} 
          fetchReminders={fetchReminders}
          />
          </ScrollView>
          
        </Modal> */}
         <View style={styles.ButtonSignIn}>
              <TouchableOpacity onPress={addMedicine}>
                <Icon
                name='add-circle-sharp'
                size={70}
                color='#178CCB'/>
              </TouchableOpacity> 
            </View>
        </View>
      )}
           <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
        alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
           
         <ScrollView style={{backgroundColor:"#f8f8f8",margin:20,
         borderRadius:15,elevation:5,borderWidth:0}}>
         <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={{alignItems:"flex-end",marginTop:5,marginRight:5}}>
         <Fontisto
         name="close-a"
         size={15}/></TouchableOpacity>
          <MedicineReminder 
          navigation={navigation}
          editReminderData={editReminderData}
           fetchReminders={fetchReminders} 
           />
          </ScrollView>
          
        </Modal>
 
              <TouchableOpacity style={{alignItems:"flex-end",margin:20}}onPress={addMedicine}>
                <Icon
                name='add-circle-sharp'
                size={70}
                color='#178CCB'/>
              </TouchableOpacity> 
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  container1: {
    // padding: 25,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"black",
  },
  header: {
    height: 60,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center",
    borderBottomWidth:1.7,
    // borderBottomColor:"#6AAB9C",
   borderBottomColor: '#178CCB'

  },
  headerTxt: {
    fontFamily: 'Inter',
    fontSize: 22,
    marginRight:20,
    color: '#40413F',
    fontWeight:'bold',
    borderWidth:0,
    left:25,
  },
  medicineContainer: {
    flexDirection:"column",
    // borderWidth:1,
    // flex:1,
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 15,
    // padding: 8,
    marginBottom: 16,
    // padding:30,
    marginTop:20,
    marginHorizontal:10,
    backgroundColor: '#F8F8F8',
    elevation:10,
    shadowColor:'black'

    // height:100,
  },
  medicationName: {
    fontSize: 18,
    // marginBottom: 8,
    color:'black',
    fontWeight:'500',
    marginLeft:20,
    // color:"#45597A",
    // alignSelf:'center',
  },

  endtext:{
    // margin:30,
    alignItems:'center',
    alignSelf:'center',
    color:'black',
    // fontWeight:'bold',
    fontSize:20,
  },

  ButtonSignIn:{
    alignItems:'flex-end',
      marginTop: 120,
      marginBottom:30,
      marginRight:10,

  },
  Image1:{
    marginTop:60,
    // marginLeft:50,
    alignSelf:'center',
    justifyContent:'center',
    width:400,
    height:350,
   },
   heading1:{
    margin:20,
    // borderWidth:1,
    height:100,
    width:350,
    borderRadius:20,
    backgroundColor:'#F5F5F5',
    shadowColor:'#E6879E',
    elevation:10,
   },
   timeCard:{
    // flex:3,
    // flexDirection:'column',
    alignItems:'center',
    // backgroundColor:'#DFF6F7',
    borderBottomColor:'#7A7979',
    borderBottomWidth:1,
    // borderBottomColor:,
    // height:40,
   },
   medInfo:{
    // alignSelf:'center',
    marginLeft:18,
    fontSize:15,
    color:'black',
    marginBottom:5,
    // flexDirection:"column"
    fontWeight:"500"
   },
   buttonUpdate:{
    // borderWidth:1,
    height:35,
    width:120,
    backgroundColor:'#178CCB',
    borderRadius:5,
    // marginTop:5,
    marginLeft:56,
   },
   buttonTxt:{
    fontSize:16,
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    margin:5,
   },
   buttonDelete:{
    // borderWidth:1,
    height:35,
    width:120,
    backgroundColor:'#178BBC',
    borderRadius:5,
    right:20
    // marginTop:5,
   },
   buttonTxt2:{
    fontSize:16,
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    margin:5,
   },
   centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'fle-end',
    marginTop: 22,
    borderWidth:1
  },
  modalView: {
    
    // borderWidth:1,
    // height:700,
    // width:450,
    // margin: 20,
    marginTop:80,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    // alignContent:"center",
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

export default  MedicineHome;
