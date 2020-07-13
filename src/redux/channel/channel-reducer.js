import {
  ADD_CHANNEL_REQUEST,
  ADD_CHANNEL_SUCCESS,
  ADD_CHANNEL_FAILURE,
  FETCH_CHANNELS_REQUEST,
  FETCH_CHANNELS_SUCCESS,
  FETCH_CHANNELS_FAILURE,
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS,
  JOIN_CHANNEL_FAILURE,
  GET_CHANNEL_BY_ID_REQUEST,
  GET_CHANNEL_BY_ID_SUCCESS,
  GET_CHANNEL_BY_ID_FAILURE,
} from "./channel-types";

const initialState = {
  loading: false,
  channels: [],
  channel: null,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CHANNEL_SUCCESS:
      const channel = action.payload;
      let { channels = [] } = state;
      let newChannels = channels.slice();
      newChannels.push(channel);
      return {
        loading: false,
        channels: newChannels,
        error: "",
      };
    case ADD_CHANNEL_FAILURE:
      const error = action.payload;
      return {
        ...state,
        error,
      };
    case FETCH_CHANNELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHANNELS_SUCCESS:
      const chan = action.payload;
      return {
        loading: false,
        channels: chan,
        error: "",
      };
    case FETCH_CHANNELS_FAILURE:
      const err = action.payload;
      return {
        ...state,
        error: err,
      };
    case JOIN_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOIN_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case JOIN_CHANNEL_FAILURE:
      let erro = action.payload;
      return {
        ...state,
        error: erro,
      };
    case GET_CHANNEL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNEL_BY_ID_SUCCESS:
      const Channel = action.payload;
      return {
        ...state,
        loading: false,
        channel: Channel
      };
    case GET_CHANNEL_BY_ID_FAILURE:
      let errorr = action.payload;
      return {
        ...state,
        error: errorr,
      };
    default:
      return state;
  }
};

export default reducer;
