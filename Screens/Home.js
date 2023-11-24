import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Keyboard,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';


function Home({navigation}){
  
  const navigation1 = useNavigation();


const calender = (
  <FontAwesome5 name={'calendar-alt'} size={80} color="#9989C7" />
);
const profile = <FontAwesome5 name={'user'} size={80} color="#9989C7" />;
const feedback = (
  <FontAwesome5 name={'file-medical'} size={80} color="#9989C7" />
);
const prescription = (
  <FontAwesome5 name={'prescription-bottle-alt'} size={80} color="#9989C7" />
);
const reminder = (
  <FontAwesome5 name={'business-time'} size={80} color="#9989C7" />
);
const complaint = (
  <MaterialIcons name={'rate-review'} size={80} color="#9989C7" />
);
const logout = (
  <MaterialIcons name={'logout'} size={25} color="#f8f8f8" />
);
const handelAppointment=()=>{
    
  navigation.navigate('Appointments');
}
const handelMedicine=()=>{
    
  navigation.navigate('MedicineHome');
}

const handelPrescription=()=>{
  navigation.navigate('Prescription');
}

const handelFeedback=()=>{
  navigation.navigate('DoctorFeedback');
}

const Complaint=()=>{
  navigation.navigate('Complaint');
}
const handelLogout=()=>{
  navigation.navigate('SignIn');
}

const handelProfile=()=>{
  navigation.navigate('Profile')
}


  return (
    <View style={style.background}>
      <View style={style.header}>
        <Text style={style.headerTxt}>NephrolAI</Text>
        <TouchableOpacity onPress={handelLogout}>
        <View style={style.logout}>{logout}</View>
        </TouchableOpacity>
      </View>
      <View style={style.cardContainer}>
        <View style={style.inercontainer}>
          <View style={style.flex}>
            <View style={style.iconCard1}>
              <TouchableOpacity onPress={handelProfile}>
              <View style={style.margin1}>
                {profile}
                <Text style={style.txtmargin1}>Profile</Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={style.iconCard2}>
            <TouchableOpacity onPress={handelAppointment}>
              <View style={style.margin2}>{calender}</View>
              <Text style={style.txtmargin2}>Appointments</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.flex}>
            <View style={style.iconCard3}>
            <TouchableOpacity onPress={handelFeedback}>
              <View style={style.margin2}>{feedback}</View>
              <Text style={style.txtmargin3}>Doctor Feedback</Text>
            </TouchableOpacity>
            </View>
            <View style={style.iconCard4}>
              <TouchableOpacity onPress={handelPrescription}>
              <View style={style.margin2}>{prescription}</View>
              <Text style={style.txtmargin2}>Prescriptions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* two more cards here */}
          <View style={style.flex}>
            <View style={style.iconCard3}>
            <TouchableOpacity onPress={Complaint}>
              <View style={style.margin2}>{complaint}</View>
              <Text style={style.txtmargin3}>   Complaints </Text>
            </TouchableOpacity>
            </View>
            <View style={style.iconCard4}>
              <TouchableOpacity onPress={handelMedicine}>
              <View style={style.margin2}>{reminder}</View>
              <Text style={style.txtmargin2}>Pills Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* end here */}
        </View>
      </View>
      {/* <View style={style.cardContainer1}>
        <View style={style.inercontainer1}>
        <View style={style.iconCard5}>
        <TouchableOpacity onPress={handelMedicine}>
          <View style={style.flex}>
              <View style={style.margin4}>{reminder}</View>
              <Text style={style.txtmargin4}>Medicine Reminder</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

     {/* bottom navigation */}
     <View style={style.menuContainer}>
      <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate("Home")}>
          <FontAwesome5
            name="home"
            size={27}
            color="white">
            </FontAwesome5>
        </TouchableOpacity>

        <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate("notApp")}>
        <MaterialIcons
            name="notifications"
            size={29}
            color="white">
            </MaterialIcons>

        </TouchableOpacity>

        <TouchableOpacity
        style={style.buttonStyle}
        onPress={() => navigation.navigate("Profile")}>
          <FontAwesome5
            name="user"
            size={27}
            color="white">
            </FontAwesome5>
        </TouchableOpacity>
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
    backgroundColor: '#9989C7',
    height: 50,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center'
  },
  headerTxt: {
    marginLeft: 160,
    fontFamily: 'Inter',
    marginTop: 8,
    fontSize: 22,
    color: '#F8F8F8',
    fontWeight: 'bold',
    justifyContent:'center'
  },
  cardContainer: {
    marginTop: 20,
    height: 400,
    padding: 10,
  },
  inercontainer: {
    backgroundColor: '#F7F9F9',
    padding: 20,
    height: 600,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginTop:20,
  },
  cardContainer1: {
    marginTop: 10,
    height: 120,
    padding: 10,
  },
  inercontainer1: {
    backgroundColor: '#F7F9F9',
    padding: 10,
    height: 113,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  margin1: {
    marginLeft: 27,
  },
  margin4: {
    marginLeft: 27,
    marginBottom: 5,
    height: 200,
    marginTop:3,
  },
  txtmargin1: {
    marginTop: 10,
    marginLeft: 7,
    color: '#362074',
    fontSize: 20,
    fontWeight: '600',
  },
  margin2: {
    marginLeft: 36,
    marginTop: 10,
  },
  txtmargin2: {
    marginTop: 10,
    color: '#362074',
    fontSize: 19,
    fontWeight: '600',
    marginLeft: 15,
  },
  txtmargin3: {
    marginTop: 10,
    color: '#362074',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
  txtmargin4: {
    marginTop: 33,
    color: '#362074',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 25,
  },
  iconCard1: {
    height: 150,
    width: 150,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
  },
  iconCard2: {
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
    height: 150,
    width: 150,
    marginLeft: 20,
    borderRadius: 5,
  },
  iconCard3: {
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  iconCard4: {
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
    height: 150,
    width: 150,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  iconCard5: {
    backgroundColor: '#F7F9F9',
    borderWidth: 2,
    borderColor: '#362074',
    height: 95,
    width: 350,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  flex: {
    flexDirection: 'row',
    marginTop:20,
  },
  menuContainer: {
    marginTop:250,
    paddingVertical:20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor:"#9989C7"
  },
  textStyle: {
    textTransform: "uppercase",
  },
  logout:{
    marginLeft:80,
    marginTop:3,
  }
});

export default Home;