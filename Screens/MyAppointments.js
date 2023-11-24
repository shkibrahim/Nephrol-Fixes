import  React, {useState,useContext,useEffect} from 'react';
import { View, Text,Button,Alert, StyleSheet,Image, TextInput,Modal, TouchableOpacity,SafeAreaView,FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather'; 
import { UserContext } from '../Hooks/AuthContext';
import DocumentPicker from 'react-native-document-picker';
const MyAppointments=({navigation})=>{

    const [doctorEmail,setdoctorEmail]=useState('')
    const { patientEmail } = useContext(UserContext);
    const [appointments,setAppointments]=useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [pdfFile, setpdfFile] = useState(null);

    useEffect(()=>{
        console.log("fetching appointmnets")
        console.log(patientEmail)
        fetchAppointments();
    },[])
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const fetchAppointments=async()=>{
          // await axios.get(`http://10.0.2.2:8080/patient/appiontments/${patientEmail}`)
          await axios.get(`http://192.168.1.13:8080/patient/appiontments/${patientEmail}`)

            .then(response=>{
              const fetchAppointment=response.data;
              // console.log(response.data)
              setdoctorEmail(fetchAppointment.doctorEmail)
              setAppointments(fetchAppointment)
              console.log(appointments)
            })
            .catch(error=>{
              console.log('error fetching appointments',error)
            })
           }
           function formatDate(dateString) {
            const dateObject = new Date(dateString);
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, "0");
            const day = String(dateObject.getDate()).padStart(2, "0");
          
            return `${year}-${month}-${day}`;
          }
          const selectDocument=async()=>{
            setModalVisible(true);
            try{
            const doc=await DocumentPicker.pick();
            // console.log(doc)
            setpdfFile(doc);
            
            console.log("this is the ",pdfFile)
            // setModalVisible(true);
            }catch(error){
              if(DocumentPicker.isCancel(error)){
                console.log(error)
              }
              else{
                console.log("error:",error)
              }
            }
          }
         
          const sendFiles=async() => {
            // console.log("this is ",pdfFile)
            try {
              const formData = new FormData();
              const firstPdfFile = pdfFile[0]; 
              formData.append('pdfFile', {
                uri: firstPdfFile.uri,
                type: firstPdfFile.type,
                name: firstPdfFile.name,
              });
              formData.append('doctorEmail', doctorEmail);
              formData.append('patientEmail', patientEmail);
              console.log("formData after appending:", formData);

        
              const response = await axios.post(
                // "http://10.0.2.2:8080/patient/UploadReport",
                "http://192.168.1.13:8080/patient/UploadReport",

                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }
              );
              console.log("Response data:", response.data);
              setModalVisible(!isModalVisible);
              Alert.alert("File send successfuly")
            } catch (error) {
              console.log('Error sending files:', error);
            }
          };
          
    return(
        <SafeAreaView style={styles.container}>
        <View style={[styles.header]}>
       <TouchableOpacity onPress={()=>{navigation.navigate("PatientHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
        <AntDesign
                       name="arrowleft"
                       size={30}
                       color='black'
                       >
                       </AntDesign></TouchableOpacity>
       <Text style={[styles.headerTxt]}>My Appointments</Text>
         </View>
         <View style={{flex:0,borderWidth:0, flexDirection:"row",margin:15,justifyContent:"space-around"}}>
          <TouchableOpacity style={{flex:1,borderBottomWidth:1,alignItems:"center"}}>
          <Text style={{fontSize:18}}> Active </Text></TouchableOpacity>
          <TouchableOpacity style={{flex:1,borderBottomWidth:1,alignItems:"center"}}>
          <Text style={{fontSize:18}}> Completed </Text></TouchableOpacity>
         </View>
         {appointments.length===0 ?(
         <View style={{alignItems:"center",justifyContent:"center",marginTop:50}}>
         <Image source={require('../Images/Schedule-amico.png')} style={{ width: 300, height: 300 }} />
         <Text style={{color:"#5c5c5c",fontSize:18,fontWeight:"bold",}}>No Appointment added</Text>
         </View>):(<FlatList
         data={appointments}
         keyExtractor={(item)=>item._id}
         renderItem={({item})=>(
        
        // <View style={{borderWidth:1}}>
         <View style={{borderWidth:0,margin:20,backgroundColor:"white",elevation:2,borderRadius:10,borderColor:"#178CCB",paddingBottom:10}}>
         <View style={{flex:1,}}>
          {/* <Text style={styles.pendingText}>{item.status}</Text> */}
          <Text style={styles.pendingText}>{item.type}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          {/* <Image source={require('../Images/appointment.png')} style={{ width: 70, height: 80 }} /> */}
          <View style={{justifyContent:"center",marginStart:25}}>
          <Text style={{alignSelf:"center",fontSize:22,color:'#40413F',fontWeight:"bold"}}>{item.DoctorName}</Text>
          <Text style={{fontSize:15}}>Nephrologist</Text></View>
          </View>
          
          {/* <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
           <View style={styles.statusButton}>
           <Text style={styles.cardText}>{item.status}</Text></View>
           <TouchableOpacity style={{width:120,borderWidth:1,height:30,justifyContent:"center",alignItems:"center"}}>
           <Text style={styles.cardText}>Upload File</Text></TouchableOpacity>
          </View> */}
  
          <View style={{borderWidth:0,
            margin:10,flexDirection:"row",justifyContent:"space-evenly",padding:0,}}>
            <View style={{flexDirection:"row",justifyContent:"center",borderWidth:0,padding:10,right:10,borderRadius:15,backgroundColor:"#f5f5f5"}}>
              <FontAwesome5
              name="calendar-alt"
              // color="#388E8E"
              color="#178CCB"
              size={22}/>
              <Text style={styles.cardText}>{formatDate(item.createdAt)}</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:"center",borderWidth:0,padding:10,alignItems:"center",borderRadius:15,backgroundColor:"#f5f5f5"}}>
              <FontAwesome5
              name="clock"
              // color="#388E8E"
              color="#178CCB"
              size={22}/>
             <Text style={styles.cardText}>{item.slot}</Text>
              </View> 
          </View>

          <View style={{borderWidth:0,flexDirection:"row",alignSelf:"flex-end"}}>
           {/* <View style={[styles.statusButton,{backgroundColor:"#FEEACE"}]}>
           <Text style={{fontSize:15,color:"#FFCB7D"}}>{item.status}</Text></View> */}
           <TouchableOpacity style={styles.buttonView} onPress={()=>{selectDocument();setdoctorEmail(item.doctorEmail)}}>
           <Text style={[styles.buttonTxt2]}>Upload File</Text></TouchableOpacity>
          </View>

          {/* <View>
             <TouchableOpacity onPress={()=>{deleteAppointment(item._id)}} style={styles.buttonDelete}><Text style={styles.buttonTxt2}>Upload File</Text></TouchableOpacity>
             </View> */}
         </View>
      
         )}/>)}

<Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={toggleModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      
      <Image source={require('../Images/cloud-computing.png')} style={{ width: 100, height: 100,alignSelf:"center"}} />
      <Text style={styles.modalHeading}>Send Report to Doctor</Text>
             
      <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-evenly"}}>
      <TouchableOpacity style={styles.modalCloseButton} onPress={sendFiles}>
        <Text style={styles.modalCloseButtonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
        <Text style={styles.modalCloseButtonText}>Close</Text>
      </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

         </SafeAreaView>

    )

}
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
        borderRadius:20,
        alignSelf:"flex-end",
        justifyContent:"center",
        right:20,
        backgroundColor:"#178CCB"
       },
       buttonTxt2:{
        fontSize:16,
        alignSelf:'center',
        fontWeight:'bold',
        // color:'#6AAB9C',
        // color:"#388E8E",
        color:"white",
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
        color:"#178CCB",
        elevation:1,
        backgroundColor:"white",
        padding:5,
        marginEnd:10,
        borderRadius:10,
        borderColor:"#178CCB",
        fontWeight:"bold"
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
          fontWeight: '500',
          marginBottom: 10,
          alignSelf:"center",
          color:"black"
        },
        modalCloseButton: {
          // alignSelf: 'flex-end',
          height:35,
          width:80,
          marginTop: 10,
          // borderWidth:1,
          borderRadius:10,
          justifyContent:"center",
          backgroundColor:"#5DAFDB"
          
        },
        modalCloseButtonText: {
          fontSize: 19,
          color: 'white',
          textAlign:"center"
        },
        
})
export default MyAppointments