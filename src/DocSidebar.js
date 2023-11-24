import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, Button, TextInput, View, Text, Keyboard, Alert, Modal, Image, TouchableOpacity,
} from 'react-native';
import { UserContext } from '../Hooks/AuthContext';
import { FlatList } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign"
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import { DrawerActions } from '@react-navigation/native';

const DocSidebar = ({navigation}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const { doctorName } = useContext(UserContext);

    const handelNav = (item) => {

        if (item.title == 'Home') {
            navigation.navigate("DoctorHomeScreen")
            navigation.dispatch(DrawerActions.closeDrawer())
        }
        else if (item.title === 'Profile') {
            navigation.navigate("DoctorProfile")
         navigation.dispatch(DrawerActions.closeDrawer())
        } else if (item.title === 'Notifications') {
            navigation.dispatch(DrawerActions.closeDrawer())
            Alert.alert("Notification Upcoming")
        } else if (item.title === 'Contact us') {
            navigation.dispatch(DrawerActions.closeDrawer())
            Alert.alert("Contact us Upcoming")
        } else if (item.title === 'Logout') {
            navigation.dispatch(DrawerActions.closeDrawer())
            navigation.navigate("SignIn")
            // navigation.dispatch(DrawerActions.closeDrawer())

        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <View style={{
                height: 230,
                margin: 8, alignItems: "center", justifyContent: "center", borderBottomWidth: 1, borderBottomColor: "gray"
            }}>
                <Image source={require('../Images/doctor3.jpeg')} style={{ width: 120, height: 120, borderRadius: 80 }} />
                <Text style={{ fontWeight: "bold", fontSize: 25, top: 10, color: "#1A1A1A" }}>{doctorName}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 18, top: 10, color: "#5C5C5C" }}>Doctor</Text>
            </View>
            <View style={{ borderWidth: 0, marginTop: 10 }}>

                <FlatList
                    // data={[{icon:require('../Images/pills.png'),title:"Home"},
                    //       {icon:require('../Images/pills.png'),title:"My Profile"},
                    //       {icon:require('../Images/pills.png'),title:"Notification"},
                    //       {icon:require('../Images/pills.png'),title:"Contact Us"},
                    //       {icon:require('../Images/pills.png'),title:"About"},
                    //       {icon:require('../Images/pills.png'),title:"Logout"},]}
                    data={[{ icon: "home", title: "Home" },
                    { icon: "user", title: "Profile" },
                    { icon: "bells", title: "Notifications" },
                    { icon: "contacts", title: "Contact us" },
                    { icon: "logout", title: "Logout" }]}

                    renderItem={({ item, index }) => {
                        const isSelected = selectedItem === index;
                        return (
                            <TouchableOpacity onPress={() => { setSelectedItem(index);handelNav(item)}} style={[{
                                flexDirection: "row", borderWidth: 0, alignItems: "center", alignContent: "center",
                                height: 50, backgroundColor: isSelected ? '#A2D1EA' : 'transparent', borderRadius: 20, margin: 10
                            },]}>
                                <Icon name={item.icon} size={25} style={{ marginLeft: 20, color: isSelected ? 'white' : '#000'}} />
                                {/* <Image source={item.icon} style={{height:24,width:24,marginLeft:20}}/> */}
                                <Text style={[{ fontSize: 20, marginLeft: 25, color: isSelected ? 'white' : '#000' },]}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }} />

            </View>
        </View>

    )
}
export default DocSidebar

