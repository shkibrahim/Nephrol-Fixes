import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image, TextInput, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { UserContext } from '../Hooks/AuthContext';
import RNFetchBlob from 'rn-fetch-blob';
import notifee from '@notifee/react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ViewReports = ({ navigation }) => {
  notifee.createChannel({
    id: 'reports',
    name: 'reports',
    // importance: notifee.Importance.HIGH,
  });

  const { patientEmail } = useContext(UserContext);
  const [reportList, setReportList] = useState([])
  const [feedback, setFeedbackList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleFeedbackModal = () => {
    setModalVisible(!isModalVisible)
  };

  useEffect(() => {
    console.log("fetching Reports")
    fetchReports();
  }, [])

  const handleDownload = async (reportId) => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true, // Enable file caching
        appendExt: 'pdf', // Append file extension

      }).fetch('GET', `http://172.20.10.4:8080/patient/downloadreport/${reportId}`);

      // Get the path to the downloaded file
      const filePath = response.path();
      console.log(filePath)
      // Specify the destination directory where you want to save the file
      const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/Report_${reportId}.pdf`;
      console.log(destinationPath)
      // Move the downloaded file to the destination directory
      await RNFS.moveFile(filePath, destinationPath);
      // console.log(`Report_${reportId}.pdf downloaded and saved successfully to ${destinationPath}`);
      if (response.info().status === 200) {
        Alert.alert(`Report_${reportId}.pdf downloaded Successfully`);
      }
      else {
        Alert.alert(`Sorry error while downloading`);

      }
    } catch (error) {
      console.error(error);
    }
  };
  handleFeedback = async () => {
    console.log(patientEmail)
    await axios.get(`http://172.20.10.4:8080/patient/getfeedback/${patientEmail}`)

      .then(response => {
        const fetchfeeback = response.data;
        setFeedbackList(fetchfeeback)
        console.log(feedback)
      })
      .catch(error => {
        console.log('error fetching reportList', error)
      })
    toggleFeedbackModal()
  }


  const fetchReports = async () => {
    console.log(patientEmail)
    // await axios.get(`http://10.0.2.2:8080/patient/getreports/${patientEmail}`)
    await axios.get(`http://172.20.10.4:8080/patient/getreports/${patientEmail}`)


      .then(response => {
        const fetchReport = response.data;

        setReportList(fetchReport)
        console.log(reportList)
      })
      .catch(error => {
        console.log('error fetching reportList', error)
      })
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => { navigation.navigate("PatientHomeScreen") }} style={{ borderWidth: 0, position: "absolute", left: 10, padding: 10 }}>
          <AntDesign
            name="arrowleft"
            size={30}
            color='black'
          >
          </AntDesign></TouchableOpacity>
        <Text style={[styles.headerTxt]}>My Reports</Text>
      </View>
      {reportList.length === 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}>
          <Image source={require('../Images/Schedule-amico.png')} style={{ width: 300, height: 300 }} />
          <Text style={{ color: "#5c5c5c", fontSize: 18, fontWeight: "bold", }}>No Report added added</Text>
        </View>) : (<FlatList
          data={reportList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (

            // <View style={{borderWidth:1}}>
            <View style={{
              borderWidth: 0, margin: 20, backgroundColor: "white",
              elevation: 2, borderRadius: 10, paddingBottom: 10,
            }}>

              <View style={{ borderWidth: 0, flexDirection: "row", marginTop: 10, }}>
                <Image source={require('../Images/medical-report2.png')} style={{ width: 65, height: 65, left: 20 }} />
                <View style={{ borderWidth: 0, justifyContent: "space-evenly", left: 30 }}>
                  <Text style={{ fontSize: 19, color: '#40413F', fontWeight: "bold" }}>Report</Text>
                  {/* <Text style={{fontSize:15,color:'#40413F',fontWeight:"bold"}}>{item.patientEmail}</Text> */}
                  <Text style={{ fontSize: 15, color: '#40413F', fontWeight: "bold" }}>NephroAI@gmail.com</Text>
                  <Text style={{ color: '#40413F', fontWeight: "bold", fontSize: 15 }}>{formatDate(item.CreatedAt)}</Text>
                </View>
              </View>
              <View style={{ borderWidth: 0, marginTop: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity style={styles.buttonView} onPress={() => handleDownload(item._id)}>
                  <Text style={styles.buttonTxt2}>Download</Text></TouchableOpacity>

                <TouchableOpacity style={styles.buttonView} onPress={() => handleFeedback(item._id)}>
                  <Text style={styles.buttonTxt2}>Feeback</Text></TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleFeedbackModal}
              >
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => { setModalVisible(!isModalVisible) }}
                    style={{ borderWidth: 0, alignSelf: "flex-end", margin: 10, right: 15 }}>
                    <Fontisto
                      name="close-a"
                      size={20} /></TouchableOpacity>
                  <View style={styles.modalContent}>
                    {feedback.length === 0 ? (
                      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                        {/* <Image source={require('../Images/Schedule-amico.png')} style={{ width: 300, height: 300 }} /> */}
                        <Text style={{ color: "#5c5c5c", fontSize: 18, fontWeight: "bold", }}>No Feedback added</Text>
                      </View>) : (<FlatList
                        data={feedback}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                          <View style={{ borderWidth: 0, justifyContent: "space-evenly", alignItems: "center",flexDirection:"column" }}>
                            <Image source={require('../Images/messages.png')} style={{ width: 80, height: 80 }} />

                            <View style={{ alignItems: "center", marginTop: 10,borderWidth:0}}>
                              {/* <Image source={require('../Images/messages.png')} style={{ width: 100, height: 100 }} /> */}
                              <Text style={{ fontSize: 22, color: "black",fontWeight:"bold" }}>Feedback</Text>
                              <Text style={{ fontSize: 17, color: "black", }}>" {item.description} "</Text>
                            </View>
                          </View>
                        )} />)}
                  </View>
                </View>
              </Modal>
            </View>




          )} />)}





    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1.7,
    // borderBottomColor:"#6AAB9C",
    //  borderBottomColor: '#388E8E'
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
  buttonView: {
    height: 35,
    width: 105,
    borderColor: "#178CCB",
    borderRadius: 5,
    borderWidth: 1,
    //  backgroundColor:"#178CCB",
    right: 20

  },
  buttonTxt2: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    // color:'#6AAB9C',
    // color:"#388E8E",
    color: "#178CCB",
    // color:"white",
    margin: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },


})
export default ViewReports