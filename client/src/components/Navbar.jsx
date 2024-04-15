import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { Search } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { setCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  background-color: pink;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  width: 25vw;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  background-color: white;
`;

const Input = styled.input`
  width: 24vw;
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector(state=>state.user.currentUser);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user) {
  //     getCart(user._id, dispatch);
  //   }
  // }, [user, dispatch]);

  const handleLogout = () =>{
    dispatch(setCart({products: [], totalQuantity : 0, total: 0}));
    dispatch(logout());
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/' style={{textDecoration:'none'}}><Logo>KK</Logo></Link>
        </Center>
        <Right>
          {!user && (
            <Link to="/Register" style={{textDecoration:'none'}}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}
          {!user && (
            <Link to="/Login" style={{textDecoration:'none'}}>
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          {user && (
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Link to="/Cart">
                  <ShoppingCartOutlined />
                </Link>
              </Badge>
            </MenuItem>
          )}
          {user && <MenuItem onClick={handleLogout}><LogoutIcon/></MenuItem>}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
