import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here if needed
    }
  };
  

  return (
    <div
      style={{
        display:"flex",
        flexDirection:"column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF5733",
        
      }}
    >
      <span style={{
        position:"absolute",
        top: "90px",
        marginBottom : "200px",
        fontSize:"100px",
        color:"white",
      }}>
      ADMIN PAGE LOGIN
      </span>
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;