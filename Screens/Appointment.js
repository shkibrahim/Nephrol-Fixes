import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Keyboard,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';


const Appointments = ({navigation}) => {
    const handelBookAppointment=()=>{
        navigation.navigate("DoctorOverview");
    }

    const backArroeNav=()=>{
      navigation.navigate("Home")
    }
  return (
    <View style={style.background}>
      <View style={style.header}>
      <TouchableOpacity style={style.backArrow} onPress={backArroeNav}>
      <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            >
            </AntDesign>
      </TouchableOpacity>
        <Text style={style.headerTxt}>Appointments</Text>
      </View>
      <View style={style.searchContainner}>
        <Text style={style.txt}>Find a Doctor</Text>
        <Text style={style.txt}>Book an Appointment</Text>
        <TextInput
          placeholder="Search a doctor"
          style={style.sreachbar}>
        </TextInput>

        <ScrollView>
          <View style={style.cardDoc}>
            <View style={style.flex}>
              <View>
                <Image source={require('../Images/doctor1.jpeg')} style={style.img} />
              </View>
              <View style={style.col}>
                <Text style={style.txtd}>Dr.Ali</Text>
                <Text style={style.txtd}>Nephrologist</Text>
                <Text style={style.txtd}>3 Years Experience</Text>
                <TouchableOpacity onPress={handelBookAppointment} style={style.button}>
                  <Text>
                    <Text style={style.buttonText}>Book Appointment</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={style.cardDoc}>
            <View style={style.flex}>
              <View>
                <Image source={require('../Images/doctor3.jpeg')} style={style.img} />
              </View>
              <View style={style.col}>
                <Text style={style.txtd}>Dr.Edward Jenner</Text>
                <Text style={style.txtd}>Nephrologist</Text>
                <Text style={style.txtd}>1 Years Experience</Text>
                <TouchableOpacity onPress={handelBookAppointment} style={style.button}>
                  <Text>
                    <Text style={style.buttonText}>Book Appointment</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={style.cardDoc}>
            <View style={style.flex}>
              <View>
                <Image source={require('../Images/doctor2.jpeg')} style={style.img} />
              </View>
              <View style={style.col}>
                <Text style={style.txtd}>Dr. Virginia Apgar</Text>
                <Text style={style.txtd}>Nephrologist</Text>
                <Text style={style.txtd}>5 Years Experience</Text>
                <TouchableOpacity onPress={handelBookAppointment} style={style.button}>
                  <Text>
                    <Text style={style.buttonText}>Book Appointment</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F7F9F9',
  },
  header: {
    flex:1,
    backgroundColor: '#9989C7',
    height: 50,
    flexDirection:'row'
  },
  headerTxt: {
    marginLeft: 97,
    // alignSelf:'center',
    fontFamily: 'Inter',
    // marginTop: 8,
    alignSelf:'center',
    fontSize: 22,
    color: '#f8f8f8',
    fontWeight:'bold',
  },
  button: {
    backgroundColor: '#9989C7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backArrow:{
    marginTop:10,
    marginLeft:10,
    alignSelf:'flex-start'

  },
  flex: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 13,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 50,
    backgroundColor: '#F6F6F6',
    marginTop: 20,
    marginLeft: 10,
  },
  appHBTN: {
    marginLeft: 250,
    height: 100,
    width: 150,
  },
  bookbtn: {
    marginTop: 5,
    borderRadius: 5,
  },
  searchContainner: {
    padding: 15,
  },
  txt: {
    marginTop: 10,
    marginLeft: 7,
    color: '#5E4D8F',
    fontSize: 20,
    fontWeight: '600',
  },
  txtd: {
    marginTop: 5,
    marginLeft: 7,
    color: '#5E4D8F',
    fontSize: 17,
    fontWeight: '600',
  },
  sreachbar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDoc: {
    height: 180,
    width: 357,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
  },
});

export default Appointments;