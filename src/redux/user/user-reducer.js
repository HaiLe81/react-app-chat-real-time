import {
  CHECK_USER_JOINED_CHANNEL_REQUEST,
  CHECK_USER_JOINED_CHANNEL_SUCCESS,
  CHECK_USER_JOINED_CHANNEL_FAILURE,
} from "./user-types";

const initialState = {
  loading: false,
  error: "",
  joined: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER_JOINED_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_USER_JOINED_CHANNEL_SUCCESS:
      return {
        loading: false,
        error: "",
        joined: true
      };
    case CHECK_USER_JOINED_CHANNEL_FAILURE:
      const error = action.payload;
      let newJoined;
      if(error.status){
        newJoined = true
      }
      return {
        ...state,
        error,
        joined: newJoined
      };
    default:
      return state;
  }
};

export default reducer;
