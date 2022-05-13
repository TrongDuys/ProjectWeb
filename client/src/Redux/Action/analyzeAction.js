import { getDataAPI } from "../../api/fetchData";
import { GLOBALTYPES } from "./GlobalTypes";

export const ANALYZE_TYPES = {
  LOADING: "LOADING",
  GETINFO: "GETINFO",
};

export const getInfo = (name) => async (dispatch) => {
  try {
    dispatch({ type: ANALYZE_TYPES.LOADING, payload: true });
   getDataAPI(`disease?disease=${name}`)
      .then((res) => dispatch({type: ANALYZE_TYPES.GETINFO, payload: res.data.data[0]}))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Fail");
  }
};
