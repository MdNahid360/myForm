import './App.css';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import 'boxicons';
import { useState } from 'react';
import { getAuth, signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import app from './firebase.config';

const googleProvider = new GoogleAuthProvider();

const fbProvider = new FacebookAuthProvider();
let auth = getAuth(app);


function App() {
  const [newUser, setNewUser] = useState(false);
  const [myUser, setMyUser] = useState({
    name : '',
    email : '',
    displayName : ''
  });
  let [error, setError] = useState('');
  
  const handleInput =(e)=>{
      const newUserData = {...myUser};
      newUserData[e.target.name] = e.target.value
      setMyUser(newUserData);
  }
  const handleSubmit =(e)=>{
    if (newUser === true) {
        createUserWithEmailAndPassword(auth, myUser.email, myUser.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setMyUser(user);
    userDisplayName(myUser.name)
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage);
  });   
//  set user display name
  const userDisplayName =(name)=>{
    console.log(name);
      updateProfile(auth.currentUser, {
  displayName: name
}).then(() => {
   
}).catch((error) => {
   console.log(error);
});
  }
    }
    if (newUser === false) {
        signInWithEmailAndPassword(auth, myUser.email, myUser.password)
  .then((userCredential) => {
    const user = userCredential.user;
    setMyUser(user)
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
     setError(errorMessage);
  });

    }

   e.preventDefault();
  }

  // continue with google
  const signInWithGoogle=()=>{
   signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setMyUser(user);
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
      setError(errorMessage);
    // The email of the user's account used.
    console.log(errorMessage);
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const signInWithFacebook =()=>{
    signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    setMyUser(user);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
      setError(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }



  const logOut=()=>{
    setMyUser({})
  }
  return (
    <div className="App  py-[4%]">
        <div className="bg-white md:w-[300px] w-[90%] py-6 rounded-xl mx-auto shadow-lg">
             <div className="img  w-[130px] border-[3px] bg-[f13e4a] overflow-hidden border-[#f5525d] h-[130px] m-auto rounded-full flex justify-center items-center">
                 {
                  myUser.photoURL ? <img src={`${myUser.photoURL}`} className='w-full h-full' alt="" /> : <box-icon name='user' type='solid' size='lg' color='#cac6c6' ></box-icon> 
                 }
             </div>
               {
                  myUser.displayName ? <h1 className='text-center font-bold text-2xl'>{myUser.displayName}   </h1> : <h1 className='text-center font-bold text-2xl text-gray-300'>Your Name   </h1>
                 }
                 
                  {
                  myUser.email ? <h1 className='text-center text-[#969696]'>{myUser.email} </h1>: <h1 className='text-center text-[#969696]'>Your Email Here... </h1>
                 }
             
             
            <div onClick={logOut}  className="flex justify-center mt-3">
                  <button className="bg-[#f13e4a] text-white px-5 h-[40px] rounded-lg shadow-lg">Log Out</button>
            </div>
         </div>
         <br />

         <div  className="border rounded-xl shadow-lg md:px-[20px] px-[10px]  md:w-[400px] w-[95%] mx-auto bg-[#f4f4f4] pt-3 pb-7">
      <form onSubmit={handleSubmit}>
              {
                newUser ?   <h1 className="font-bold text-2xl text-center text-[#f13e4a]">Sign Up</h1> :   <h1 className="font-bold text-2xl text-center text-[#f13e4a]">Sign In</h1>
              }
            
            {
              newUser &&    <div className="border overflow-hidden flex items-center border-[#FF5A65] rounded-lg bg-white px-2 md:h-[41px] h-[48px]  mt-6">
                  <UserIcon className="w-6 mr-1 text-[#FF5A65]"></UserIcon>
                  <input onBlur={handleInput} type="text" name="name" placeholder='Enter your name' className="w-full h-full focus:border-0 outline-none text-[#FF5A65]" />
                </div>
            }
                <div className="border overflow-hidden flex items-center border-[#FF5A65] rounded-lg bg-white px-2 md:h-[41px] h-[48px]  mt-6">
                  <EnvelopeIcon className="w-6 mr-1 text-[#FF5A65]"></EnvelopeIcon>
                  <input onBlur={handleInput} type="email" name="email" placeholder='Enter your email' className="w-full h-full focus:border-0 outline-none text-[#FF5A65]" />
                </div>
                
                <div className="border overflow-hidden flex items-center border-[#FF5A65] rounded-lg bg-white px-2 md:h-[41px] h-[48px]  mt-6">
                  <LockClosedIcon className="w-6 mr-1 text-[#FF5A65]"></LockClosedIcon>
                  <input onBlur={handleInput} type="password" name="password" placeholder='Enter your password' className="w-full h-full focus:border-0 outline-none text-[#FF5A65]" />
                </div>
              {
                newUser ?   <input type="submit"  value="Sign Up" className="w-full bg-[#FF5A65] mt-6 md:h-[40px] h-[48px] rounded-lg shadow-lg text-white" /> :   <input type="submit" value="Sign In" className="w-full bg-[#FF5A65] mt-6 md:h-[40px] h-[48px] rounded-lg shadow-lg text-white" />
              }
              {/* Already have an account ? */}
              {
                newUser ? <p className='text-[13px] mt-3 font-[600] text-center'> Already have an account ? <span onClick={()=>setNewUser(!newUser)} className=' text-blue-500 cursor-pointer'  >Sign In</span></p> : <p className='text-[13px] mt-3 font-[600] text-center'>Create account <span onClick={()=>setNewUser(!newUser)} className=' text-blue-500 cursor-pointer'  >Sign Up</span></p>
              }
                <h3 className=" w-[30px] mx-auto mt-1 p-1 relative after:h-[1px] after:bg-gray-900 after:w-[150px] after:absolute after:left-[30px] after:top-[15px]
                before:w-[150px] before:h-[1px] before:bg-gray-900 before:absolute before:right-[30px] before:top-[15px]">OR</h3>
            </form>
                <button onClick={signInWithGoogle} className="w-full flex items-center bg-white mt-1 px-2 md:h-[40px] h-[48px] rounded-lg shadow-lg text-black " >
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" className="w-6" />
                    <span className="ml-2">Continue with google</span></button>
                  
                    <button onClick={signInWithFacebook} className="w-full flex  items-center bg-[#4267B2] mt-3 px-2 md:h-[40px] h-[48px] rounded-lg shadow-lg text-white " ><box-icon name='facebook-circle'  type='logo' color='#f6f3f3' ></box-icon> <span className="ml-2">Continue with facebook</span></button>
         </div>
     
    </div>
  );
}

export default App;
