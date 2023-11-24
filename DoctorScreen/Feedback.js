import React, { useState ,useContext } from 'react';
import { UserContext } from '../Hooks/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  StyleSheet,TextInput,View,Text,Alert,Image,TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Feedback=({navigation})=>{
  
    const { doctorEmail } = useContext(UserContext);

    const [data,setData]=useState({
        doctorEmail:doctorEmail,
        reportId:"",
        patientEmail:"",
        description:""
      
        
      })
      const clearFields = () => {
        setData({
          doctorEmail: data.doctorEmail, // Retain the doctorEmail if needed
          reportId:"",
          patientEmail:"",
          description:""
        });
      };

      
     const submitReport=async()=>{
      console.log("submit report")
      try {
        const response = await axios.post(
          // "http://10.0.2.2:8080/doctor/provideFeedback",data
          "http://172.20.10.4:8080/doctor/provideFeedback",data

        );
        if(response){
          console.log(response.data)
          Alert.alert("Submitted Sucessfully!!")
          clearFields()
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
          <Text style={[style.headerTxt]}>Feedback</Text>
      </View>

      <View style={{alignItems:"center",marginTop:30}}>
      <Image source={require('../Images/speech-bubble.png')} style={{ width: 100, height: 100 }} />
      <Text style={{fontSize:23,fontWeight:"bold",marginTop:5,color:"#1A1A1A"}}>Feedback Form </Text>
      </View>
      <View style={{borderWidth:0,marginTop:20,justifyContent:"center",marginLeft:30,marginRight:10}}>
        <Text style={style.label}>Enter Patient's Email</Text>
        <TextInput
        placeholder='Email'
        style={style.input}
        onChangeText={(val) => setData({...data,patientEmail:val})}
        />
        <Text style={style.label}>Enter Report ID</Text>
        <TextInput
        placeholder='Report ID'
        style={style.input}
        onChangeText={(val) => setData({...data,reportId:val})}
        />
       <Text style={style.label}>Enter Instruction</Text>
       <View style={{height:80,borderWidth:1,borderRadius:10, borderColor: '#ccc',marginRight:45}}>
        <TextInput
        placeholder='Enter Feedback'
        onChangeText={(val) => setData({...data,description:val})}
        multiline
        />
      </View>
      </View>

      <TouchableOpacity onPress={submitReport} style={style.buttonView}><Text style={style.buttonTxt2}>Submit</Text></TouchableOpacity>
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
        // borderBottomColor:"#6AAB9C",
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
            borderWidth:2,
            // borderColor:"#6AAB9C",
            borderColor:"#388E8E",
            borderRadius:5,
            marginLeft:65,
            borderWidth:1,
            alignSelf:"center",
            marginTop:20,
            justifyContent:"center",
            right:20,
            // backgroundColor:"#6AAB9C"
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
export default Feedback