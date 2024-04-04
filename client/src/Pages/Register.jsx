import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction:column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setconfirmPassword] = useState("");
  const [showerr , setShowerr] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e)=>{
    e.preventDefault();
    if(password === confirmPassword){
      register({username , email , password});
      navigate('/login');
    }else{
      setShowerr(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
    }
  }


  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input value={username} placeholder="username" onChange={(e)=>setUsername(e.target.value)} required/>
          <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"  required/>
          <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="password"  required/>
          <Input type="password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)} placeholder="confirm password" required/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {showerr && <Agreement style={{ color: 'red' , marginTop:'5px' }}>Password doesn't match with confirm password</Agreement>}
          <Button onClick = {handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;