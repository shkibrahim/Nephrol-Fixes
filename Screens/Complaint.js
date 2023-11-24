import  React, {useState,useContext} from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity,TextInput,Alert,Image,SafeAreaView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserContext } from '../Hooks/AuthContext';
import axios from 'axios';

const Complaint = ({navigation}) => {
    const [complaint, setComplaint] = useState('');
    const { patientEmail } = useContext(UserContext);

    const submitComplaint = async() => {
      if(complaint==''){
        Alert.alert("Please enter Complaint!")
      }
      else{
      const compainner = "Patient";
      try {
        const response = await axios.post(
          "http://172.20.10.4:8080/patient/submitComplaint",
          {
            email: patientEmail,
            complainer: compainner,
            description: complaint
          }
        );
        if(response){
          console.log(response.data)
          Alert.alert("Complaint Submitted Successfully")
          setComplaint('')
        }
       
      }
      catch (error) {
        console.log(error);
      }
    }
  };
  
  
  return (
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
    <Text style={[styles.headerTxt]}> Complaint </Text>
      </View>
      <View style={{borderWidth:0,justifyContent:"center",alignItems:"center",marginTop:60}}>
      <Image source={require('../Images/complaint.png')} style={{ width: 230, height: 150}} />
      <Text style={{fontSize:20,margin:10,color:"black",fontWeight:"bold"}}> Register you Complaint Here !</Text>
      </View>
      <View style={{borderWidth:1,margin:20,height:150,borderRadius:7}}>
        <TextInput
        placeholder='Write your Complaint Here....'
        style={{borderWidth:0,margin:10}}
        value={complaint}
        onChangeText={(value)=>setComplaint(value)}
        multiline
        />
      </View>
      <TouchableOpacity style={styles.buttonDelete} onPress={submitComplaint}><Text style={styles.buttonTxt1}>Submit</Text></TouchableOpacity>

      </SafeAreaView>
  )}
  const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white"
    },

  PrescriptionBox:{
    borderWidth:0.8,
    margin:10,
    flexDirection:"column",
    justifyContent:"space-evenly",
    backgroundColor:"white",
    borderRadius:10,
    elevation:2,
    // borderColor:"#6AAB9C"
    borderColor:"#178CCB"
  
  },
  buttonDelete:{
    // borderWidth:1,
    height:40,
    width:120,
    backgroundColor:'#178CCB',
    // borderColor:"#EFD1D9",
    // borderWidth:1,
    borderRadius:20,
    // marginTop:5,
    alignSelf:"flex-end",
    right:30,
    justifyContent:"center"
   },
   buttonTxt1:{
    fontSize:16,
    alignSelf:'center',
    fontWeight:'bold',
    // color:"#5c5c5c",
    color:"white",
    margin:5,
   },
   headerTxt: {
    // marginLeft: 58,
    fontFamily: 'Inter',
    // marginTop: 8,
    // alignSelf:'center',
    fontSize: 22,
    marginRight:20,
    color: '#40413F',
    fontWeight:'bold',
    borderWidth:0,
    left:25,
    // justifyContent:"center"
  },header: {
    // flex:1,
    // backgroundColor: '#E6879E',
    height: 60,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center",
    borderBottomWidth:1.7,
    // borderBottomColor:"#6AAB9C",
    borderBottomColor:"#178CCB",
    

    // elevation:5,
    // shadowColor:"#6AAB9C"
    // margin:10,
    // paddingTop:10,
  },

  })
  export default Complaint;