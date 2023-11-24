import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';




const ViewPrescriptions = ({navigation}) => {
    const backArroeNav=()=>{
                navigation.navigate("Some")
              }
          return (
            <View style={styles.container}>
                <View style={styles.header}>
              <TouchableOpacity style={styles.backArrow} onPress={backArroeNav}>
              <AntDesign
                    name="arrowleft"
                    size={30}
                    color='white'
                    >
                    </AntDesign>
              </TouchableOpacity>
                <Text style={styles.headerTxt}>Prescription</Text>
              </View>

              <View style={styles.box}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <Text style={styles.label1}>Prescription ID: 1</Text>
            </View>
            <View style={styles.section}>
            <Text style={styles.label2}>Written By:</Text>
            <Text style={styles.label2}>Dr. Saad Ahmed</Text>
            <Text style={styles.label3}>Nephrologist</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label2}>Date:</Text>
            <Text style={styles.label2}>25/May/2023</Text>
            <Text style={styles.label3}>Time:</Text>
            <Text style={styles.label3}>10:00 - 10:30 AM</Text>


          </View>
        </View>
        <View style={styles.iconBox}>
        <FontAwesome5
          name="file-prescription"
          size={70}
          color='#9989C7'
        >
        </FontAwesome5>
        </View>

        </View>

        <View style={styles.box}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <Text style={styles.label1}>Prescription</Text>
            <Text style={styles.label2}> Paracetamol 500mg: Once a day</Text>
            <Text style={styles.label2}> Paracetamol 500mg: Once a day</Text>
            <Text style={styles.label2}> Paracetamol 500mg: Once a day</Text>


            </View>
        </View>
        
        </View>
              </View>);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //    padding:16,
  
    },
    box: {
      backgroundColor: '#f8f8f8',
      flexDirection: 'row',
  
      paddingHorizontal: 20,
    //   marginTop: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: '#9989C7',
    //   marginLeft:25,
  
    },
    box3: {
      marginRight: 25,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    section: {
      marginBottom: 8,
    },
    label1: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'black'
    },
    label2: {
      fontSize: 17,
      fontWeight: 'bold',
      color:'black'

    },
    label3: {
      fontSize: 15,
      fontWeight: 'bold',
      color:'black'

    },
    header: {
      backgroundColor: '#9989C7',
      height: 50,
      flexDirection: 'row'
    },
    headerTxt: {
      marginLeft: 97,
      // alignSelf:'center',
      fontFamily: 'Inter',
      // marginTop: 8,


      alignSelf: 'center',
      fontSize: 22,
      color: '#f8f8f8',
      fontWeight: 'bold',
    },
    backArrow: {
      marginTop: 10,
      marginLeft: 10,
      alignSelf: 'flex-start'
  
    },
    iconBox:{
        marginLeft:80
    }
  });
  
export default ViewPrescriptions;
