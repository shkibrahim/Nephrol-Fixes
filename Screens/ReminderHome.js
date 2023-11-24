import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
const ReminderHome = ({ navigation, route }) => {
  const [taken, setTaken] = useState(false);
  const [ reminderList, setReminderList ] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
























  useEffect(() => {
      axios.get("http://10.0.2.2:8080/patient/allReminder").then( res => setReminderList(res.data))
  }, [])

  const handleTakenToggle = () => {
    setTaken(!taken);
  };
  const containerStyle = taken ? styles.containerTaken : styles.containerNotTaken;
  const [medicineList, setMedicineList] = useState([]);

  const handleDeleteMedicine = (id) => {
    const updatedList = medicineList.filter((medicine) => medicine.id !== id);
    setMedicineList(updatedList);
  };

  const handleEditMedicine = (id) => {
    const medicine = medicineList.find((medicine) => medicine.id === id);
    navigation.navigate('MedicineReminder', { medicine });
  };
  const backArroeNav=()=>{
    navigation.navigate('MedicineReminder')
  }
  const addMedicine=()=>{
    navigation.navigate('MedicineReminder')
  }
  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineContainer}>
      <Text style={styles.medicineText}>Name: {item.name}</Text>
      {/* <Text style={styles.medicineText}>Medication Form: {item.medicationForm}</Text> */}
      <Text style={styles.medicineText}>Dose: {item.dose}</Text>
      {/* <Text style={styles.medicineText}>Medication per Dose: {item.medicationPerDose}</Text> */}
      <Text style={styles.medicineText}>Intake Time: {item.intakeTime}</Text>
      {/* <Text style={styles.medicineText}>Duration: {item.duration}</Text> */}
      {/* <Text style={styles.medicineText}>Note: {item.note}</Text> */}

      <View style={[styles.container4, containerStyle]}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleTakenToggle}>
          <Text style={styles.checkboxLabel}>Taken</Text>
          <View style={[styles.checkbox, taken && styles.checkboxChecked]} />
        </TouchableOpacity>
    </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity
          style={styles.button}
          onPress={() => handleEditMedicine(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDeleteMedicine(item.id)}
        >
          <Text style={styles.buttonText2}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );












  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backArrow} onPress={backArroeNav}>
      <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            >
            </AntDesign>
      </TouchableOpacity>
        <Text style={styles.headerTxt}>Medicine Reminder</Text>
      </View>
      
      {medicineList.length > 0 ? (
        <FlatList
          data={medicineList}
          renderItem={renderMedicineItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <View>
        <Text style={styles.endText}>No medicine added yet.</Text>
        <TouchableOpacity style={styles.Addbutton} onPress={addMedicine}>
          <Text style={styles.AddbuttonText}>Add</Text>
        </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  medicineContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    // padding:30,
    marginTop:20,
    marginHorizontal:10,
    backgroundColor: '#E2DFEB',
  
  
  },
  medicineText: {
    fontSize: 16,
    marginBottom: 8,
    color:'#5E4D8F',
    fontWeight:'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderColor:'#5E4D8F',
    borderWidth:1,
  },
  buttonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText2: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerTxt: {
    marginLeft: 58,
    alignSelf:'center',
    fontFamily: 'Inter',
    // marginTop: 8,
    alignSelf:'center',
    fontSize: 22,
    color: '#f8f8f8',
    fontWeight:'bold',
    justifyContent:"center"
  },header: {
    // flex:1,
    backgroundColor: '#9989C7',
    height: 50,
    flexDirection:'row',
    // paddingTop:10,
  },
  backArrow:{
    marginTop:10,
    marginLeft:10,
    alignSelf:'flex-start'

  },
  container4: {
    backgroundColor: '#E2DFEB',

    paddingTop:10,
    paddingBottom:5,
    // padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    
  },
  
  checkboxContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2DFEB',

  },
  checkboxLabel: {
    marginRight: 5,
    fontSize:15,
    color:'black',
    fontWeight:'bold',

  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',

  },
  endText:{
    fontSize:20,
    alignSelf:'center',
    padding:40,

  },
  checkboxChecked: {
    backgroundColor: 'green',
  },
 Addbutton: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:12,
    marginHorizontal: 30,
    width:130,
      height: 40,
      // borderRadius: 5,
      backgroundColor:'#9989C7',
      shadowColor:'black',
      elevation:5,
      alignSelf:'center'
  },
  AddbuttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent:'center',
    alignSelf:'center'
  },
});


export default ReminderHome;
