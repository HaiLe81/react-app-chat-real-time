import { messagedStatus } from "../../constants";
import { axios } from "../../configs";

const route = "/messages";

const sendMessage = async (channel, author, message) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: route,
      data: {
        channel,
        author,
        message,
      },
    })
      .then((res) =>
        resolve({
          mess: res.data.mess,
          message: res.data.message,
          status: messagedStatus.success,
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Send Message Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

const getMessages = async (channelId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: route + `/${channelId}`,
    })
      .then((res) =>
        resolve({
          messages: res.data.messages,
          message: res.data.message,
          status: messagedStatus.success,
        })
      )
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Get Messages Failed";
        reject({ message: message, status: messagedStatus.error });
      });
  });
};

export { sendMessage, getMessages, route };
