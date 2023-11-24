import  React, {useState} from 'react';
import { View, Text,Button,Alert, StyleSheet, TextInput, TouchableOpacity,FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather'; 

const BookAppoointmentOverview=({navigation})=>{
  const [selectedSlot, setSelectedSlot] = useState(-1);
  const [showButton, setShowButton] = useState(false);
  
  const [slots, setSlots] = useState([
    {sloT: '10:00-10:30PM', selected: false},
    {sloT: '10:30-11:00PM', selected: false},
    {sloT: '11:00-11:30PM', selected: false},
    {sloT: '11:30-12:00PM', selected: false},
    {sloT: '12:00-12:30PM', selected: false},
    {sloT: '12:30-1:00PM', selected: false},
  ]);
  const [selectTab,setSelectedTab]=useState(0);
  const confirmAppointment=()=>{
    Alert.alert("Appointment confirm successfully")
  }

  const handelOverView=()=>{
    setSelectedTab(0)
  }
  const handelAvailabilty=()=>{
    setSelectedTab(1)
  }
  const backArroeNav=()=>{
    navigation.navigate("Appointments")
  }
return(
    <View style={styles.container}>
        
        <View style={styles.Box}>
        <TouchableOpacity style={styles.backArrow} onPress={backArroeNav}>
      <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            >
            </AntDesign>
      </TouchableOpacity>
            <View style={styles.purpleText}>
            <FontAwesome5
            name="user-md"
            size={100}
            color="white">
            </FontAwesome5>

            <Text style={{fontWeight:'bold',marginTop:6}}> offline</Text>
            <Text style={{fontSize:19,fontWeight:'bold'}}> Dr Saad Ahmed</Text>
            <Text style={{fontSize:13,fontWeight:'bold'}}>Nephrologist 3 year Experience</Text>
            <Text style={{fontSize:13,fontWeight:'bold'}}>MBBS,FCPS</Text>
            </View>
            </View>
           <View style={styles.Box1}>
           <View style={styles.container3}>

           <TouchableOpacity style={
          { width:199,
            height: 50,
            backgroundColor: selectTab==0? '#5E4D8F':'#E2DFEB',
            justifyContent: 'center',
            alignItems: 'center'}
          } 
            onPress={handelOverView}>
            <Text style={{fontSize: 18,
                           fontWeight: 'bold',
                            color: selectTab==0 ?'#FFFFFF':'#5E4D8F',}}>
                              Overview</Text>
          </TouchableOpacity>

           <TouchableOpacity 
           style={
          {width:199,
            height: 50,
            backgroundColor:selectTab==1? '#5E4D8F':'#E2DFEB',
            justifyContent: 'center',
            alignItems: 'center',}}
            onPress={handelAvailabilty}>
          <Text style={
                {fontSize: 18,
                 fontWeight: 'bold',
                 color: selectTab==1 ?'#FFFFFF':'#5E4D8F',}}>
                  Availabilty</Text>
            </TouchableOpacity>
        
            </View>
            {selectTab==0 ? (<View>
              <Text style={styles.text}>Working Time</Text>
              <Text style={styles.text1}>10:00PM - 1:00PM</Text>
              <Text style={styles.text2}>About Doctor</Text>
              <Text style={styles.text3}>Dr. Saad Ahmed is a Professor of Nephrology,
                    Former HOD of Nephrology at PIMS.He has more
                    than 3 year of experience as a nephrologist 
                    at hospitals.</Text>
              </View>):
            (
                <View style={styles.container}>
                  <CalendarStrip
                  // calendarColor={'#5E4D8F'}
                  calendarHeaderStyle={{color:'#5E4D8F',fontSize:20}}
                    dateNumberStyle={{color: '#5E4D8F',fontSize:15}}
                    dateNameStyle={{color: '#5E4D8F',fontSize:10}}
                  style={{height:150, paddingTop: 20, paddingBottom: 10,}}/>
                  <View>
                    <Text style={styles.text1}>Available Time</Text>
                    <View>
          <FlatList
            numColumns={2}
            data={slots}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.timeSlot,
                    {borderColor: index == selectedSlot ? 'blue' : 'black'},
                  ]}
                  onPress={() => {
                    setSelectedSlot(index);
                    setShowButton(!showButton);
                  }}>
                  <Text
                    style={{color: index == selectedSlot ? 'blue' : 'black'}}>
                    {item.sloT}
                  </Text>
                </TouchableOpacity>
          
              );
            }
            }
          />
          {showButton && (
        <TouchableOpacity style={styles.button1}
        onPress={confirmAppointment}>
          <Text style={styles.buttonText1}>Confirm Appointment</Text>
        </TouchableOpacity>
      )}
        </View>
                  </View>
                </View>
            
              )}
            

           </View>
        </View>

);

}
styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
      },
    Box:{
        flex:1.2,
        backgroundColor:'#9989C7',
        alignItems:'center',
        // marginBottm:10,
        // paddingVertical:10,

    },
    backArrow:{
      marginTop:10,
      marginLeft:10,
      alignSelf:'flex-start'

    },
    Box1:{
        flex:2,
        paddingHorizontal:10,
        // paddingVertical:10,

    },
    purpleText:{
        marginTop:30,
        alignItems:'center'
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
      },
      text:{
        // paddingVertical:10,
        marginTop:30,
        fontSize:17,
        fontWeight:'bold'
      },
      text1:{
        fontSize:16,
        fontWeight:'bold',
        color:'black'
      },
      text2:{
        marginTop:15,
        fontSize:17,
        fontWeight:'bold'
      },
      text3:{
        fontSize:14,

      },
      button1: {
        width:199,
        height: 50,
        marginTop:15,
        backgroundColor:'#9989C7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        alignSelf:'center'
      },
      
      buttonText1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F8F8F8',
      },
     
      container4: { flex: 1 },
      timeSlot: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
     
});

export default BookAppoointmentOverview;



