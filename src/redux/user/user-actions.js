import {
  CHECK_USER_JOINED_CHANNEL_REQUEST,
  CHECK_USER_JOINED_CHANNEL_SUCCESS,
  CHECK_USER_JOINED_CHANNEL_FAILURE,
} from "./user-types";

import { checkuserjoinedchannel } from "./user-services";

// add
export const checkJoinedChannelRequest = () => {
  return {
    type: CHECK_USER_JOINED_CHANNEL_REQUEST,
  };
};

export const checkJoinedChannelSuccess = () => {
  return {
    type: CHECK_USER_JOINED_CHANNEL_SUCCESS,
  };
};

export const checkJoinedChannelFailure = (error) => {
  return {
    type: CHECK_USER_JOINED_CHANNEL_FAILURE,
    payload: error,
  };
};

// join channel
export const CheckUserJoinedChannel = (memberId, channelId) => async (
  dispatch
) => {
  dispatch(checkJoinedChannelRequest);
  return new Promise((resolve, reject) => {
    checkuserjoinedchannel(memberId, channelId)
      .then((res) => {
        dispatch(checkJoinedChannelSuccess);
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(checkJoinedChannelFailure(err));
        reject({ status: err.status, message: err.message });
      });
  });
};
