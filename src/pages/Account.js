import React from 'react';
import { UserAuth } from '../context/AuthContext';
import SideMenu from '../navigation/SideMenu';

const Account = ({children}) => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{display:'flex', height:"100%"}}>
      <div style={{backgroundColor:'rgba(237, 244,, 0.15)',position:'fixed',height:'100%'}}>
        <SideMenu/>
      </div>
      <div style={{marginLeft:'14rem',padding:"8px",width:'100%',height:"100%", overflowa:'auto'}}>
        {children}
      </div>
  </div>
  );
};
export default Account;
