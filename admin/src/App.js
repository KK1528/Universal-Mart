// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login";
import ProtectedAdmin from './ProtecedAdmin';
import { positions } from 'react-alert';
import { logout } from './redux/apiCalls';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

function App() {
  const isAdmin = useSelector((state) => state.user.currentUser.isAdmin);
  const dispatch = useDispatch(); // Added dispatch

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="App">
      <Router> {/* Wrap your app with BrowserRouter */}
        {isAdmin ? (
          <ProtectedAdmin>
            <div className="screens-container">
              <Topbar handleLogout={handleLogout} />
              <Sidebar />
              <div className='screens-section-container'>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="/newUser" element={<NewUser />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                </Routes>
              </div>
            </div>
          </ProtectedAdmin>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;
