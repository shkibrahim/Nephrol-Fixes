import React, {useState, useEffect,useContext} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { DrawerActions } from '@react-navigation/native';
import {StyleSheet,Button,TextInput,View, Text, Keyboard, Alert, Modal, Image, TouchableOpacity,
} from 'react-native';
import { UserContext } from '../Hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';


function Some({navigation}){
    const {patientName}=useContext(UserContext)
    const handelMED=()=>{
        navigation.navigate("MedicineHome")
    }
    const opendrawer=()=>{
    //  navigation.openDrawer();
    navigation.dispatch(DrawerActions.openDrawer())
    }
    return(
        <View style={style.MainBox}>
            <View style={{elevation:3, borderBottomEndRadius:20,borderBottomStartRadius:20,
                borderWidth:0,margin:8,height:170,marginBottom:10,backgroundColor:"white",
                flexDirection:"column",}}>
                <View style={{borderWidth:0,flexDirection:"row",justifyContent:"space-between",margin:15}}>
                <TouchableOpacity onPress={opendrawer}>
                     <EvilIcons
                name="navicon"
                size={35}
                color={"black"}
                style={{borderWidth:0,marginStart:5}}
                /></TouchableOpacity>

                <TouchableOpacity>
                <MaterialIcons
                // name='logout'
                name="notifications-none"
                size={30}
                color={"black"}
                style={{}}/></TouchableOpacity>
                </View>

                <View style={{marginStart:25,flexDirection:"column",justifyContent:"flex-start",borderWidth:0}}>
                <Text style={{fontSize:27,fontWeight:"bold",color:"#40413F",}}>Hello,{patientName}</Text>
                <Text style={{marginTop:10,fontSize:18,fontWeight:"bold",color:'#5c5c5c',}}>How can we help you, today?</Text></View>
                
            </View>
        
            <View style={{backgroundColor:"#F8F8F8",margin:10,borderRadius:20,
             flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",}}>
                <TextInput
                placeholder='Search Doctor'
                style={{width:260,borderRadius:10,borderWidth:0}}/>
                 <FontAwesome5
            name="search"
            size={20}
            color="black">
            </FontAwesome5>
            </View>
 {/*  services Box */}

            <View style={[style.CardBox,{flexDirection:"column",elevation:5,backgroundColor:"white",marginTop:10}]}> 
            <View style={{margin:10,borderWidth:0}}>
            <Text style={{marginStart:9,fontSize:21,fontWeight:"bold",color:"#40413F"}}>Our Services</Text></View>
             {/* appointmnet */}
             <TouchableOpacity onPress={()=>{navigation.navigate("MyAppointments")}}>
            <View style={[style.CardBox,{backgroundColor:"#FFE5E9",height:70,justifyContent:"space-around",alignItems:"center"}]}>
            <FontAwesome5 name={'calendar-alt'} size={50} color="#FFADB9"style={{borderWidth:0}} />
              <Text style={{color:"#FFADB9",fontSize:20,fontWeight:"bold",marginEnd:50}}>Appointmnets</Text>
            </View> 
            </TouchableOpacity>
            
            {/* REPORT */}
            <TouchableOpacity onPress={()=>(navigation.navigate('ViewReports'))}>
            <View style={[style.CardBox,{backgroundColor:"#D0E9E9",height:70,justifyContent:"space-around",alignItems:"center"}]}>
            <Image source={require('../Images/diagnosis.png')} style={{ width: 60, height: 60,}} />
             <Text style={{color:"#388E8E",fontSize:20,fontWeight:"bold",borderWidth:0,marginEnd:62}}>View Reports</Text>
            </View> 
            </TouchableOpacity>
            {/* pills */}
            <View style={[style.CardBox,{justifyContent:"space-around",alignItems:"center",borderWidth:0}]}>
            <TouchableOpacity onPress={handelMED} style={{alignItems:"center"}}>
            <View style={[style.card,{backgroundColor:"#D3E7EE",width:170}]}>
            <FontAwesome5 name={'prescription-bottle-alt'} size={45} color="#4A777A" />
             <Text style={{color:"#4A777A",fontSize:18,fontWeight:"bold"}}>Pills Reminder</Text>
            </View>
            </TouchableOpacity>
            {/* complaint */}
            <TouchableOpacity onPress={()=>{navigation.navigate("Complaint")}}>    
            <View style={[style.card,{backgroundColor:"#FEEACE",width:170,height:110}]}>
            <MaterialIcons name={'rate-review'} size={50} color="#FFCB7D" />
             <Text style={{color:"#FFCB7D",fontSize:18,fontWeight:"bold"}}>Complaint</Text>
            </View> 
            </TouchableOpacity>
            </View>

            {/* feedback and prescription */}
            <View style={[style.CardBox,{justifyContent:"space-around",alignItems:"center"}]}>
            
            <TouchableOpacity style={[style.card,{width:170}]} onPress={()=>{navigation.navigate('Prescription')}}>
            <FontAwesome5 name={'file-medical'} size={50} color="#6AAB9C" />
             <Text style={{color:"#6AAB9C",fontSize:18,fontWeight:"bold"}}> Prescription</Text>
            </TouchableOpacity>

             <View style={[style.card,{backgroundColor:"#DFDFF5",width:170}]}>  
             <MaterialIcons name={'feedback'} size={55} color="#42426F" />   
             <Text style={{color:"#42426F",fontSize:18,fontWeight:"bold"}}>Doctor Feedback</Text>
            </View>
            </View>
            
           </View>
             {/* bottom navigation */}
             {/* <LinearGradient colors={['#FFC0D7','#E6879E']} style={[style.BottomNavBox]}>
             {/* <View style={style.BottomNavBox}>  */}
         {/* <TouchableOpacity>
          <FontAwesome5
            name="home"
            size={27}
            color="white">
            </FontAwesome5>
        </TouchableOpacity>

        <TouchableOpacity>
        <MaterialIcons
            name="notifications"
            size={29}
            color="white">
            </MaterialIcons>
        </TouchableOpacity>

        <TouchableOpacity>
        <FontAwesome5
            name="user"
            size={27}
            color="white">
            </FontAwesome5>
        </TouchableOpacity>
    
        <TouchableOpacity>
        <MaterialIcons
            name="settings"
            size={27}
            color="white">
            </MaterialIcons>
        </TouchableOpacity>
            </LinearGradient> */}
            
                {/* <BottomNavigator/> */}
            
           </View>
            
                )
}

    
const style = StyleSheet.create({
    MainBox:{
        backgroundColor:"white",
        flex:1,
        // justifyContent:"center",
    },
    AboutBox:{
        margin:10,
        // borderWidth:1,
        height:70,
        backgroundColor:"white",
        borderRadius:10,
        elevation:5,
    },
    CardBox:{
        // borderWidth:1,
        margin:8,
        flexDirection:"row",
        // backgroundColor:"white",
        // elevation:2,
        borderRadius:10,
        justifyContent:"space-between",
    },
    card:{
        // borderWidth:1,
        height:110,
        width:110,
        // margin:12,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#E0ECDE",
        // backgroundColor:"white",
        borderRadius:10,
        // flexDirection:"row"

    },
    BottomNavBox:{
        // borderWidth:1,
        alignSelf:"flex-end",
        // margin:10,
        flexDirection:"row",
        justifyContent:"space-evenly",
        // backgroundColor:"#F8F8F8",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        width:393,
        elevation:5,
        // marginTop:15
        
    }
})
export default Some