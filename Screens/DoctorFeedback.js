import React, { useState ,useContext } from 'react';
import { UserContext } from '../Hooks/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet,TextInput,View,Text,Alert,Image,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Rating } from 'react-native-stock-star-rating'
import { RatingInput } from 'react-native-stock-star-rating'



const DoctorFeedback=({navigation})=>{
  
    const { doctorEmail } = useContext(UserContext);
    const [rating,setRating] = React.useState(0);
    const [data,setData]=useState({
        doctorEmail:"",
        feedback:""
      })

      
     const submitReport=async()=>{
      console.log("submit report")
      const requestData = {
        doctorEmail: data.doctorEmail,
        feedback: data.feedback,
        rating: rating, // Include the rating in the request data
      };
      try {
        const response = await axios.post(
          "http://172.20.10.4:8080/patient/submitFeedback",requestData
        );
        if(response){
          // console.log(response.data)
          Alert.alert("Submitted Sucessfully!!")
          clearFields();
        }
          console.log(rating)
          // Alert.alert("Submitted Sucessfully!!")
        }
      catch (error) {
        console.log(error);
      }
     }
     const clearFields = () => {
      setData({
        doctorEmail: "",
        feedback: "",
      });
      setRating(0);
    };
  


    return(
    <View style={style.container}>
        <View style={[style.header]}>
    <TouchableOpacity onPress={()=>{navigation.navigate("PatientHomeScreen")} }style={{borderWidth:0,position:"absolute",left:10,padding:10}}>
     <AntDesign
      name="arrowleft"
      size={30}
      color='black'
     /></TouchableOpacity>
          <Text style={[style.headerTxt]}>Feedback</Text>
      </View>

      <View style={{alignItems:"center",marginTop:30}}>
      <Image source={require('../Images/rating.png')} style={{ width: 100, height: 100 }} />
      <Text style={{fontSize:23,fontWeight:"bold",marginTop:5,color:"#1A1A1A"}}>Feedback Form </Text>
      </View>
      <View style={{borderWidth:0,marginTop:20,justifyContent:"center",marginLeft:45,marginRight:10}}>
        <Text style={style.label}>Enter Doctor's Email</Text>
        <TextInput
        placeholder='Email'
        style={style.input}
        onChangeText={(val) => setData({...data,doctorEmail:val})}
        value={data.doctorEmail}
        />
       <Text style={style.label}>Enter Message</Text>
       <View style={{height:80,borderWidth:1,borderRadius:10, borderColor: '#ccc',marginRight:45}}>
        <TextInput
        placeholder='Enter Feedback'
        onChangeText={(val) => setData({...data,feedback:val})}
        value={data.feedback}
        multiline
        />
      </View>
        <Text style={[style.label,{marginTop:10}]}>Rate your Experience</Text>
        <View style={{borderWidth:0,marginTop:0,justifyContent:"center",left:20}}>
        <RatingInput 
        rating={rating} 
        setRating={setRating} 
        size={35}  
        maxStars={5} 
        bordered={true}

    /></View>
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
export default DoctorFeedback