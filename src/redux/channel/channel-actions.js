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
  GET_CHANNEL_BY_ID_FAILURE
} from "./channel-types";

import { addChannel, getChannel, joinChannel, getChannelById } from "./channel-service";

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

// Join Channel
export const JoinChannelsRequest = () => {
  return {
    type: JOIN_CHANNEL_REQUEST,
  };
};

export const JoinChannelsSuccess = () => {
  return {
    type: JOIN_CHANNEL_SUCCESS,
  };
};

export const JoinChannelsFailure = (error) => {
  return {
    type: JOIN_CHANNEL_FAILURE,
    payload: error,
  };
};

// Get Channel By Id
export const GetChannelByIdRequest = () => {
  return {
    type: GET_CHANNEL_BY_ID_REQUEST,
  };
};

export const GetChannelByIdSuccess = (channel) => {
  return {
    type: GET_CHANNEL_BY_ID_SUCCESS,
    payload: channel
  };
};

export const GetChannelByIdFailure = (error) => {
  return {
    type: GET_CHANNEL_BY_ID_FAILURE,
    payload: error,
  };
};

// get channel by id
export const GetChannelById = (channelId) => async (dispatch) => {
  dispatch(GetChannelByIdRequest);

  return new Promise((resolve, reject) => {
    getChannelById(channelId)
      .then((res) => {
        dispatch(GetChannelByIdSuccess(res.channel));
        resolve({ status: res.status, message: res.message, channel: res.channel });
      })
      .catch((err) => {
        dispatch(GetChannelByIdFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
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
export const FetchChannels = () => async (dispatch) => {
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

// join channel
export const JoinChannel = (memberId, channelId) => async (dispatch) => {
  dispatch(JoinChannelsRequest);

  return new Promise((resolve, reject) => {
    joinChannel(memberId, channelId)
      .then((res) => {
        dispatch(JoinChannelsSuccess);
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(JoinChannelsFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};
