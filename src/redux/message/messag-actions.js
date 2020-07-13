import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE
} from "./messag-types";

import { sendMessage, getMessages } from "../message/messag-service";

export const SendMessageRequest = () => {
  return {
    type: SEND_MESSAGE_REQUEST,
  };
};

export const SendMessageSuccess = (message) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: message,
  };
};

export const SendMessageFailure = (error) => {
  return {
    type: SEND_MESSAGE_FAILURE,
    payload: error,
  };
};

export const GetMessageRequest = () => {
  return {
    type: GET_MESSAGE_REQUEST,
  };
};

export const GetMessageSuccess = (messageList) => {
  return {
    type: GET_MESSAGE_SUCCESS,
    payload: messageList,
  };
};

export const GetMessageFailure = (error) => {
  return {
    type: GET_MESSAGE_FAILURE,
    payload: error,
  };
};

// send Message
export const SendMessage = (channel, author, message) => async (dispatch) => {
  dispatch(SendMessageRequest);

  return new Promise((resolve, reject) => {
    sendMessage(channel, author, message)
      .then((res) => {
        dispatch(SendMessageSuccess(res.mess));
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(SendMessageFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};

// get messages
export const GetMessages = (channelId) => async (dispatch) => {
  dispatch(GetMessageRequest);

  return new Promise((resolve, reject) => {
    getMessages(channelId)
      .then((res) => {
        dispatch(GetMessageSuccess(res.messages));
        resolve({ status: res.status, message: res.message });
      })
      .catch((err) => {
        dispatch(GetMessageFailure(err.message));
        reject({ status: err.status, message: err.message });
      });
  });
};