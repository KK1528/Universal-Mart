import {loginStart, loginSuccess, loginError} from './userRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(loginError());
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