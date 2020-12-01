import React, { useState } from 'react';
import Button from './Button';
import styled, { keyframes } from 'styled-components';
import Logo from '../assets/Logo.png';
import { login } from '../utils/auth';

const FormAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-65%)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`

const Img = styled.img.attrs({
  src: `${Logo}`
})`
  width: 100px;
  height: 100px;
`;

const Background = styled.section`
  background-color: #0e0a14ef;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 400ms;
`

const LoginForm = styled.form`
  font-family: monospace;
  animation: ${FormAnimation} 0.7s;
  background-color: #fff;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 25px;
  border-radius: 10px;
  ${Button} {
    width: 100%;
    background-color: #333333;
    color: #fff;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 7px;
  font-size: 16px;
  color: #7159c1;
  border-radius: 2px;
  border: 1px solid #111;
`;
const LoginLabel = styled.label`
  font-size: 14px;
  padding: 7px;
  color: darkslateblue;
`;


export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onUsername (event) {
    setUsername(event.target.value)
  }

  function onPassword (event) {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  function onButton () {
    login(username, password)
  }

  return (
    <Background>
      <LoginForm>
        <Img/>
        <LoginLabel>Username</LoginLabel>
        <LoginInput value={username} onChange={onUsername} required/>
        <LoginLabel>Password</LoginLabel>
        <LoginInput value={password} onChange={onPassword} type='password' required/>
        <Button onClick={onButton}>Sign In</Button>
      </LoginForm>
    </Background>
  );
};
