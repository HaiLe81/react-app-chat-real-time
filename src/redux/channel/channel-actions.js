import {
    ADD_CHANNEL_REQUEST,
    ADD_CHANNEL_SUCCESS,
    ADD_CHANNEL_FAILURE,
    FETCH_CHANNELS_REQUEST,
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_FAILURE
} from "./channel-types";
  
  import { addChannel, getChannel } from "./channel-service";
  
  // add 
  export const addChannelRequest = () => {
    return {
      type: ADD_CHANNEL_REQUEST,
    };
  };
  
  export const addChannelSuccess = (channel) => {
    return {
      type: ADD_CHANNEL_SUCCESS,
      payload: channel,
    };
  };
  
  export const addChannelFailure = (error) => {
    return {
      type: ADD_CHANNEL_FAILURE,
      payload: error,
    };
  };
  
// get channels
export const FetchChannelsRequest = () => {
  return {
    type: FETCH_CHANNELS_REQUEST,
  };
};

export const FetchChannelsSuccess = (channels) => {
  return {
    type: FETCH_CHANNELS_SUCCESS,
    payload: channels,
  };
};

export const FetchChannelsFailure = (error) => {
  return {
    type: FETCH_CHANNELS_FAILURE,
    payload: error,
  };
};

  // add room
  export const AddChannel = (name, author) => async (dispatch) => {
    dispatch(addChannelRequest);
  
    return new Promise((resolve, reject) => {
        addChannel(name, author)
        .then((res) => {
          dispatch(addChannelSuccess(res.channel));
          resolve({ status: res.status, message: res.message });
        })
        .catch((err) => {
          dispatch(addChannelFailure(err.message));
          reject({ status: err.status, message: err.message });
        });
    });
  };
// fetch channels
export const FetctChannels = () => async (dispatch) => {
  dispatch(FetchChannelsRequest);

  return new Promise((resolve, reject) => {
    getChannel()
      .then((res) => {
        dispatch(FetchChannelsSuccess(res.channels));
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(FetchChannelsFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};