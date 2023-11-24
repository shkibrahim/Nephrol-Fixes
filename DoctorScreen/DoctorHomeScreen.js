import React, { useState, useEffect, useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { DrawerActions } from '@react-navigation/native';
import {StyleSheet,ScrollView, Button, TextInput, View, Text, Keyboard, Alert, Modal, Image, TouchableOpacity,} from 'react-native';
import { UserContext } from '../Hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';


function DoctorHomeScreen({ navigation }) {
    const { doctorName } = useContext(UserContext)
    
    
    const opendrawer = () => {
        //  navigation.openDrawer();
        navigation.dispatch(DrawerActions.openDrawer())
    }
    return (
        <View style={style.MainBox}>
            <View style={{
                elevation: 3, borderBottomEndRadius: 20, borderBottomStartRadius: 20,
                borderWidth: 0, margin: 0, height: 260, marginBottom: 10, backgroundColor:"#74bae0",
                flexDirection: "column",
            }}>
                {/* backgroundColor:"#74bae0" */}
                <View style={{ borderWidth: 0, flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
                    <TouchableOpacity onPress={opendrawer}>
                        <EvilIcons
                            name="navicon"
                            size={35}
                            color={"black"}
                            style={{ borderWidth: 0, marginStart: 5 }}
                        /></TouchableOpacity>

                    <TouchableOpacity>
                        <MaterialIcons
                            // name='logout'
                            name="notifications-none"
                            size={30}
                            color={"black"}
                            style={{}} /></TouchableOpacity>
                </View>

                <View style={{ marginStart: 25, flexDirection: "column", justifyContent: "flex-start", borderWidth: 0,top:5 }}>
                    <Text style={{ fontSize: 27, fontWeight: "500", color: "black", }}>Hello,{doctorName}</Text>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500", color: 'black', }}>How can we help you, today?</Text></View>

            </View>

            <View style={{ borderWidth: 0, backgroundColor: "white", margin: 15, borderRadius: 45,
             justifyContent: "space-between", elevation: 2,marginTop:-100,paddingTop:10,paddingBottom:10 }}>
               <View style={{flexDirection:"row",justifyContent:"space-between",margin:2,
               borderWidth:0,borderBottomLeftRadius:30,paddingBottom:10,borderRadius:10,elevation:0}}>
                <View style={{ justifyContent: "center", left: 20,borderWidth:0,height:80,alignSelf:"center",top:15 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>Explore </Text>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>Our Services !!</Text></View>
                <View style={{borderWidth:0}}>
                <Image source={require('../Images/services2.gif')} style={{width:160,height:120,top:5,right:7 }} />
                </View>
            </View>
            
            <View style={{ borderWidth:0, marginLeft: 10,marginRight:10, justifyContent: "space-evenly",marginTop:0}}>
                
                <TouchableOpacity style={style.CardBox} onPress={()=>{Alert.alert("Upcoming Appointments")}}>
                    <View style={[style.fontIcon,{right:8}]}>
                        <FontAwesome5 name={'calendar-alt'} size={30} color={"#178CCB"} />
                    </View>
                    <Text style={[style.subHeading,{right:10}]}>Appointmnets</Text>
                {/* </View> */}
                </TouchableOpacity>
            

                <TouchableOpacity style={style.CardBox} onPress={()=>{Alert.alert("Upcoming Shedule")}}>
                    <View style={[style.fontIcon,{right:10}]}>
                    <Image source={require('../Images/timetable.png')} style={{ width: 30, height: 30,}} />
                    </View>
                    <Text style={[style.subHeading,{right:16}]}>My Schedule</Text>
                </TouchableOpacity>

                

                {/* <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <View style={style.smallCard}>
                    <View style={style.fontIcon}>
                    <MaterialIcons name={'feedback'} size={35} color="#178CCB" />  
                    </View>
                    <Text style={style.subHeadingsmall}>Doc Feedback</Text>
                    </View>
                    <View style={style.smallCard}>
                    <View style={style.fontIcon}>
                    <FontAwesome5 name={'file-medical'} size={35} color="#178CCB" /></View>
                    <Text style={style.subHeadingsmall}>Prescription</Text>
                    </View>
                    <View style={style.smallCard}>
                    {/* <FontAwesome5 name={'prescription-bottle-alt'} size={45} color="#178CCB" /> */}
                    {/* <View style={style.fontIcon}>
                    <FontAwesome5 name={'prescription-bottle-alt'} size={35} color="#178CCB" />
                    </View>
                    <Text style={style.subHeadingsmall}>Pills Reminder</Text>
                    </View> */}


                

                <View style={style.rowBox}>
                    <TouchableOpacity style={style.cards} onPress={()=>{navigation.navigate("PatientsReports")}}>
                        <View style={style.fontIcon}>
                        <Image source={require('../Images/medical-report.png')} style={{ width: 35, height: 35}} />
                        </View>
                        <Text style={style.subHeadingsmall}>Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ style.cards} onPress={()=>{navigation.navigate("DoctorPrescription")}} >
                        <View style={ style.fontIcon}>
                        <FontAwesome5 name={'file-medical'} size={30} color="#178CCB" />
                        </View>
                        <Text style={style.subHeadingsmall}>Prescription</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.rowBox}>
                    <TouchableOpacity style={style.cards} onPress={()=>{navigation.navigate("Feedback")}}>
                        <View style={style.fontIcon}>
                      <Image source={require('../Images/check-up.png')} style={{ width: 34, height: 34,left:4}} />
                        </View>
                        <Text style={style.subHeadingsmall}>Report Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ style.cards} onPress={()=>{navigation.navigate("DoctorComplaint")}}>
                        <View style={ style.fontIcon}>
                        <MaterialIcons name={'rate-review'} size={30} color="#178CCB" />
                        </View>
                        <Text style={style.subHeadingsmall}>Complaint</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>



        </View>







    )
}


const style = StyleSheet.create({
    MainBox: {
        backgroundColor: "white",
        flex: 1,
        borderWidth: 1
    },
    CardBox: {
        borderWidth: 0,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-evenly",
        height: 70,
        alignItems: "center",
        elevation: 2,
        backgroundColor: "white",
        marginBottom:10,
        borderRadius:15

    },
    fontIcon: {
        height: 60,
         width: 60,
          justifyContent: "center", 
          borderRadius: 75,
        padding: 10, 
        // backgroundColor: "#A2D1EA",
        backgroundColor:"#f5f5f5",
         alignItems: "center"
    },
    rowBox:{
        flexDirection: "row", 
        justifyContent: "space-around",
        marginBottom:10,
        borderWidth:0,
    },
    subHeading:{
        color: "black", 
        fontSize: 18, 
        fontWeight: "500",
        
    },
    cards:{
        justifyContent: "center", 
        height: 100, 
        width: 140, 
        alignItems: "center",
         backgroundColor: "white", 
         elevation: 2,
         borderRadius:15,
         borderWidth:0

    },
    smallCard:{

        justifyContent:"space-evenly",
        alignItems:"center",
        width:105,
        backgroundColor:"white",
        elevation:2,
        height:120,
        borderRadius:15,
        marginBottom:15,
    
        
    },
    subHeadingsmall:{
        color: "black", 
        fontSize: 15, 
        fontWeight: "500"
    },
    endCard:{
        justifyContent:"space-evenly",
        alignItems:"center",
        width:180,
        backgroundColor:"white",
        elevation:2,
        height:120,
        borderRadius:15,
        marginBottom:15
        
    },

})
export default DoctorHomeScreen









// import React, {useState, useEffect,useContext} from 'react';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from "@react-navigation/native";
// import { useRoute } from '@react-navigation/native';
// import {
//   StyleSheet,
//   Button,
//   TextInput,
//   View,
//   Text,
//   Keyboard,
//   Alert,
//   Modal,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import { UserContext } from '../Hooks/AuthContext';
// // import BottomNavigator from './Compoents'





// function DoctorHomeScreen({navigation}){
//     const {doctorName}=useContext(UserContext)
//     const route = useRoute();
//     const handelMED=()=>{
//         navigation.navigate("MedicineHome")
//     }
//     return(
//         <View style={style.MainBox}>
//             <View style={{elevation:3, borderBottomEndRadius:30,borderBottomStartRadius:30,
//                 borderWidth:0,margin:5,height:200,marginBottom:10,backgroundColor:"white",
//                 flexDirection:"column",}}>
//                 <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-between",margin:10}}>
//                 <TouchableOpacity >
//                      <EvilIcons
//                 name="navicon"
//                 size={35}
//                 color={"black"}
//                 style={{borderWidth:0,marginStart:5}}
//                 /></TouchableOpacity>

//                 <TouchableOpacity>
//                 <MaterialIcons
//                 // name='logout'
//                 name="notifications-none"
//                 size={30}
//                 color={"black"}
//                 style={{}}/></TouchableOpacity>
//                 </View>

//                 <View style={{marginStart:25,flexDirection:"column",justifyContent:"flex-start",borderWidth:0,marginTop:20}}>
//                 <Text style={{fontSize:27,fontWeight:"bold",color:"#40413F",}}>Hello, {doctorName}</Text>
//                 <Text style={{marginTop:10,fontSize:18,fontWeight:"bold",color:'#5c5c5c',}}>How can we help you, today?</Text></View>
                
//             </View>
        
//             {/* <View style={{backgroundColor:"#F8F8F8",margin:10,borderRadius:20,
//              flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",}}>
//                 <TextInput
//                 placeholder='Search Doctor'
//                 style={{width:260,borderRadius:10,borderWidth:0}}/>
//                  <FontAwesome5
//             name="search"
//             size={20}
//             color="black">
//             </FontAwesome5>
//             </View> */}
//  {/*  services Box */}

//             <View style={[style.CardBox,{borderWidth:0,flexDirection:"column",elevation:5,backgroundColor:"white",marginTop:30,paddingTop:20,paddingBottom:20}]}> 
//             {/* <View style={{margin:10,borderWidth:0}}>
//             <Text style={{marginStart:9,fontSize:21,fontWeight:"bold",color:"#40413F"}}> Our Services</Text>
//             </View> */}
//              {/* appointment */}
//              <TouchableOpacity>
//             <View style={[style.CardBox,{backgroundColor:"#FFE5E9",height:70,justifyContent:"space-around",alignItems:"center"}]}>
//             <FontAwesome5 name={'calendar-alt'} size={50} color="#FFADB9"style={{borderWidth:0}} />
//               <Text style={{color:"#FFADB9",fontSize:20,fontWeight:"bold",marginEnd:50}}>Appointmnets</Text>
//             </View> 
//             </TouchableOpacity>
            
//             {/* REPORT */}
//             <TouchableOpacity onPress={()=>(navigation.navigate("PatientsReports"))}>
//             <View style={[style.CardBox,{backgroundColor:"#D0E9E9",height:70,justifyContent:"space-around",alignItems:"center"}]}>
//             <Image source={require('../Images/diagnosis.png')} style={{ width: 60, height: 60,}} />
//              <Text style={{color:"#388E8E",fontSize:20,fontWeight:"bold",borderWidth:0,marginEnd:62}}>View Reports</Text>
//             </View> 
//             </TouchableOpacity>
//             {/* pills */}
//             <View style={[style.CardBox,{justifyContent:"space-around",alignItems:"center",borderWidth:0}]}>
//             <TouchableOpacity onPress={handelMED} style={{alignItems:"center"}}>
//             <View style={[style.card,{backgroundColor:"#D3E7EE",width:170}]}>
//             <FontAwesome5 name={'prescription-bottle-alt'} size={45} color="#4A777A" />
//              <Text style={{color:"#4A777A",fontSize:18,fontWeight:"bold"}}>Pills Reminder</Text>
//             </View>
//             </TouchableOpacity>
//             {/* complaint */}
//             <TouchableOpacity onPress={()=>{navigation.navigate("Complaint")}}>    
//             <View style={[style.card,{backgroundColor:"#FEEACE",width:170,height:110}]}>
//             <MaterialIcons name={'rate-review'} size={50} color="#FFCB7D" />
//              <Text style={{color:"#FFCB7D",fontSize:18,fontWeight:"bold"}}>Complaint</Text>
//             </View> 
//             </TouchableOpacity>
//             </View>

//             {/* feedback and prescription */}
//             <View style={[style.CardBox,{justifyContent:"space-around",alignItems:"center"}]}>
            
//             <TouchableOpacity style={[style.card,{width:170}]} onPress={()=>{navigation.navigate('DoctorPrescription')}}>
//             <FontAwesome5 name={'file-medical'} size={50} color="#6AAB9C" />
//              <Text style={{color:"#6AAB9C",fontSize:18,fontWeight:"bold"}}> Prescription</Text>
//             </TouchableOpacity>
              
//              <TouchableOpacity onPress={()=>{navigation.navigate("Feedback")}}>
//              <View style={[style.card,{backgroundColor:"#DFDFF5",width:170}]}>  
//              <MaterialIcons name={'feedback'} size={55} color="#42426F" />   
//              <Text style={{color:"#42426F",fontSize:18,fontWeight:"bold"}}>Doctor Feedback</Text>
//             </View>
//             </TouchableOpacity>
//             </View>
            
//            </View>
//              {/* bottom navigation */}
//              {/* <LinearGradient colors={['#FFC0D7','#E6879E']} style={[style.BottomNavBox]}>
//              {/* <View style={style.BottomNavBox}>  */}
//          {/* <TouchableOpacity>
//           <FontAwesome5
//             name="home"
//             size={27}
//             color="white">
//             </FontAwesome5>
//         </TouchableOpacity>

//         <TouchableOpacity>
//         <MaterialIcons
//             name="notifications"
//             size={29}
//             color="white">
//             </MaterialIcons>
//         </TouchableOpacity>

//         <TouchableOpacity>
//         <FontAwesome5
//             name="user"
//             size={27}
//             color="white">
//             </FontAwesome5>
//         </TouchableOpacity>
    
//         <TouchableOpacity>
//         <MaterialIcons
//             name="settings"
//             size={27}
//             color="white">
//             </MaterialIcons>
//         </TouchableOpacity>
//             </LinearGradient> */}
            
//                 {/* <BottomNavigator/> */}
            
//            </View>
            
//                 )
// }

    
// const style = StyleSheet.create({
//     MainBox:{
//         backgroundColor:"#f5f5f5",
//         flex:1,
//         // justifyContent:"center",
//     },
//     AboutBox:{
//         margin:10,
//         // borderWidth:1,
//         height:70,
//         backgroundColor:"white",
//         borderRadius:10,
//         elevation:5,
//     },
//     CardBox:{
//         // borderWidth:1,
//         margin:8,
//         flexDirection:"row",
//         // backgroundColor:"white",
//         // elevation:2,
//         borderRadius:10,
//         justifyContent:"space-between",
//     },
//     card:{
//         // borderWidth:1,
//         height:110,
//         width:110,
//         // margin:12,
//         justifyContent:"center",
//         alignItems:"center",
//         backgroundColor:"#E0ECDE",
//         // backgroundColor:"white",
//         borderRadius:10,
//         // flexDirection:"row"

//     },
//     BottomNavBox:{
//         // borderWidth:1,
//         alignSelf:"flex-end",
//         // margin:10,
//         flexDirection:"row",
//         justifyContent:"space-evenly",
//         // backgroundColor:"#F8F8F8",
//         alignItems:"center",
//         alignSelf:"center",
//         height:50,
//         width:393,
//         elevation:5,
//         // marginTop:15
        
//     }
// })
// export default DoctorHomeScreen;