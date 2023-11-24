import  React, {useState} from 'react';
import { View, Text,Button,Alert, StyleSheet, TextInput,Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icon from the library
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'; 


function FrontScreen({navigation}){
  
  const handelSignIn=()=>{
    navigation.navigate("SignIn");

  }
  const handelSignUp=()=>{
    navigation.navigate("SignUp");

  }
 
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      <Image source={require('../Images/logo.png')} style={styles.Image}/>
      </View>
      <View style={styles.header2}>
      <View style={styles.footer}>
      <View style={{borderWidth:1,justifyContent:"center",alignItems:"center",margin:20,height:50,borderRadius:5,borderColor:"#E6879E"}}>
        <Text style={{fontSize:18,color:"#5c5c5c",fontWeight:"bold"}}>Sign In As Patient</Text>
      </View>

      <View style={{borderWidth:1,borderRadius:5,justifyContent:"center",alignItems:"center",margin:20,height:50,borderColor:"#E6879E"}}>
        <Text style={{fontSize:18,color:"#5c5c5c",fontWeight:"bold"}}>Sign In As Doctor</Text>
      </View>
      
    </View>
    </View>
    </View>

        
        
  
    
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
 
  header: {
    flex: 4,
    justifyContent:'flex-start',
    // borderWidth:1,
    paddingHorizontal: 20,
    backgroundColor:"white",
    // margin:10,
},
header2:{
 flex:3,
// borderWidth:1,
margin:10

},
heading:{
 fontSize:50,
 fontWeight:'bold',
 textAlign:'center',
 marginTop:60,

},
 footer:{
  marginTop:-190,
  width:300,
  height:300,
  backgroundColor:'white',
  alignSelf:'center',
  elevation:10,
  shadowColor:'black',
  borderRadius:10,
  // borderWidth:1, 
  justifyContent:"center",
  backgroundColor:"#f5f5f5"
},
appButton: {

  padding: 12,
  // marginTop:20,
  borderRadius:10,
  // borderWidth:2,
  shadowColor:"white",
  backgroundColor:'#E2DFEB',
  marginHorizontal:10,
  borderWidth:1,

},
appButtonText: {
  fontSize: 18,
  fontWeight:'bold',
  alignContent:'center',
  alignSelf:'center',
  marginLeft:10,
},
appButtonContainer: {
  paddingVertical: 10,
  paddingHorizontal: 12,
  // marginVertical:60,
  marginTop:60,
  borderWidth:1,
  justifyContent:"space-between"

},

appButtonContainer2: {
  paddingVertical: 10,
  paddingHorizontal: 12,
  // marginVertical:60,
  marginTop:40,
  borderWidth:1
},
Image:{
  width:350,
  height:70,
  marginTop:85,
  
 }
});
export default FrontScreen