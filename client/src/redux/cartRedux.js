import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         products: [],
//         quantity: 0,
//         total: 0,
//     },
//     reducers: {
//         addProduct:(state,action)=>{
//             state.quantity += 1;
//             state.products.push(action.payload);
//             state.total += action.payload.price * action.payload.quantity;
//         },
//     },
// });

// export const { addProduct } = cartSlice.actions;
// export default cartSlice.reducer;



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [], // Array to store the products in the cart
        totalQuantity : 0,
        total: 0,    // Total cost of items in the cart
    },

    reducers: {
        
        updateCart: (state, action) => {
            const updatedProduct = action.payload; // Assuming payload contains updated product details
            const existingProductIndex = state.products.findIndex(product => product._id === updatedProduct._id);
        
            if (existingProductIndex !== -1) {
                const existingQuantity = state.products[existingProductIndex].quantity;
                const existingPrice = state.products[existingProductIndex].price;
                
                if (existingQuantity !== updatedProduct.quantity) {
                    // Update product details if quantity is different
                    state.total -= existingPrice * existingQuantity;
                    state.total += updatedProduct.price * updatedProduct.quantity;
                    state.totalQuantity -= existingQuantity;
                    state.totalQuantity += updatedProduct.quantity;
                    state.products[existingProductIndex].quantity = updatedProduct.quantity;
                }
            } else {
                // Add new product if it doesn't exist in the cart
                state.products.push(updatedProduct);
                state.totalQuantity += updatedProduct.quantity;
                state.total += updatedProduct.price * updatedProduct.quantity;
            }
        },        

        removeProduct: (state, action) => {
            const productId = action.payload;
            const index = state.products.findIndex((product) => product._id === productId);
            if (index !== -1) {
              const removedProduct = state.products[index];
              state.products.splice(index, 1);
              state.totalQuantity -= removedProduct.quantity;
              state.total -= removedProduct.price * removedProduct.quantity;
            }
          },

          addProduct: (state, action) => {
            const newProduct = action.payload;
            const existingProductIndex = state.products.findIndex((product) => product._id === newProduct._id);
      
            if (existingProductIndex === -1) {
              // If the product doesn't exist in the cart, add it with default quantity 1
              state.products.push({ ...newProduct, quantity: 1 });
              state.totalQuantity += 1;
              state.total += newProduct.price;
            }
          },

        // Action to clear the cart
        setCart: (state, action) => {
            const res = action.payload;
            state.products = res.products;
            state.quantity = res.totalQuantity;
            state.totalPrice = res.totalPrice;
        },
    },
});

export const { updateCart, removeProduct,addProduct, setCart } = cartSlice.actions;
export default cartSlice.reducer;


