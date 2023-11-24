import React, {useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Touchable,FlatList,SafeAreaView, TouchableOpacity,Image,ScrollView,Modal } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'; 
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewPrescriptions from './ViewPrescriptions';
import { UserContext } from "../Hooks/AuthContext";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import { Screen } from "react-native-screens";
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

const Prescription=({navigation})=>{
 const [PrescriptionList,setPrescriptionList]=useState([]);
 const [modalVisible, setModalVisible] = useState(false);
 const [selectedPrecription,setSelectedPrescription]= useState([]);
 const {patientEmail}=useContext(UserContext);
 useEffect(() => {
  console.log("Prescription getting")
  fetchPrescription();
}, []);

 const fetchPrescription=async()=>{
  axios.get(`http://172.20.10.4:8080/patient/getPrescriptions/${patientEmail}`)
  .then(response=>{
    const fetchPrescription=response.data;
    setPrescriptionList(fetchPrescription)
  })
  .catch(error=>{
    console.log('error fetching prescription',error)
  })
 }

 function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const deletePrescription=async(PrescriptionID)=>{
    try{
     const res=await axios.delete(`http://172.20.10.4:8080/patient/deletePrescription/${PrescriptionID}`)
     console.log(res.data)
     // const updatedResponse = await axios.get(`http://10.0.2.2:8080/patient/allReminder/${patientID}`);
     //   setReminderList(updatedResponse.data)
     //   console.log("reminderlist updated")
     fetchPrescription();
    }catch(error){
     console.error(error)
    }
}
const viewPrescription=async(id)=>{
  try{
    const res=await axios.get(`http://172.20.10.4:8080/patient/getPrescriptionsById/${id}`)
    // console.log(res.data)
    setSelectedPrescription(res.data)
    console.log("This is selected ",selectedPrecription)
    setModalVisible(true);
   }catch(error){
    console.error(error)
   }
}


return(
  <SafeAreaView style={styles.container}>
     {/* <LinearGradient colors={['#F8f8f8','#F8F8F8']} style={[styles.header]}> */}
     <View style={[styles.header]}>
    <TouchableOpacity onPress={()=>{navigation.navigate("PatientHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
     <AntDesign
                    name="arrowleft"
                    size={30}
                    color='black'
                    >
                    </AntDesign></TouchableOpacity>
    <Text style={[styles.headerTxt]}>My Prescriptions</Text>
      </View>
{/* </LinearGradient> */}
  
  <View style={styles.cardBox}>
    {/* <ScrollView contentContainerStyle={{ height: 700 }}> */}
      <View>
    {
      PrescriptionList.length > 0 ? (
      <FlatList
      data={PrescriptionList}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>(
      
      <View style={styles.PrescriptionBox}>
      <View style={{flexDirection:"row" ,borderWidth:0,justifyContent:"space-evenly",marginTop:20}}>
      <View style={{flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",borderWidth:0,margin:5}}>
       <Image source={require('../Images/rx.png')} style={{ width: 70, height: 80 }} />
      </View>
      <View style={{flexDirection:"column",borderWidth:0,justifyContent:"space-between",marginRight:70}}>
      <Text style={{fontSize:20,fontWeight:"600",color:'#1A1A1A'}}>Prescription</Text>
      <Text style={{fontSize:18,color:'#1A1A1A'}}>{item.doctorEmail}</Text>
      {/* <Text style={{fontSize:15,color:'#5c5c5c'}}>Created At {formatDate(item.createdAt)}</Text> */}
      <Text style={{fontSize:16,color:'#1A1A1A'}}>Nephrologist</Text>

       </View>
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:10}}>
       <TouchableOpacity style={styles.buttonView} onPress={()=>{viewPrescription(item._id)}}><Text style={styles.buttonTxt1}>View</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>{deletePrescription(item._id)}} style={styles.buttonDelete}><Text style={styles.buttonTxt2}>Delete</Text></TouchableOpacity>
       </View>
      </View>
      )}
      />
      ):(<View style={{justifyContent:"center",alignItems:"center",marginTop:60}}>
        <Image source={require('../Images/Medicalprescription.png')} style={{ width: 300, height: 300 }} />
        <Text style={{fontSize:18,marginTop:15,color:'#1F2329'}}>No Prescription added yet</Text>
        </View>) }
        </View>
        {/* </ScrollView> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
    
     <View style={styles.modalContainer}>
     <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} 
     style={{borderWidth:0,alignSelf:"flex-end",margin:10,right:15}}>
         <Fontisto
         name="close-a"
         size={20}/></TouchableOpacity>
      <View style={styles.modalContent}>
         {/* <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={{alignItems:"flex-end",marginTop:5,marginRight:5}}>
         <Fontisto
         name="close-a"
         size={15}/></TouchableOpacity> */}
         <View style={{borderWidth:0,justifyContent:"flex-start"}}>
          <Text style={{fontSize:27,color:"#627DA4",fontWeight:"bold",marginBottom:3}}>Dr. Rohail</Text>
          <Text style={{fontSize:18,color:"#627DA4",marginBottom:3}}>Nephrologist</Text>
          <View style={{borderWidth:0, flexDirection:"row",justifyContent:"space-between",marginTop:10,}}>
          <Text style={{fontSize:14,color:"#1F2329"}}>Email: {selectedPrecription.doctorEmail}</Text>
          {/* <Text style={{fontSize:14,color:"#5c5c5c"}}>Timing: {formatDate(selectedPrecription.createdAt)}</Text> */}
          </View>
         </View>
         <Text style={{borderBottomWidth:1,borderStyle:"dashed"}}></Text>
         <View style={{borderWidth:0, flexDirection:"row",justifyContent:"space-between",marginTop:10,}}>
         <Image source={require('../Images/prescription.png')} style={{ width: 50, height: 50,alignSelf:"flex-start", }} />
          <Text style={{fontSize:14,color:"#1F2329",marginTop:13,fontWeight:"bold"}}>Date: {formatDate(selectedPrecription.createdAt)}</Text>
          </View>
         {/* <Image source={require('../Images/prescription.png')} style={{ width: 50, height: 50,alignSelf:"flex-start", }} /> */}
         <View style={styles.container1}>
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Medication Name</Text>
        <Text style={styles.columnHeader}>Dosage</Text>
      </View>

      
        <View>
        <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{selectedPrecription.medicineName}</Text>
        <Text style={styles.tableCell}>{selectedPrecription.dosage}</Text>
      </View>
      <Text style={{color:"#1F2329"}}>{selectedPrecription.description}</Text>
      </View>      
      
      
      
    </View>
         
          </View>
          </View>
        </Modal>
        </View>
        
  </SafeAreaView>
)}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
cardBox:{
// flex:1,
borderWidth:0,
margin:10,
},
PrescriptionBox:{
  // borderWidth:0.8,
  margin:10,
  flexDirection:"column",
  justifyContent:"space-evenly",
  backgroundColor:"white",
  borderRadius:10,
  elevation:2,
  // borderColor:"#178CCB"

},
buttonDelete:{
  height:35,
  width:100,
  borderColor:"#178CCB",
  borderWidth:1.5,
  borderRadius:5,
 },
 buttonView:{
  // borderWidth:1,
  height:35,
  width:100,
  // backgroundColor:'#C0E3EE',
  borderWidth:1.5,
  borderColor:"#178CCB",
  borderRadius:5,
  marginLeft:65,
  // marginTop:5,
 },
 buttonTxt2:{
  fontSize:16,
  alignSelf:'center',
  fontWeight:'bold',
  color:'#178CCB',
  margin:5,
 },
 buttonTxt1:{
  fontSize:16,
  alignSelf:'center',
  fontWeight:'bold',
  color:'#178CCB',
  margin:5,
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
header: {
  height: 60,
  flexDirection:'row',
  alignItems:"center",
  justifyContent:"center",
  borderBottomWidth:1.7,
  borderBottomColor:"#178CCB",
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  width: '90%',
},
container1: {
  // flex: 1,
  padding: 10,
  // backgroundColor: '#F5F5F5',
},
tableHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // backgroundColor: 'lightgray',
  padding: 10,
  marginBottom: 10,
},
columnHeader: {
  fontWeight: 'bold',
  flex: 1,
  textAlign: 'center',
  color:"#1F2329"
},
tableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // backgroundColor: 'white',
  padding: 10,
  marginBottom: 5,
},
tableCell: {
  flex: 1,
  textAlign: 'center',
  color:"#1F2329"
},
})

      
export default Prescription
// const Prescription = ({navigation}) => {
//   const backArroeNav = () => {
//     navigation.navigate('Home')
//   }
//   const viewPrescription = () => {
//     navigation.navigate("ViewPrescriptions")
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backArrow} onPress={backArroeNav}>
//           <AntDesign
//             name="arrowleft"
//             size={30}
//             color='white'
//           >
//           </AntDesign>
//         </TouchableOpacity>
//         <Text style={styles.headerTxt}>My Prescriptions</Text>
//       </View>

//       <View style={styles.box}>
//         <FontAwesome5
//           name="file-prescription"
//           size={70}
//           color='#9989C7'
//         >
//         </FontAwesome5>
//         {/* <Text style={styles.title}>Prescription</Text> */}
//         <View style={styles.box3}>
//           <View style={styles.section}>
//             <Text style={styles.label1}>Prescription</Text>
//             <Text style={styles.label2}>Dr.Saad Ahmed:</Text>
//             <Text style={styles.label3}>Nephrologist</Text>
//           </View>
//           <TouchableOpacity onPress={ViewPrescriptions}>
//             <Text>View Prescription</Text></TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.box}>
//         <FontAwesome5
//           name="file-prescription"
//           size={70}
//           color="#9989C7"
//         >
//         </FontAwesome5>
//         {/* <Text style={styles.title}>Prescription</Text> */}
//         <View style={styles.box3}>
//           <View style={styles.section}>
//             <Text style={styles.label1}>Prescription</Text>
//             <Text style={styles.label2}>Dr.Saad Ahmed:</Text>
//             <Text style={styles.label3}>Nephrologist</Text>
//           </View>
//           <TouchableOpacity onPress={viewPrescription}>
//             <Text>View Prescription</Text></TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.box}>
//         <FontAwesome5
//           name="file-prescription"
//           size={70}
//           color='#9989C7'
//         >
//         </FontAwesome5>
//         {/* <Text style={styles.title}>Prescription</Text> */}
//         <View style={styles.box3}>
//           <View style={styles.section}>
//             <Text style={styles.label1}>Prescription</Text>
//             <Text style={styles.label2}>Dr.Saad Ahmed:</Text>
//             <Text style={styles.label3}>Nephrologist</Text>
//           </View>
//           <TouchableOpacity>
//             <Text>View Prescription</Text></TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //    padding:16,

//   },
//   box: {
//     backgroundColor: '#E2DFEB',
//     flexDirection: 'row',

//     paddingHorizontal: 20,
//     marginTop: 30,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderTopWidth: 1,
//     borderColor: '#9989C7'

//   },
//   box3: {
//     marginLeft: 25,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   section: {
//     marginBottom: 8,
//   },
//   label1: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   label2: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   label3: {
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   header: {
//     backgroundColor: '#9989C7',
//     height: 50,
//     flexDirection: 'row'
//   },
//   headerTxt: {
//     marginLeft: 97,
//     // alignSelf:'center',
//     fontFamily: 'Inter',
//     // marginTop: 8,
//     alignSelf: 'center',
//     fontSize: 22,
//     color: '#f8f8f8',
//     fontWeight: 'bold',
//   },
//   backArrow: {
//     marginTop: 10,
//     marginLeft: 10,
//     alignSelf: 'flex-start'

//   },
// });

// export default Prescription;
