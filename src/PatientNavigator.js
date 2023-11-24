import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PatientHomeScreen from '../Screens/PatientHomeScreen';
import Profile from '../Screens/Profile';
import MyAppointments from '../Screens/MyAppointments';
import MedicineHome from '../Screens/MedicineHome';
import ViewReports from '../Screens/ViewReports';
import Complaint from '../Screens/Complaint';
import Prescription from '../Screens/Prescription';
import DoctorFeedback from '../Screens/DoctorFeedback';
import Sidebar from './Sidebar';

const Drawer = createDrawerNavigator();

const PatientNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={props=> <Sidebar {...props}/>}>
    <Drawer.Screen
        name='PatientHomeScreen'
        component={PatientHomeScreen}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='MyAppointments'
        component={MyAppointments}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='MedicineHome'
        component={MedicineHome}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='ViewReports'
        component={ViewReports}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='Complaint'
        component={Complaint}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='Prescription'
        component={Prescription}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
      <Drawer.Screen
        name='DoctorFeedback'
        component={DoctorFeedback}
        options={{ headerShown: false, drawerActiveBackgroundColor: 'blue' }}
      />
    </Drawer.Navigator>
  );
};

export default PatientNavigator;
