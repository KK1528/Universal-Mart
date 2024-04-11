import {loginStart, loginSuccess, loginError} from './userRedux';
import { publicRequest } from '../requestMethods';
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

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.log("login err=> ", err);
        dispatch(loginError());
        throw new Error("Wrong credentials!");
    }
};

export const register = async (user) =>{
    try {
        await publicRequest.post("/auth/register" , user);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const logout = async (dispatch) => {
    // Perform logout action, for example, clearing user data from state
    // Dispatch an action to reset the user state
    dispatch({ type: 'LOGOUT' }); // You need to define appropriate action type in userRedux.js
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