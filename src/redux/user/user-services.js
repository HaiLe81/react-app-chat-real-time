import { messagedStatus } from "../../constants";
import { axios } from "../../configs";

const route = "/users";
const checkuserjoinedchannel = async (memberId, channelId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: route + `/${memberId}/checkJoinChannel/${channelId}`
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
          "Check User Join Channel Failed";
        reject({ message: message, status: error.response.status });
      });
  });
};

export { checkuserjoinedchannel, route };
