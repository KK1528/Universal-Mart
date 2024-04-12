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
        quantity: 0, // Total quantity of items in the cart
        total: 0,    // Total cost of items in the cart
    },
    reducers: {
        // Action to add a product to the cart
        addProduct: (state, action) => {
            const { id, title, price, quantity } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product.id === id);

            // If the product is already in the cart, update its quantity
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity += quantity;
            } else {
                // Otherwise, add the product to the cart
                state.products.push({ id, title, price, quantity });
            }

            // Update total quantity and total cost
            state.quantity += quantity;
            state.total += price * quantity;
        },
        // Action to remove a product from the cart
        removeProduct: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product.id === id);

            if (existingProductIndex !== -1) {
                const existingQuantity = state.products[existingProductIndex].quantity;

                // If the quantity to remove is greater than or equal to the existing quantity,
                // remove the product from the cart completely
                if (quantity >= existingQuantity) {
                    state.quantity -= existingQuantity;
                    state.total -= state.products[existingProductIndex].price * existingQuantity;
                    state.products.splice(existingProductIndex, 1);
                } else {
                    // Otherwise, update the quantity and total cost accordingly
                    state.quantity -= quantity;
                    state.total -= state.products[existingProductIndex].price * quantity;
                    state.products[existingProductIndex].quantity -= quantity;
                }
            }
        },
        // Action to update the quantity of a product in the cart
        updateProductQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProductIndex = state.products.findIndex(product => product.id === id);

            if (existingProductIndex !== -1) {
                const existingQuantity = state.products[existingProductIndex].quantity;
                const diff = quantity - existingQuantity;

                // Update the quantity and total cost accordingly
                state.quantity += diff;
                state.total += state.products[existingProductIndex].price * diff;
                state.products[existingProductIndex].quantity = quantity;
            }
        },
        // Action to clear the cart
        
        setCart: (state, action) => {
            const { products, quantity, total } = action.payload;
            state.products = products;
            state.quantity = quantity;
            state.total = total;
        },
    },
});

export const { addProductToCart, removeProductFromCart, updateProductQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;


