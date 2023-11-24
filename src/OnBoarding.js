import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Animated, Image,Button, TouchableOpacity,Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

// import LottieView from 'lottie-react-native';

function OnBoarding({ navigation }) {
    const Dots = ({selected}) => {
        let backgroundColor;
        backgroundColor = selected ? '#178CCB' : 'black'
        return (
        <View
        style={{
            width:24,
            height:6,
            marginHorizontal:3,
            backgroundColor,
            // borderWidth:1,
            bottom:30,
            // borderRadius:100
        }}
        />
        )
    }
    
    const Next=({nextLabel,...props})=>{
        return(
        <TouchableOpacity style={style.skipButton}
        {...props}>
            <AntDesign
            name="arrowright"
            color='white'
            size={28}/>
            {/* <Text style={style.skipText}>{nextLabel}</Text> */}
        </TouchableOpacity>
        )
    }
    
    const Done=({DoneLabel,...props})=>{
        return(
        <TouchableOpacity style={style.skipButton}
        {...props}
        onPress={()=>navigation.navigate('FrontScreen')}>
            <MaterialIcons
            name="done"
            color='white'
            size={30}/>
            {/* <Text style={style.skipText}>{nextLabel}</Text> */}
        </TouchableOpacity>
        )
    }
    
     
    return (
        <SafeAreaView style={style.MainBox}>
            <Onboarding
            DotComponent={Dots}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            bottomBarHighlight={false}
            showSkip={false}
            bottomBarHeight={80}
            titleStyles={{fontSize:25,fontWeight:"bold"}}
            subtitleStyles={{fontSize:22}}
         containerStyle={{ paddingHorizontal: 10 }}
                // SkipButtonComponent={Skip}
                pages={[
                    {
                        backgroundColor: 'white',
                        image: (
                            <View style={style.lottie}>
                                <Image source={require('../Images/Doctors.gif')} style={{ width: 300, height: 300, }} />

                            </View>
                        ),
                        title: 'Set Online Appointments',
                        subtitle: 'Get List of Best Doctors and set Appointment',
                    },
                    {
                        backgroundColor: 'white',
                        image: (
                            <View style={style.lottie}>
                                <Image source={require('../Images/Pharmacist.gif')} style={{ width: 300, height: 300, }} />

                            </View>
                        ),
                        title: 'Feedback On Reports',
                        subtitle: 'Get Online Feedback from Doctor on Reports',
                    },
                    {
                        backgroundColor: 'white',
                        image: (
                            <View style={style.lottie}>
                                <Image source={require('../Images/Medical-prescription.gif')} style={{ width: 300, height: 300, }} />

                            </View>
                        ),
                        title: 'Prescription from Doctor',
                        subtitle: 'Get and Save your Prescription',
                    },
                ]}
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    MainBox: {
        flex: 1,
        backgroundColor: "#E8F4FA"
    },
    lottie: {
        width: 400,
        height: 300,
        // borderWidth:1,
        justifyContent: "center",
        alignItems: "center"
    },
    skipButton: {
        // position: "relative",
        // top: 20,
        bottom:30,
        right: 40,
        width: 50,
        height: 50,
        borderRadius: 50, // Make it circular
        backgroundColor: '#178CCB', // Background color
        justifyContent: 'center',
        alignItems: 'center',
      },
      skipText: {
        color: 'white', // Text color
        fontSize: 16,
        fontWeight: 'bold',}
})

export default OnBoarding;
