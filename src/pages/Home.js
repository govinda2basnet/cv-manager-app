import {React,useEffect} from "react";
import { Form, Input, Button } from "antd";
import "../App.css";
import { ReactComponent as Logo } from "../images/undraw_secure_login_pdn4.svg";
import { GoogleButton } from "react-google-button";
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
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
      <div className="LoginWrapper">
        <Logo className="logo" />
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
      {/* <h1 style={{textAlign:"center"}} >Login or SignUp</h1>
    <div style={{display:'flex', flexWrap:'wrap',justifyContent:'space-between'}}>
     
      <div  style={{marginRight:'580px',marginTop:'50px',marginBottom:'80px',boxSizing:'border-box',padding:'3rem',borderRadius:'1rem',border:'1px solid black'}}>
      <h3>Welcome to Cv manager</h3>
      <Form style={{alignItems:"center",marginTop:'4rem'}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div> */}
    </>
  );
};

export default Home;
