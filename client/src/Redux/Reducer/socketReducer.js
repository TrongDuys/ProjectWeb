import { GLOBALTYPES } from '../Action/GlobalTypes';


const socketReduce = (state = [], action) => {
  switch (action.type) {
    case GLOBALTYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReduce;
