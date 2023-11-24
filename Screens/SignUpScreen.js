import  React, {useState} from 'react';
import { View, Text,Button,Alert, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icon from the library
import Feather from 'react-native-vector-icons/Feather'; 
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icon from the library
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { UserContext } from '../Hooks/AuthContext';


 

function SignUpScreen({navigation}){
  
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5,setIsFocused5]=useState(false);
    const [isFocused6,setIsFocused6]=useState(false);



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

  const handleFocus3 = () => {
    setIsFocused3(true);
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  const handleFocus4 = () => {
    setIsFocused4(true);
  };

  const handleBlur4 = () => {
    setIsFocused4(false);
  };

  const handleFocus5 = () => {
    setIsFocused5(true);
  };

  const handleBlur5 = () => {
    setIsFocused5(false);
  };

  const handleFocus6 = () => {
    setIsFocused6(true);
  };

  const handleBlur6 = () => {
    setIsFocused6(false);
  };
  const backArrowNav=()=>{
    navigation.navigate("SignIn");
  }

  const GoSignIn=()=>{
    navigation.navigate("SignIn");
    console.log(data)
  
  }

  const [check_textInputChange,set_check_textInputChange]=useState(false);
  const [ secureTextEntry,set_secureTextEntry]=useState(false);
  // const [error,seterror]=useState({field:"",mesg:""})
  const [errors, setErrors] =useState({});
  const [errorMsg,setError] = useState(null);



    const [data,setData]=useState({
    name:"",
    email:'',
    password:'',
    confirmPassword:"",
    phoneNumber:"",
    medicalHistory:"",
    gender:""

});
const handleGenderChange = (val) => {
  setData({...data,
            gender:val});
};

  
       const handleEmail=(val)=>{
        setData({
              ...data,
               email:val,
            })
       }
       
       const handleMedicalHistory=(val)=>{
        setData({
              ...data,
               medicalHistory:val,
            })
       }
  const handelPassword=(val)=>{
       setData({
        ...data,
        password:val,
       });
  };

  const handelConfirmPassword=(val)=>{
    setData({
     ...data,
     confirmPassword:val,
    });
};

const handlePhone=(val)=>{
  setData({
   ...data,
   phoneNumber:val,
  });
};
  const updateSecureTextEntry=()=>{
  
    set_secureTextEntry(!secureTextEntry);
  }


  const handleError = (error, data) => {
    setErrors(prevState => ({...prevState, [data]: error}));
  };

  const handleSignUp =async() => {
    
    let isValid = true;

    if (!data.email) {
      handleError('Please enter email', 'email');
      isValid = false;
    } else if (!data.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please enter a valid email', 'email');
      isValid = false;
    }

    if (!data.name) {
      handleError('Please enter name', 'name');
      isValid = false;
    }

    const phoneRegex = /^((\(((\+|00)92)\)|(\+|00)92)(( |-)?)(3[0-9]{2})\6|0(3[0-9]{2})( |-)?)[0-9]{3}( |-)?[0-9]{4}$/;
    if (!data.phoneNumber) {
      handleError('Please enter phone number', 'phoneNumber');
      isValid = false;
    }
    else if (!phoneRegex.test(data.phoneNumber)){
      handleError('Please enter valid phone number', 'phoneNumber');
      isValid=false;
    }

    if (!data.password) {
      handleError('Please enter password', 'password');
      isValid = false;
    } else if (data.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }
    if( data.password !== data.confirmPassword){
      handleError('Password does not match','confirmPassword')
      isValid=false;
    }
    if(!data.gender){
      handleError(" Please Select One",'gender')
      isValid=false
    }

    if (isValid) {
      try {
        const response = await axios.post('http://192.168.100.14:8080/patient/signup',data);
        console.log(response.data)
        navigation.navigate("SignIn")
      }
      // } catch (error) {
      //   console.error('Error during sign-up:', error);
      // }
      // navigation.navigate("SignIn")
      catch (error) {
        if (error.response){
          const {data,status}=error.response;
          // setError(`Error ${status}: ${data.mesg}`)
          setError(`${data.mesg}`)
        }
      }

    }
  };

  


    return(
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
            <TouchableOpacity style={styles.backArrow} onPress={()=>navigation.navigate("SignIn")}>
            <AntDesign
            name="arrowleft"
            size={30}
            color="#178CCB"/>
              </TouchableOpacity>

            </View>
           <View style={styles.Box1}>
            <Text style={styles.text}>Sign Up Here!</Text>
            {/* Enter Full Name */}
            {errorMsg ?<Text style={styles.error}>{errorMsg}</Text>:null}
            <View style={[styles.Input,isFocused3 && styles.focusedContainer]}>
            <FontAwesome
            name='user-o'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Enter Full Name"
            style={styles.TextInput}
            onPressIn={() => handleError(null, 'name')}
            onFocus={handleFocus3}
            onBlur={handleBlur3}
            onChangeText={(val)=>setData({...data,name:val})}
            />
            </View>
            {errors.name ?<Text style={styles.error}>{errors.name}</Text>:null}

           {/* Enter Email */}
            <View style={[styles.Input,isFocused && styles.focusedContainer]}>
            <FontAwesome
            name='envelope-o'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Enter email"
            style={styles.TextInput}
            onFocus={handleFocus}
            onPressIn={() => [handleError(null, 'email'),setError(null)]}
            onBlur={handleBlur}
            onChangeText={(val=>handleEmail(val))}/>
            {check_textInputChange ?
            <Feather
            name='check-circle'
            color="green"
            size={15}
            />
            : null}
            </View>
            {errors.email ?<Text style={styles.error}>{errors.email}</Text>:null}


            {/* Enter Password */}
            <View style={[styles.Input,isFocused2 && styles.focusedContainer]}>
            <FontAwesome
            name='lock'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Enter Password"
            secureTextEntry={secureTextEntry ? true : false}
            style={styles.TextInput}
            onFocus={handleFocus2}
            onPressIn={() => handleError(null, 'password')}
            onBlur={handleBlur2}
            onChangeText={(val)=>handelPassword(val)}/>
            <TouchableOpacity
            onPress={updateSecureTextEntry}>
              {secureTextEntry ?
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
            {errors.password ?<Text style={styles.error}>{errors.password}</Text>:null}
           {/* Confirm Password  */}
            <View style={[styles.Input,isFocused4 && styles.focusedContainer]}>
            <FontAwesome
            name='lock'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput placeholder="Confirm Password"
            secureTextEntry={secureTextEntry ? true : false}
            style={styles.TextInput}
            onFocus={handleFocus4}
            onBlur={handleBlur4}
            onPressIn={() => handleError(null, 'confirmPassword')}
            onChangeText={(val)=>handelConfirmPassword(val)}/>
            <TouchableOpacity
            onPress={updateSecureTextEntry}>
              {secureTextEntry ?
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
            {errors.confirmPassword ?<Text style={styles.error}>{errors.confirmPassword}</Text>:null}
            
            <View style={[styles.Input,isFocused5 && styles.focusedContainer]}>
            <FontAwesome
            name='phone'
            size={25}
            color='#178CCB'>
            </FontAwesome>
            <TextInput 
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            style={styles.TextInput}
            onFocus={handleFocus5}
            onPressIn={() => handleError(null, 'phoneNumber')}
            onBlur={handleBlur5}
            onChangeText={(val)=>handlePhone(val)}/>
            </View>
            {errors.phoneNumber ?<Text style={styles.error}>{errors.phoneNumber}</Text>:null}
           
            <View style={[styles.Input,isFocused6 && styles.focusedContainer]}>
            <FontAwesome5
            name='notes-medical'
            size={25}
            color='#178CCB'>
            </FontAwesome5>
            <TextInput placeholder="Enter Medical History"
            style={styles.TextInput}
            onFocus={handleFocus6}
            onBlur={handleBlur6}
            onChangeText={(val)=>handleMedicalHistory(val)}/>
            </View>
            
            <View style={{ flexDirection: "column", alignItems:"flex-start" }}>
        <Text style={{fontSize:15,marginTop:15,marginLeft:10,fontWeight:'bold'}}>Select Gender :</Text>
        <View style={{ flexDirection: "row", alignItems: 'center', marginTop:10,marginLeft:60 }}>
          <TouchableOpacity onPress={() => handleGenderChange('male')}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <RadioButton
                value="male"
                status={data.gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderChange('male')}
                color='skyblue'
                onPressIn={() => handleError(null, 'gender')}

              />
              {/* <Text>Male</Text> */}
              <FontAwesome
            name='male'
            size={30}
            color='#85D0DE'>
            </FontAwesome>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleGenderChange('female')}>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:50}}>
              <RadioButton
                value="female"
                status={data.gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => handleGenderChange('female')}
                onPressIn={() => handleError(null, 'gender')}
                color='pink'
              />
              {/* <Text>Female</Text> */}
              <FontAwesome
            name='female'
            size={30}
            color='#E6879E'>
            </FontAwesome>
            </View>
          </TouchableOpacity>
        </View>
        {errors.gender ?<Text style={styles.error}>{errors.gender}</Text>:null}
      </View>


            <View style={styles.ButtonSignIn}>
              <TouchableOpacity onPress={handleSignUp} style={styles.signIn}>
                <Text style={styles.textSign}>Sign up </Text>
              </TouchableOpacity> 
            </View>
            <View style={styles.signUpText}> 
              <Text> Already have a account? </Text> 
              <TouchableOpacity onPress={GoSignIn}><Text style={[{color:'black', borderBottomWidth:1,borderColor:'#9989C7'}]}>SignIn here</Text></TouchableOpacity>
              </View>
           </View>
           </ScrollView>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },
    header: {
      height: 60,
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center",
      borderBottomWidth:1.7,
      // borderBottomColor:"#6AAB9C",
     borderBottomColor: '#388E8E'
  
    },
    headerTxt: {
      fontFamily: 'Inter',
      fontSize: 22,
      marginRight:20,
      color: '#40413F',
      fontWeight:'bold',
      borderWidth:0,
      left:25,
    },
    Box:{
        flex:1,
        backgroundColor:'#9989C7',

    },
    Box1:{
        // flex:7,
        paddingHorizontal:20,
        paddingVertical:20,
        // borderWidth:1

    },
    text:{
     fontSize:30,
     fontWeight:'bold',
     color:'#5c5c5c',
     fontStyle:'italic',
    marginBottom:20,
     alignSelf:'center'
    },
    Input:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        paddingBottom:5,
        borderBottomWidth:1,
        paddingHorizontal:10,
        paddingVertical:10,
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
        color:'black',
        marginLeft:10,

    },
    ButtonSignIn:{
      alignItems: 'center',
        marginTop: 20,
        marginBottom:20,

    },
    signIn:{
      width:200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#178CCB',
      shadowColor:'#f5f5f5',
      elevation:2,
      borderRadius:50
    },
    textSign:{
      fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
   Text:{
       marginTop:10,
       alignSelf:'flex-end',
       fontSize:14,
       
   },
   signUpText:{
    flexDirection:'row',
    paddingRight:5,
    justifyContent:'center',
   },
   backArrow:{
    // marginTop:10,
    left:15,
    alignSelf:'flex-start',
    top:25

  },
  error:{
    marginTop:10,
    color:"red",
    fontSize:14,
    // alignSelf:'center',
    textAlign:'right'
    

   }
   
});
 export default SignUpScreen;