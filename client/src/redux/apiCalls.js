import { publicRequest, userRequest } from '../requestMethods';
import { loginStart, loginSuccess, loginError } from './userRedux';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { setCart } from './cartRedux';

// FOR THE CLIENT 


// Authentication

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log("login err=> ", err);
    dispatch(loginError());
    throw new Error("Wrong credentials!");
  }
};

export const register = async (user) => {
  try {
    const userdata = await publicRequest.post("/auth/register", user);
    return userdata.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const logout = async (dispatch) => {
  dispatch(logout);
};



export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};


//CRUD on CART 

export const createCart = async (userId) => {
  try {
    await userRequest.post("/carts",  {userId} );
    console.log("create cart succesfully create wala hai");
  } catch (err) {
    console.error("Error Creating the cart:", err);
  }
}


export const getCart = async (userId, dispatch) => {
  try {
    const res = await userRequest.get("/carts/find/" + userId);
    console.log("fecting the cart",res.data);
    dispatch(setCart(res.data));
    console.log("this is the cart of the user : " + userId + " => " + res.data);
  } catch (err) {
    console.error("Error getting user's cart :", err);
  }
};

/*****************THE ABOVE CALLS ARE VERIFIED AND ADDED*****************************/

// export const addToCart = async (userId, product, dispatch) => {
//   try {
//     const res = await userRequest.post(`/cart`, { userId, product });
//     dispatch(addProductToCart(res.data));
//   } catch (err) {
//     console.error("Error adding product to cart:", err);
//   }
// };

export const backendCartUpdate = async (userId, cart) => {
  try {
    console.log("/cart/" + userId , cart);
    await userRequest.put("/cart/" + userId , cart);
  } catch (err) {
    console.error("Error updating product in cart: this error is transmitted through the apicall code", err);
  }
};

// export const removeFromCart = async (cartItemId, dispatch) => {
//   try {
//     await userRequest.delete(`/cart/${cartItemId}`);
//     dispatch(removeProductFromCart(cartItemId));
//   } catch (err) {
//     console.error("Error removing product from cart:", err);
//   }
// };
















// FOR THE ADMIN





// CRUD on the product 
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};


export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

