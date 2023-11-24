import React, { createContext, useState } from 'react';
// import React, { useContext } from 'react';
// Create the AuthContext
export const UserContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState('');
  const [UserRole,setUserRole]=useState('patient');
  const [patientEmail , setpatientEmail] = useState('');
  const [patientName , setPatientName] = useState('');
  const [appoitmentDoctor , setappoitmentDoctor] = useState('');
  const [selecteddSlot , setselectedSlot] = useState('');
  const [selecteddDate , setselecteddDate] = useState('');
  const [doctorName,setDoctorName]=useState("");
  const [doctorEmail,setDoctorEmail]=useState("")

  

  return (
    <UserContext.Provider value={{ 
      userEmail, setUserEmail,  
      UserRole,setUserRole,
      patientEmail , setpatientEmail,
       patientName , setPatientName,
       appoitmentDoctor , setappoitmentDoctor,
       selecteddSlot , setselectedSlot,
       selecteddDate , setselecteddDate,
       doctorName,setDoctorName,
       doctorEmail,setDoctorEmail}}>
      {children}
    </UserContext.Provider>
  );
};