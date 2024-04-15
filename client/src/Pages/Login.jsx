import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { createCart, getCart, login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Linkstyle = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showerror, setShowerror] = useState(false);
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await login(dispatch, { username, password });
      await getCart(res._id,dispatch);
      // console.log(res);
    } catch (err) {
      console.error("Login failed:001 => ", err);
      setShowerror(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          {showerror && (
            <div style={{ color: "red", marginTop: "5px" }}>
              Wrong Credentials
            </div>
          )}

          <Linkstyle>DO NOT YOU REMEMBER THE PASSWORD?</Linkstyle>
          <Linkstyle>
            <Link to="/register">CREATE A NEW ACCOUNT</Link>
          </Linkstyle>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
