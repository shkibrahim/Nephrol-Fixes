import React, { useState, useEffect, useContext } from 'react';
import {View,StyleSheet} from 'react-native'
import {DrawerContentScrollView,DrawerItem} from'@react-navigation/drawer'
import { createDrawerNavigator } from "@react-navigation/drawer"
import Some from '../Screens/Some'
import Sidebar from "./Sidebar"
import DocSidebar from "./DocSidebar"
import Profile from "../Screens/Profile"
import MyAppointments from "../Screens/MyAppointments"
import PillReminder from"../Screens/MedicineHome"
import MedicineHome from "../Screens/MedicineHome"
import ViewReports from '../Screens/ViewReports'
import PatientHomeScreen from "../Screens/PatientHomeScreen"
import Complaint from "../Screens/Complaint"
import Prescription from "../Screens/Prescription"
import DoctorFeedback from "../Screens/DoctorFeedback"
import DoctorHomeScreen from "../DoctorScreen/DoctorHomeScreen"
import DoctorPrescription from "../DoctorScreen/DoctorPrescription"
import Feedback from "../DoctorScreen/Feedback"
import PatientsReports from "../DoctorScreen/PatientsReports"
import DoctorProfile from '../DoctorScreen/DoctorProfile';
import DoctorComplaint from '../DoctorScreen/DoctorComplaint';
import SignInScreen from '../Screens/SignInScreen';
import OnBoarding from './OnBoarding';
import FrontScreen from "./FrontScreen"
import SignUpScreen from '../Screens/SignUpScreen';

import { UserContext } from '../Hooks/AuthContext';


const Drawer=createDrawerNavigator()
function CustomDrawerContent(props) {
  const { patientName, doctorName } = useContext(UserContext);

  return (
    <>
      {patientName ? (
        <Sidebar {...props} />
      ) : (
        <DocSidebar {...props} />
      )}
    </>
  );
}

const DrawerNav=()=>{
  return(
    // <Drawer.Navigator  drawerContent={props=> <Sidebar {...props}/>}>
        <Drawer.Navigator  drawerContent={CustomDrawerContent} screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="OnBoarding" component={OnBoarding} />
        <Drawer.Screen name="FrontScreen" component={FrontScreen} />
       <Drawer.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}} />
       <Drawer.Screen name="SignUp" component={SignUpScreen}/>
      {/* <Drawer.Screen name='DoctorHomeScreen' component={DoctorHomeScreen} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/> */}
      <Drawer.Screen name='PatientHomeScreen' component={PatientHomeScreen} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      {/* <Drawer.Screen name='DoctorHomeScreen' component={DoctorHomeScreen} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/> */}
      <Drawer.Screen name='Some' component={Some} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='Profile' component={Profile} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='MyAppointments' component={MyAppointments} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='MedicineHome' component={MedicineHome} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='ViewReports' component={ViewReports} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      {/* <Drawer.Screen name='DoctorComplaint' component={DoctorComplaint} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/> */}
      <Drawer.Screen name='Complaint' component={Complaint} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='Prescription' component={Prescription} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='DoctorFeedback' component={DoctorFeedback} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      {/* <Drawer.Screen name='DoctorHomeScreen' component={DoctorHomeScreen} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='DoctorPrescription' component={DoctorPrescription} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='Feedback' component={Feedback} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='PatientsReports' component={PatientsReports} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='DoctorComplaint' component={DoctorComplaint} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/>
      <Drawer.Screen name='DoctorProfile' component={DoctorProfile} options={{headerShown:false,drawerActiveBackgroundColor:"blue"}}/> */}

      {/* i have to put here all the screens too  */}
       </Drawer.Navigator>


  )
}
export default DrawerNav