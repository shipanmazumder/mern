import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Types from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";

export const register = (user, history) => {
  return (dispatch) => {
    axios
      .post("/api/users/register", user)
      .then((res) => {
        dispatch({
          type: Types.USER_ERROR,
          payload: {
            errors: [],
          },
        });
        history.push("/login");
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
      });
  };
};
export const login = (user, history) => {
  return (dispatch) => {
    axios
      .post("/api/users/login", user)
      .then((res) => {
          let result=res.data;
          if(result.code===200){
            localStorage.setItem("auth_token",result.token);
            setAuthToken(result.token)
            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:jwtDecode(result.token)
                }
            })
          }else{
            dispatch({
              type:Types.SET_MESSAGE,
              payload:{
                message:result.message[0]
              }
            })
          }
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
      });
  };
};
