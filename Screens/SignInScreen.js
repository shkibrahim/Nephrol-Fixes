import  React, {useContext,useState} from 'react';
import { UserContext } from "../Hooks/AuthContext";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather'; 
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';


  function SignInScreen({navigation}){
    const {setUserRole}=useContext(UserContext);
    const { setUserEmail } = useContext(UserContext);
    const {setDoctorName}= useContext(UserContext);
    const {setDoctorEmail}=useContext(UserContext);
    const {setpatientEmail} = useContext(UserContext);
    const {setPatientName}= useContext(UserContext);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    // const {setpatientEmail,setPatientName } = useContext(UserContext);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const [data,setData]=useState({
    email:'',
    password:'',
    check_textInputChange:false,
    secureTextEntry:true,

});
const [errorMsg,setError] = useState(null);
const[emailError,setEmailError]=useState(null);

const textInputChange = (val) =>{
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  
          if ( emailRegex.test(val)) {
              setData({
                  ...data,
                  email: val,
                  check_textInputChange: true
              });
              setEmailError(null)
          }
          else {
              setData({
                  ...data,
                  email: val,
                  check_textInputChange: false
              });
              // setEmailError("enter email in format:Someone@gmail.com")

          }
      }
  const handelPassword=(val)=>{
       setData({
        ...data,
        password:val,
       });
  };

  const handleLogin=async()=>{
    if(data.email==''||data.password==''){
      setError("All fields are required");
    }
    else{
      console.log(toggleCheckBox)
      if(toggleCheckBox===true){
        console.log("doctor login")

        try {
          // const response = await axios.post('http://10.0.2.2:8080/doctor/login',data);
          const response = await axios.post('http://192.168.100.14:8080/doctor/login',data);
          console.log("This is response data " + JSON.stringify(response.data));
          setDoctorName(response.data.name);
          setDoctorEmail(response.data.email);
          setUserRole("doctor");
          setUserEmail(response.data.email);
          // setUserEmail(response.data.email)
          if (response.status === 200) {
            // alert(` You have created: ${JSON.stringify(response.data)}`);
            console.log(setUserEmail)

            // navigation.navigate('DrawerNav')
            // navigation.navigate('DoctorHomeScreen')
            navigation.navigate('DoctorNavigator', {
              screen: 'DoctorHomeScreen', // Specify the screen you want to navigate to
            })
          } else {
            // setError(response.error);
            throw new Error("An error has occurred");
          }
        } catch (error) {
          if (error.response){
            const {data,status}=error.response;
            console.log(error.response)
            // setError(`Error ${status}: ${data.mesg}`)
            setError(`${data.mesg}`)
          }
        }
      }
      else{
      try {
        // const response = await axios.post('http://10.0.2.2:8080/patient/login',data);
        const response = await axios.post('http://192.168.100.14:8080/patient/login',data);

        console.log("This is response data " + JSON.stringify(response.data));
  
          setPatientName(response.data.name)
          setpatientEmail(response.data.email)
          setUserRole('patient');
          setDoctorEmail(response.data.email);
        
        if (response.status === 200) {
          // alert(` You have created: ${JSON.stringify(response.data)}`);
          // navigation.navigate('PatientHomeScreen')
          navigation.navigate('PatientNavigator', { screen: 'PatientHomeScreen' });
          // navigation.navigate('DrawerNav')
        } else {
          // setError(response.error);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        if (error.response){
          const {data,status}=error.response;
          // setError(`Error ${status}: ${data.mesg}`)
          setError(`${data.mesg}`)
        }
      }
    }
  }
    };
  const handleSignUp=()=>{
    navigation.navigate('SignUpScreen');
  }

  const updateSecureTextEntry=()=>{
    setData({
      ...data,
      secureTextEntry:!data.secureTextEntry
    });
  }
    return(
        <View style={styles.container}>
             <View style={styles.Box}>
            <Image source={require('../Images/blueLogo.png')} style={styles.Image}/>
            {/* <Image source={require('../Images/logoGif.gif')} style={styles.Image}/> */}

            </View> 
           <View style={styles.Box1}>
            <Text style={styles.text}> Welcome Back !</Text>
            {errorMsg ?<Text style={styles.error}>{errorMsg}</Text>:null}

            <View style={[styles.Input,isFocused && styles.focusedContainer]}>
            <FontAwesome
            name='envelope-o'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Email"
            style={styles.TextInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPressIn={()=>{setError(null),setEmailError(null)}}
            onChangeText={(val)=>textInputChange(val)}/>
            {data.check_textInputChange ?
            <Feather
            name='check-circle'
            color="green"
            size={15}
            />
            : null}

            </View>
            {emailError ?<Text style={styles.error}>{emailError}</Text>:null}
            <View style={[styles.Input,isFocused2 && styles.focusedContainer]}>
            <FontAwesome
            name='lock'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.TextInput}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            onPressIn={()=>{setError(null),setEmailError(null)}}
            onChangeText={(val)=>handelPassword(val)}/>

            <TouchableOpacity
            onPress={updateSecureTextEntry}>
              {data.secureTextEntry ?
            <Feather
            name='eye-off'
            color="gray"
            size={15}
            />:
            <Feather
            name='eye'
            color="gray"
            size={15}
            />
              }
            </TouchableOpacity>
            </View>
             <View style={{borderWidth:0,margin:5,alignItems:"flex-end"}}>
             {/* <TouchableOpacity><Text style={styles.Text}> Forget Password?</Text></TouchableOpacity> */}

              <View style={{flexDirection:"row",marginTop:5,right:18,borderWidth:0,alignItems:"center",justifyContent:"space-between"}}>
             <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text style={{fontSize:15,fontWeight:"bold",color:"#5c5c5c"}}>As Doctor</Text>
              </View>
             </View>

             {/* <LinearGradient colors={['#A2D1EA','#178CCB']} style={[styles.ButtonSignIn]}> */}
            <View style={styles.ButtonSignIn}>
              <TouchableOpacity onPress={handleLogin} style={styles.signIn}>
                <Text style={styles.textSign}>Sign In </Text>
              </TouchableOpacity> 
              {/* </LinearGradient> */}
            </View>
            <TouchableOpacity><Text style={styles.Text}> Forget Password?</Text></TouchableOpacity>
            <View style={styles.signUpText}> 
              <Text> Don't have a account? </Text> 
              <TouchableOpacity onPress={handleSignUp}><Text style={[{color:'black', borderBottomWidth:1,borderColor:'#9989C7'}]}>SignUp here</Text></TouchableOpacity>
              </View>
           </View>
        </View>
    );
            }
const styles=StyleSheet.create({
    container:{
      flex:1,
      // backgroundColor:'#E8F4FA',
      // backgroundColor:"#f5f5f5"
      backgroundColor:"white"
    },
    Box:{
        flex:2,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        margin:10

    },
    Box1:{
        flex:3,
        paddingHorizontal:20,
        // paddingVertical:30,
        // borderWidth:1,
        // alignItems:'center',
        // justifyContent:'center'
        // margin:10

    },
    text:{
     fontSize:25,
     fontWeight:'bold',
     fontStyle:'italic',
     color:'#5c5c5c',
     marginTop:20,
    },
    Input:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:12,
        paddingBottom:5,
        borderBottomWidth:1,
        
        
        paddingHorizontal:10,
        paddingVertical:8,
        marginLeft:20,
        marginRight:20,
        // margin:10
        // justifyContent:'center'
    },
    focusedContainer: {
        elevation: 3, 
        shadowColor: '#000', 
        // shadowOffset: { width: 0, height: 2 }, 
        // shadowOpacity: 0.1, 
        // shadowRadius: 4, 
        borderBottomWidth:0,
        paddingHorizontal:10,
      },
    TextInput:{
        flex:1,
        marginLeft:10,

    },
    ButtonSignIn:{
      alignItems: 'center',
        marginTop: 30,
        marginBottom:20,
        width:200,
        height:50,
        // justifyContent:"center"
        alignSelf:"center",
        borderRadius:50,
        backgroundColor:"#178CCB"

    },
    signIn:{
      width:200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    textSign:{
      fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
   Text:{
    
      alignSelf:"center",
       fontSize:14,

   },
   signUpText:{
    flexDirection:'row',
    // paddingRight:5,
    justifyContent:'center',
    marginTop:5,
   },
   Image:{
    // marginTop:100,
    width:260,
    height:260,
    top:20,
    alignSelf:"center",
    left:20
   },
   Image1:{
    borderWidth:1,
    justifyContent:'center',
    width:200,
    height:150,
    alignSelf:"center"
   },
   
   error:{
    marginTop:10,
    color:"red",
    fontSize:14,
    alignSelf:'center'

   }
   
});

export default SignInScreen;