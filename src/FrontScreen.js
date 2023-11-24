import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Button, TouchableOpacity, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

// import LottieView from 'lottie-react-native';

function FrontScreen({ navigation }) {
    return (
        <View style={style.MainBox}>
            {/* <View style={{borderWidth:1,justifyContent:"center",alignItems:"center",marginTop:20}}> */}
            <Image source={require('../Images/MobileLogin.gif')} style={{ width: 380, height: 380, }} />
            <View style={{borderWidth:0,justifyContent:"center",marginTop:0,alignItems:"center",bottom:35}}>
            <View style={{justifyContent:"center",right:5}}>
            <Text style={{fontSize:30,fontWeight:"bold",color:"black"}}>Let's get you</Text>
            <Text style={{fontSize:30,fontWeight:"bold",color:"black"}}>started</Text>
            <Text style={{fontSize:16,fontWeight:"bold"}}>Sign up using your preferred option</Text></View>
            </View>
            <View style={style.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                    <Text style={style.buttontext}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            <View style={style.SignUpButton}>
                <TouchableOpacity  onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={style.buttontext}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
         </View>
    )
}

const style = StyleSheet.create({
    MainBox: {
        backgroundColor: "white",
        flex: 1,
        // justifyContent:"center",
    },
    button:{
        marginTop:30,
        borderWidth:0,
        height:75,
        width:170,
        justifyContent:"center",
        borderBottomRightRadius:60,
        borderTopRightRadius:60,
        backgroundColor:"#178CCB",
        elevation:3
    },
    buttontext:{
        fontSize:19,
        fontWeight:"bold",
        color:"white",
        textAlign:"center"
    },
    SignUpButton:{
        marginTop:20,
        borderWidth:0,
        height:75,
        width:170,
        justifyContent:"center",
        borderBottomLeftRadius:60,
        borderTopLeftRadius:60,
        backgroundColor:"#178CCB",
        alignSelf:"flex-end",
        elevation:2
    },
})
export default FrontScreen