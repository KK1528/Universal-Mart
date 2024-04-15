import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SliderProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get(
              
                 `http://localhost:8000/api/products/`
            );
            setProducts(res.data);
          } catch (err) {}
        };
        getProducts();
      }, []);

  return (
    <Container>
      {products.slice(0,4).map((item) => <Product item={item} key={item._id} />)}
    </Container>
  )
}

export default SliderProducts;







