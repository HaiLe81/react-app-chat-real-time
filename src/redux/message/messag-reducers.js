import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from "./messag-types";

const initialState = {
  loading: false,
  messages: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      const message = action.payload;
      let { messages = [] } = state;
      let newMessages = messages.slice();
      newMessages.push(message);
      return {
        loading: false,
        messages: newMessages,
        error: "",
      };
    case SEND_MESSAGE_FAILURE:
      const error = action.payload;
      return {
        ...state,
        error,
      };
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGE_SUCCESS:
      const messageList = action.payload;
      return {
        loading: false,
        messages: messageList,
        error: "",
      };
    case GET_MESSAGE_FAILURE:
      let err = action.payload;
      return {
        ...state,
        error: err,
      };
    default:
      return state;
  }
};

export default reducer;
