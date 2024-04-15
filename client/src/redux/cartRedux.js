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
            const res = action.payload;
            const existingProductIndex = state.products.findIndex(product => product._id === res._id);

            if (existingProductIndex !== -1) {
                const existingQuantity = state.products[existingProductIndex].quantity;
                if (existingQuantity !== res.quantity) {
                    // Update product details if quantity is different
                    state.total -= state.products[existingProductIndex].price * existingQuantity;
                    state.total += res.price * res.quantity;
                    state.totalQuantity -= state.products[existingProductIndex].quantity;
                    state.totalQuantity += res.quantity;
                    state.products[existingProductIndex].quantity = res.quantity;
                }
            } else {
                // Add new product if it doesn't exist in the cart
                state.products.push(res);
                state.quantity += res.quantity;
                state.total += res.price * res.quantity;
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

export const { updateCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;


