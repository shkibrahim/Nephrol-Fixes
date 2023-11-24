import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DoctorHomeScreen from '../DoctorScreen/DoctorHomeScreen';
import DoctorPrescription from '../DoctorScreen/DoctorPrescription';
import Feedback from '../DoctorScreen/Feedback';
import PatientsReports from '../DoctorScreen/PatientsReports';
import DoctorComplaint from '../DoctorScreen/DoctorComplaint';
import DoctorProfile from '../DoctorScreen/DoctorProfile';
import DocSidebar from "./DocSidebar"

const Drawer = createDrawerNavigator();

const DoctorNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={props=> <DocSidebar {...props}/>}>
    <Drawer.Screen
        name='DoctorHomeScreen'
        component={DoctorHomeScreen}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='DoctorPrescription'
        component={DoctorPrescription}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='Feedback'
        component={Feedback}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='PatientsReports'
        component={PatientsReports}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='DoctorComplaint'
        component={DoctorComplaint}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='DoctorProfile'
        component={DoctorProfile}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
    </Drawer.Navigator>
  );
};

export default DoctorNavigator;
