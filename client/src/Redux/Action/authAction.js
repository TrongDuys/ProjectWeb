import { getDataAPI, postDataAPI } from "../../api/fetchData";
import { GLOBALTYPES } from "./GlobalTypes";

export const login = (data) => async (dispatch) => {
  try {
    const res = await postDataAPI("login", data);
    console.log(res.data.msg);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem("first login", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("first login");
  if (firstLogin) {
    try {
      const res = await postDataAPI("refresh_token");

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
    } catch (err) {
    }
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem('first login', true);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("first login");
    await postDataAPI("/logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const activeUser = (id) => async (dispatch) => {
  console.log(id);
  if(!id){
    dispatch({type: GLOBALTYPES.ALERT, payload: {
      error: 'User not found'
    }})
  }
  try {

    const res = await getDataAPI(`/activated/user/${id}`);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
}
