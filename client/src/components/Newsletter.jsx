import { Send } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      await publicRequest.post("/sendemail", { email }); 
      alert("Email sent successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error sending email frontend:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>GET TIMELY UPDATE OF LATEST ARRIVALS FROM YOUR FAVOURITE PLACE !!</Desc>
      <InputContainer>
        <Input placeholder='Your Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={sendEmail}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
