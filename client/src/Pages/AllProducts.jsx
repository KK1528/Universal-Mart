import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";


const ContainerProduct = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const FilterTextReset = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const AllProducts = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products/");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  },[]);

  useEffect(() => {
    const applyFilters = () => {
      if (!filters || Object.keys(filters).length === 0) {
        // If no filters applied, set filtered products to all products
        setFilteredProducts(products);
      } else {
        // Apply filters
        const filtered = products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        );
        setFilteredProducts(filtered);
      }
    };
    applyFilters();
  }, [products, filters]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    const sortProducts = () => {
      if (sort === "newest") {
        setFilteredProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else if (sort === "asc") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.prices - b.prices)
        );
      } else {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.prices - a.prices)
        );
      }
    };
    sortProducts();
  }, [sort]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>All Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterTextReset onClick={handleResetFilters}>
            Reset Filters
          </FilterTextReset>
        </Filter>
      </FilterContainer>
      <ContainerProduct>
        {filteredProducts.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ContainerProduct>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default AllProducts;
