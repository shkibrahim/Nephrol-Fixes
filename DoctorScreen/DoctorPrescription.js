import React, { useState ,useContext } from 'react';
import { UserContext } from '../Hooks/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  StyleSheet,TextInput,View,Text,Alert,Image,TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const DoctorPrescription=({navigation})=>{
    const [showStart,setShowStart]=useState(false);
    const [showEnd,setShowEnd]=useState(false);
    const [mode,setmode]=useState('date');
    const { doctorEmail } = useContext(UserContext);

    const [data,setData]=useState({
        doctorEmail:doctorEmail,
        medicineName:"",
        dosage:"",
        patientEmail:"",
        startDate:new Date(),
        endDate:new Date(),
        description:""
        // patientID:patientID
        
      })
      const clearFields = () => {
        setData({
          doctorEmail: data.doctorEmail, // Retain the doctorEmail if needed
          medicineName: '',
          dosage: '',
          patientEmail: '',
          startDate: new Date(),
          endDate: new Date(),
          description: '',
        });
      };

      const onChangeStartDate = (event, selectedDate) => {
        setShowStart(false);
        if(event.type==='set' && selectedDate){
        setData((predata)=>({...predata,startDate:selectedDate}))}
        // setShow(false);
      };
      const onChangeEndDate = (event, selectedDate) => {
        setShowEnd(false);
        if(event.type==='set' && selectedDate){
        setData((predata)=>({...predata,endDate:selectedDate}))}
        // setShow(false);
      };
      
      const showStartMode=(modeToshow)=>{
        console.log('showStartMode called');
            setmode(modeToshow); 
            setShowStart(true);
      }
      const showEndMode=(modeToshow)=>{
        console.log('showEndMode called');
            setmode(modeToshow); 
            setShowEnd(true);
      }
     const submitPrescription=async()=>{
      console.log("here it comes")
      try {
        const response = await axios.post(
          // "http://10.0.2.2:8080/doctor/createPrescription",data
          "http://172.20.10.4:8080/doctor/createPrescription",data
        );
        if(response){
          console.log(response.data)
          clearFields();
          Alert.alert("Submitted Successfully!!")
        }
       
      }
      catch (error) {
        console.log(error);
      }
     }


    return(
    <View style={style.container}>
        <View style={[style.header]}>
    <TouchableOpacity onPress={()=>{navigation.navigate("DoctorHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
     <AntDesign
      name="arrowleft"
      size={30}
      color='black'
     /></TouchableOpacity>
          <Text style={[style.headerTxt]}>Prescriptions</Text>
      </View>

      <View style={{alignItems:"center",marginTop:30}}>
      <Image source={require('../Images/rx.png')} style={{ width: 100, height: 100 }} />
      <Text style={{fontSize:23,fontWeight:"bold",marginTop:5,color:"#1A1A1A"}}>Prescription Form </Text>
      </View>
      <ScrollView>
      <View style={{borderWidth:0,marginTop:20,justifyContent:"center",marginLeft:25,marginRight:10,paddingBottom:10}}>
        <Text style={style.label}>Enter Patient's Email</Text>
        <TextInput
        placeholder='Email'
        style={style.input}
        onChangeText={(val) => setData({...data,patientEmail:val})}
        />
        <Text style={style.label}>Enter Medicine Name</Text>
        <TextInput
        placeholder='Medicine Name'
        style={style.input}
        onChangeText={(val) => setData({...data,medicineName:val})}
        />
<View style={{flexDirection:"row",marginRight:0,borderWidth:0,justifyContent:"space-evenly"}}>
  <View style={{right:29,borderWidth:0}}>
<Text style={style.label}>Start Date:</Text>
<TouchableOpacity onPress={() => showStartMode('date')}>
  <View style={{flexDirection:"column"}}>
   <TextInput 
   style={style.inputS}
   placeholder='Enter a Start Date'
   value={data.startDate.toLocaleDateString()}
   editable={false}/>
  </View>
</TouchableOpacity>
</View>
{showStart && (
  <DateTimePicker
    value={data.startDate}
    mode={mode}
    is24Hour={true}
    display="spinner"
    onChange={onChangeStartDate}
    minimumDate={new Date()}
    onClose={()=>{setShowStart(false)}}
  />
)}
<View>
<Text style={[style.label,{right:19}]}>Set End Date:</Text>
<TouchableOpacity  onPress={() => showEndMode('date')}>
<View style={{flexDirection:"column",right:19}}>
   <TextInput 
   style={style.inputS}
   placeholder='Enter a End Date'
   value={data.endDate.toLocaleDateString()}
   editable={false}/>
   </View>
</TouchableOpacity>
</View>
</View>
{showEnd && (
  <DateTimePicker
    value={data.endDate}
    mode={mode}
    is24Hour={false}
    display="spinner"
    onChange={onChangeEndDate}
    minimumDate={new Date()}
    onClose={()=>{setShowEnd(false)}}
  />
)}

<Text style={style.label}>Enter Dosage</Text>
        <TextInput
        placeholder='1-2-2'
        style={style.input}
        onChangeText={(val) => setData({...data,dosage:val})}
        />

<Text style={style.label}>Enter Instruction</Text>
<View style={{height:80,width:300,borderWidth:1,borderRadius:10, borderColor: '#ccc',marginRight:45}}>
        <TextInput
        placeholder='Enter Instructions'
        onChangeText={(val) => setData({...data,description:val})}
        
        />
</View>
<TouchableOpacity onPress={submitPrescription} style={style.buttonView}><Text style={style.buttonTxt2}>Submit</Text></TouchableOpacity>
      </View>
      </ScrollView>
      {/* <TouchableOpacity onPress={submitPrescription} style={style.buttonView}><Text style={style.buttonTxt2}>Submit</Text></TouchableOpacity> */}
    </View>
        )}
const style=StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:"white"
    //  borderWidth:1,
    //  margin:10
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
      input: {
        height: 40,
        width:300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
      },
      label:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"#1A1A1A"},
        inputS: {
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginBottom: 15,
          },
          buttonView:{
            height:45,
            width:120,
            
            // borderColor:"#6AAB9C",
            borderRadius:5,
            marginLeft:65,
            alignSelf:"center",
            marginTop:10,
            justifyContent:"center",
            right:20,
            backgroundColor:"#178CCB"
           },
           buttonTxt2:{
            fontSize:16,
            alignSelf:'center',
            fontWeight:'bold',
            // color:'#6AAB9C',
            color:"white",
            margin:5,
           },
})
export default DoctorPrescription