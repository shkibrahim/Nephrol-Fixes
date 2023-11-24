import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icon from the library
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { UserContext } from '../Hooks/AuthContext';


const Profile = ({ navigation }) => {
  const { patientEmail } = useContext(UserContext)

  const [data, setData] = useState({
    name: "",
    email: '',
    oldpassword: '',
    newPass: "",
    phoneNumber: "",
    medical_history: "",
    gender: ""

  });
  const [editing, setEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://172.20.10.4:8080/patient/getProfile/${patientEmail}`);
      const userData = response.data; // Assuming the response contains user data in the expected format
      setData({
        name: userData.name,
        email: userData.email,
        oldpassword: userData.oldpassword,
        newPass: userData.newPass,
        phoneNumber: userData.phoneNumber,
        medical_history: userData.medical_history,
        gender: userData.gender
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  
  
 
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleSaveProfile = async () => {
    try {
      // Prepare the data to send in the PATCH request
      // const updatedProfileData = {
      //   name: data.name,
      //   email: data.email,
      //   oldpassword: data.oldpassword,
      //   newPass: data.newPass,
      //   phoneNumber: data.phoneNumber,
      //   medical_history: data.medical_history,
      //   gender: data.gender
      // };

      // Send a PATCH request to update the profile
      const response = await axios.patch('http://172.20.10.4:8080/patient/updateProfile', data);

      if (response.status === 200) {
        // Successfully updated the profile
        Alert.alert('Profile updated successfully.');
      } else {
        // Handle other response statuses as needed
        Alert.alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      Alert.alert('Failed to update profile. Please try again.');
    }

    setEditing(false);
    setShowPasswordFields(false); // Hide password fields after saving
  };


  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => { navigation.navigate("PatientHomeScreen") }} style={{ borderWidth: 0, position: "absolute", left: 10, padding: 10 }}>
          <AntDesign
            name="arrowleft"
            size={30}
            color='black'
          >
          </AntDesign></TouchableOpacity>
        <Text style={[styles.headerTxt]}>Profile</Text>
      </View>
      <View style={{borderWidth:0,marginTop:20}}>
        <Image source={require('../Images/Profile.jpg')} style={styles.img} />
      </View>
      <ScrollView>
      <View style={styles.Box1}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setData({ ...data, name: val })}
          editable={editing}
          value={data.name}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setData({ ...data, email: val })}
          editable={editing}
          keyboardType="email-address"
          value={data.email}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          // value={phoneNumber}
          onChangeText={(val) => setData({ ...data, phoneNumber: val })}
          editable={editing}
          value={data.phoneNumber}
          keyboardType='numeric'
        />

{showPasswordFields && (
          <>
            <Text style={styles.label}>Old Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setData({ ...data, oldpassword: val })}
              editable={editing}
              keyboardType="default"
              secureTextEntry={true}
              value={data.oldpassword}
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setData({ ...data, newPass: val })}
              editable={editing}
              keyboardType="default"
              secureTextEntry={true}
              value={data.newPass}
            />
            </>
)}
        <Text style={styles.label}>Medical History</Text>
        <TextInput
          style={styles.input}
          // value={phoneNumber}
          onChangeText={(val) => setData({ ...data, medical_history: val })}
          editable={editing}
          value={data.medical_history}
        
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          // value={phoneNumber}
          onChangeText={(val) => setData({ ...data, gender: val })}
          editable={editing}
          value={data.gender}
        />

        {editing ? (
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {setEditing(true);
              setShowPasswordFields(true)}}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1.7,
    // borderBottomColor:"#6AAB9C",
    // borderBottomColor: '#388E8E'
    borderBottomColor: '#178CCB'

  },
  headerTxt: {
    fontFamily: 'Inter',
    fontSize: 22,
    marginRight: 20,
    color: '#40413F',
    fontWeight: 'bold',
    borderWidth: 0,
    left: 25,
  },
  Box: {
    // flex:2.4,

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1

  },
  Box1: {
    borderWidth: 0,
    // flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    // margin:30

  
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#5c5c5c"
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,   
    color:"black" 
  
  },
  button: {
    borderWidth:0,
    padding: 10,
    alignItems:"center",
    width: 150,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    alignSelf:"center",
    backgroundColor:"#178CCB",
    borderRadius:5
  },
  buttonText: {
    color:"white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F6F6F6',
    alignSelf: "center",


  },
  backArrow: {
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'flex-start'

  },

});

export default Profile;