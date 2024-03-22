import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import Login from "./pages/login/login";

function App() {
  const isAuthenticated = useSelector((state) => state.user.currentUser !== null);
  const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PrivateRoutes isAdmin={isAdmin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

// PrivateRoutes component to handle authenticated routes
function PrivateRoutes({ isAdmin }) {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {/* Routes accessible to admin */}
        {isAdmin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            {/* Add more admin routes here */}
          </>
        ) : (
          <Navigate to="/" /> // Redirect non-admin users to home
        )}
      </div>
    </>
  );
}

export default App;
