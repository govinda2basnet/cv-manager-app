import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Home from './Home';


const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [user]);

  return (
    <>
    <Home/>
    <div style={{marginBottom:'200px',marginTop:'-90px'}}>
    

      {/* <p  style={{marginLeft:"35rem", fontStyle:"italic", color:"blue"}}>Dont Have an Account?Continue with Google.</p>
      <div style={{marginLeft:"37rem"}}>
        <GoogleButton onClick={handleGoogleSignIn} />
      
      </div>
       */}
    </div>
    
    </>
  );
};

export default Signin;
