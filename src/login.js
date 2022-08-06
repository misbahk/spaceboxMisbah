import React from 'react'
import socialMediaAuth, { signOut } from "./services/auth";
import { useHistory } from "react-router-dom"
import { message } from 'antd';
import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons';

const Login = () => {
  let history = useHistory()

  const handleLogin = async () => {
    const res = await socialMediaAuth();
    message
      .loading('Action in progress..', 6)
      .then(() => {
        message.success('Logged In successfully', 2.5)
        history.push("/")
      })
      .then(() => message.info('Please Click on Homepage to continue', 3.5));
    console.log(res);

  };
  const handleLogout = async () => {
    message.info('logged out successfully', 3);
    await signOut();
  };

  
  const handleHomepage = () => {


    history.push("/")
  };


  return (
    <div

      style={{
        backgroundColor: '#fc9cff',
        height: '100vh',
        width: '100',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <div
        style={{
          height: '70%',
          width: '350px',
          marginTop: '45px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0px 20px 40px -15px rgb(0 0 0 / 50%)'
        }}>
        <div style={{ textAlign: 'center' }}>

          <h2 style={{ color: 'gray' }}>Login to your GitHub Account</h2>
          <hr></hr>
        </div>
        <div style={{ textAlign: 'center' }}>

          <GithubOutlined style={{ fontSize: '50px', color: '#9c00a1' }} />
        </div>
        <div
          style={{
            marginTop: '50px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            flexFlow: 'column',
            cursor: 'pointer'
          }}
        >
          <div>
            <button
              style={{
                padding: '8px 26px',
                backgroundColor: '#8f0052',
                color: 'white',
                borderRadius: '5px',
                border: '1px solid gray',
                cursor: 'pointer'

              }}
              onClick={handleLogin}>Login</button>

          </div>
          <div>
            <button
              style={{
                padding: '8px 26px',
                backgroundColor: '#8f0052',
                color: 'white',
                borderRadius: '5px',
                border: '1px solid gray',
                cursor: 'pointer'
              }}
              onClick={handleHomepage}>Homepage</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login