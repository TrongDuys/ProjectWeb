import { ANALYZE_TYPES } from "../Action/analyzeAction";

const initialState = {
  loading: false,
  info: {},
};

const analyzeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANALYZE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ANALYZE_TYPES.GETINFO:
      return {
        ...state,
        info: action.payload,
      };

    default:
      return state;
  }
};

export default analyzeReducer;
