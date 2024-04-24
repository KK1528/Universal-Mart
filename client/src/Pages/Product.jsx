import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState ,useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
// import { updateCartProduct } from "../redux/apiCalls";
import {  updateCart } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";
import { backendCartUpdate } from "../redux/apiCalls";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/')[2].substring(1);
  const [product , setProducts] = useState({});
  const [quant, setQuantity] = useState(1);
  const user = useSelector(state=>state.user.currentUser);
  const navigate = useNavigate();
  const cart = useSelector(state=>state.cart); 

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await publicRequest.get("products/find/" + id);
        setProducts(res.data);
        // console.log("completed fetching product")
      }catch(err){
        console.log(err);
      }
    }
    getProduct();
  },[id]);

  const handleQuantity = (type)=>{
    if(type==='dec'){
      if(quant>1){
        setQuantity(quant-1);
      }
    }else{
      setQuantity(quant+1);
    }
  }
  
  const handleAddToCart = async () => {
    // console.log("this is the object i am pushing in redux",{...product,quantity:quant});
     if(user !== null) {
      dispatch(updateCart({...product , quantity:quant}));
      // Prepare the updated cart object to send to the backend
    const updatedCart = {
      userId: user._id,
      products: [
        ...cart.products, // Keep the existing products
        { ...product, quantity: quant } // Add the new product with updated quantity
      ]
    };
    console.log(
      updatedCart
    )

    // Update the cart on the backend
    await backendCartUpdate(user._id, updatedCart);
      console.log("cart is updated succesfully" , )
     }
     else navigate('/login');
    // console.log("this is the cart", Cart.products);
  };


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs. {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color: {product.color}</FilterTitle>
            </Filter>
            <Filter>
              {/* <FilterTitle>Category: </FilterTitle>
              <FilterSize>
              {product.categories?.map((c)=>{
                <FilterColor color={c} key={c}/>
              })}
              </FilterSize> */}
            </Filter>
            <Filter>
              <FilterTitle>Size: {product.size}</FilterTitle>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick = {()=>handleQuantity("dec")}/>
              <Amount>{quant}</Amount>
              <Add onClick = {()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;