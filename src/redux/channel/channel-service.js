import { messagedStatus } from "../../constants";
import { axios } from "../../configs";

const route = "/channels";
const addChannel = async (name, author) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: route,
      data: {
        name,
        author,
      },
    })
      .then((res) => {
        resolve({
          channel: res.data.channel,
          message: res.data.message,
          status: messagedStatus.success,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || error.message || "Add Room Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

const getChannel = async (name, author) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: route,
    })
      .then((res) => {
        resolve({
          channels: res.data.channels,
          message: res.data.message,
          status: messagedStatus.success,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Get Channels Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

const joinChannel = async (memberId, channelId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "patch",
      url: route,
      data: {
        memberId,
        channelId,
      },
    })
      .then((res) => {
        resolve({
          message: res.data.message,
          status: messagedStatus.success,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Join Channel Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

const getChannelById = async (channelId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: route + `/${channelId}`,
    })
      .then((res) => {
        resolve({
          channel: res.data.channel,
          message: res.data.message,
          status: messagedStatus.success,
        });
      })
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Get Channel Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

export { addChannel, getChannel, joinChannel, getChannelById, route };
