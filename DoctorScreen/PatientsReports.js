import  React, {useState,useContext,useEffect} from 'react';
import { View, Text,Button,Alert, StyleSheet,Image, TextInput,Modal, TouchableOpacity,SafeAreaView,FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather'; 
import { UserContext } from '../Hooks/AuthContext';
import DocumentPicker from 'react-native-document-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import notifee from '@notifee/react-native';

const PatientsReports=({navigation})=>{
  notifee.createChannel({
    id: 'reports',
    name: 'reports',
    // importance: notifee.Importance.HIGH,
  });

    const { doctorEmail } = useContext(UserContext);
    const [reportList,setReportList]=useState([])
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(()=>{
        console.log("fetching Reports")
        fetchReports();
    },[])
 
    
// const handleDownload = async (reportId) => {
//   try {
//     console.log("start downloading");
//     const url = `http://10.0.2.2:8080/patient/downloadreport/${reportId}`;
//     const response = await RNFetchBlob.config({
//       fileCache: true,
//       appendExt: 'pdf',
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         title: `Report_${reportId}.pdf`,
//         description: 'Downloading PDF file',
//         mime: 'application/pdf',
//         mediaScannable: true,
//         notificationOpenOnClick: true,
//       },
//     }).fetch('GET', url);
    
//     const filePath = response.path();
//     console.log(`Report_${reportId}.pdf downloaded and saved successfully to ${filePath}`);
//   } catch (error) {
//     console.error(error);
//   }
// };
// const handleDownload=async(reportId)=>{
//   const {config,fs}=RNFetchBlob;
//   const download=fs.dirs?.DownloadDir;
//   return config({
//     fileCache:true,
//     addAndroidDownloads: {
//     notification:true,
//     path:download +"/"+ `Report_${reportId}`+'pdf',}
//   })
//   .fetch('GET', `http://10.0.2.2:8080/patient/downloadreport/${reportId}`)
//   .then((res)=>{
//     console.log(res)
//   })
//   .catch((e)=>{
//     console.log(e)

//   })
// }
    
    const handleDownload = async (reportId) => {
      try {
        const response = await RNFetchBlob.config({
          fileCache: true, // Enable file caching
          appendExt: 'pdf', // Append file extension
     
        // }).fetch('GET', `http://10.0.2.2:8080/patient/downloadreport/${reportId}`);
      }).fetch('GET', `http://172.20.10.4:8080/patient/downloadreport/${reportId}`);

  
        // Get the path to the downloaded file
        const filePath = response.path();
        console.log(filePath)
        // Specify the destination directory where you want to save the file
        const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/Report_${reportId}.pdf`;
        console.log(destinationPath)
        // Move the downloaded file to the destination directory
        await RNFS.moveFile(filePath, destinationPath);
        // console.log(`Report_${reportId}.pdf downloaded and saved successfully to ${destinationPath}`);
        if (response.info().status === 200) {
          Alert.alert(`Report_${reportId}.pdf downloaded Successfully`);
        }
        else{
          Alert.alert(`Sorry error while downloading`);

        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchReports=async()=>{
          await axios.get(`http://172.20.10.4:8080/doctor/getreports/${doctorEmail}`)

            .then(response=>{
              const fetchReport=response.data;
          
              setReportList(fetchReport)
              console.log(reportList)
            })
            .catch(error=>{
              console.log('error fetching reportList',error)
            })
           }
           function formatDate(dateString) {
            const dateObject = new Date(dateString);
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, "0");
            const day = String(dateObject.getDate()).padStart(2, "0");
          
            return `${year}-${month}-${day}`;
          }
          
    return(
        <SafeAreaView style={styles.container}>
        <View style={[styles.header]}>
       <TouchableOpacity onPress={()=>{navigation.navigate("DoctorHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
        <AntDesign
                       name="arrowleft"
                       size={30}
                       color='black'
                       >
                       </AntDesign></TouchableOpacity>
       <Text style={[styles.headerTxt]}>Patient's Reports</Text>
         </View>
         {reportList.length===0 ?(
         <View style={{alignItems:"center",justifyContent:"center",marginTop:50}}>
         <Image source={require('../Images/Schedule-amico.png')} style={{ width: 300, height: 300 }} />
         <Text style={{color:"#5c5c5c",fontSize:18,fontWeight:"bold",}}>No Report added</Text>
         </View>):(<FlatList
         data={reportList}
         keyExtractor={(item)=>item._id}
         renderItem={({item})=>(
        
        // <View style={{borderWidth:1}}>
         <View style={{borderWidth:1,margin:20,backgroundColor:"white",
         elevation:2,borderRadius:10,borderColor:"#178CCB",paddingBottom:10,}}>
         <View style={{flex:1}}>
          {/* <Text style={styles.pendingText}>{item.status}</Text> */}
           <Text style={styles.pendingText}></Text>
           </View>
          <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-evenly"}}>
          
          <Image source={require('../Images/medical-records.png')} style={{ width: 60, height: 60,left:0}} />
           <View style={{borderWidth:0,justifyContent:"space-evenly"}}>
            <Text style={{fontSize:23,color:'#40413F',fontWeight:"bold"}}>Report</Text>
            <Text style={{fontSize:15,color:'#40413F',fontWeight:"bold"}}>{item.patientEmail}</Text>
            <Text style={{color:'#40413F',fontWeight:"bold",fontSize:15}}>{formatDate(item.CreatedAt)}</Text>

            </View>
          </View>
           <View style={{borderWidth:0,marginTop:10}}>
          
          <TouchableOpacity style={styles.buttonView} onPress={()=>handleDownload(item._id)}>
            <Text style={styles.buttonTxt2}>Download</Text></TouchableOpacity> 
          </View> 
          </View>
          
        
      
         )}/>)}



         </SafeAreaView>

    )}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
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
      buttonView:{
        height:45,
        width:120,
        
        // borderColor:"#388E8E",
        backgroundColor:"#178ccb",
        borderRadius:5,
        
        
        // alignSelf:"center",
        alignSelf:"flex-end",
        justifyContent:"center",
        right:10,
        // left:9
        // backgroundColor:"#6AAB9C"
       },
       buttonTxt2:{
        fontSize:16,
        alignSelf:'center',
        fontWeight:'bold',
        // color:'#6AAB9C',
        color:"white",
        // color:"white",
        margin:5,
       },
       cardText:{
        fontSize:15,
        marginStart:6,
        color:"#40413F",
        fontWeight:"bold"
       },
       pendingText:{
        borderWidth:1,
        fontSize:20,
        alignSelf:"flex-end",
        marginTop:-17,
        color:"#388E8E",
        elevation:1,
        backgroundColor:"white",
        padding:5,
        marginEnd:10,
        borderRadius:10,
        borderColor:"#178CCB",
      },
      statusButton:
      { width:120,
        // borderWidth:1,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10},
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          width: '80%',
        },
        modalHeading: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        modalCloseButton: {
          alignSelf: 'flex-end',
          marginTop: 10,
        },
        modalCloseButtonText: {
          fontSize: 16,
          color: '#388E8E',
        },
        
})
export default PatientsReports