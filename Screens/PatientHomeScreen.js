import React, { useState, useEffect, useContext } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { DrawerActions } from '@react-navigation/native';
import { StyleSheet, Button, TextInput, View, Text, Keyboard, Alert, Modal, Image, TouchableOpacity,
} from 'react-native';
import { UserContext } from '../Hooks/AuthContext';
import { useNavigation } from '@react-navigation/native';


function PatientHomeScreen({ navigation }) {
    const { patientName } = useContext(UserContext)
    const handelMED = () => {
        navigation.navigate("MedicineHome")
    }
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
                    <Text style={{ fontSize: 27, fontWeight: "500", color: "black", }}>Hello,{patientName}</Text>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500", color: 'black', }}>How can we help you, today?</Text></View>

            </View>

            <View style={{ borderWidth: 0, backgroundColor: "white", margin: 15, borderRadius: 45,
             justifyContent: "space-between", elevation: 2,marginTop:-100,paddingTop:10,paddingBottom:10 }}>
               <View style={{flexDirection:"row",justifyContent:"space-between",margin:2,
               borderWidth:0,borderBottomLeftRadius:30,paddingBottom:10,borderRadius:10,elevation:0}}>
                <View style={{ justifyContent: "center", left: 20,borderWidth:0,height:80,alignSelf:"center",top:15 }}>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>Let's Explore </Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>Our Services !!</Text></View>
                <View style={{borderWidth:0}}>
                <Image source={require('../Images/services2.gif')} style={{width:160,height:120,top:5,right:7 }} />
                </View>
            </View>

            <View style={{ borderWidth:0, marginLeft: 10,marginRight:10, justifyContent: "space-evenly",marginTop:0}}>
                
                <TouchableOpacity style={style.CardBox} onPress={()=>{navigation.navigate("MyAppointments")}}>
                    <View style={[style.fontIcon,{right:8}]}>
                        <FontAwesome5 name={'calendar-alt'} size={30} color={"#178CCB"} />
                    </View>
                    <Text style={[style.subHeading,{right:10}]}>Appointmnets</Text>
                {/* </View> */}
                </TouchableOpacity>
            

                <TouchableOpacity style={style.CardBox} onPress={()=>{navigation.navigate("ViewReports")}}>
                    <View style={style.fontIcon}>
                    <Image source={require('../Images/medical-report.png')} style={{ width: 30, height: 30,}} />
                    </View>
                    <Text style={style.subHeading}>Medical Reports</Text>
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
                    <TouchableOpacity style={style.cards} onPress={()=>{navigation.navigate("MedicineHome")}}>
                        <View style={style.fontIcon}>
                        <FontAwesome5 name={'prescription-bottle-alt'} size={30} color="#178CCB" />
                        </View>
                        <Text style={style.subHeadingsmall}>Pills Reminder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ style.cards} onPress={()=>{navigation.navigate("Prescription")}} >
                        <View style={ style.fontIcon}>
                        <FontAwesome5 name={'file-medical'} size={30} color="#178CCB" />
                        </View>
                        <Text style={style.subHeadingsmall}>Prescription</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.rowBox}>
                    <TouchableOpacity style={style.cards} onPress={()=>{navigation.navigate("DoctorFeedback")}}>
                        <View style={style.fontIcon}>
                        <MaterialIcons name={'feedback'} size={30} color="#178CCB" />  
                        </View>
                        <Text style={style.subHeadingsmall}>Doctor Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ style.cards} onPress={()=>{navigation.navigate("Complaint")}}>
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
        borderWidth: 0
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
        borderWidth:0
    },
    subHeading:{
        color: "black", 
        fontSize: 18, 
        fontWeight: "500"
    },
    cards:{
        justifyContent: "center", 
        height: 100, 
        width: 140, 
        alignItems: "center",
         backgroundColor: "white", 
         elevation: 2,
         borderRadius:15,
        //  borderWidth:1

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
export default PatientHomeScreen