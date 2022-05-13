import { GLOBALTYPES } from '../Action/GlobalTypes';

const initialState = {
  token: '',
  user: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;