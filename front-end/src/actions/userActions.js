import axios from "axios";
import { GET_ERRORS } from "./types";
import setJWTToken from "../utils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../actions/types";

export const register = (user, history) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:8001/api/user", user)
        console.log(res);
        history.push("/dashboard");
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err,
        });

    }
};

export const login = (LoginRequest) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:8001/login", LoginRequest);
        // Extraction du token
        const { token } = res.data;
        // Stockage du token en localStorage
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwt_decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err,
        });
    }
}


