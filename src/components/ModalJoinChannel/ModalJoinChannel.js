import React from "react";
import "./ModalJoinChannel.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "../../hooks";
import { JoinChannel } from "../../redux/channel/channel-actions";
import { CheckUserJoinedChannel } from "../../redux/user/user-actions";
import socket from "../../socket/index";

const { confirm } = Modal;
function ModalJoinChannel({
  path,
  children,
  channelId,
  userId,
  channel,
  JoinChannel,
  CheckUserJoinedChannel,
}) {
  const router = useRouter();
  const showConfirm = async () => {
    let Joined = false;
    console.log('channelId', typeof channelId, channelId)
    await CheckUserJoinedChannel(userId, channelId)
      .then((res) => res)
      .catch((err) => {
        if (err.status === 400) {
          Joined = true;
        }
      });
    if (Joined) {
      router.replace(path);
      router.push({ state: { channel, channelId } });
      socket.emit("joinChannel", channelId);
    } else {
      confirm({
        title: `Do you Want Join Channel - ${children}?`,
        icon: <ExclamationCircleOutlined />,
        onOk() {
          // router.state = member;
          router.replace(path);
          router.push({ state: { channel, channelId } });
          socket.emit("joinChannel", channelId);
          JoinChannel(userId, channelId);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };
  return <div onClick={showConfirm}>{children}</div>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    JoinChannel: (memberId, channelId) => {
      dispatch(JoinChannel(memberId, channelId))
        .then((res) => {
          message[res.status](res.message);
        })
        .catch((err) => {
          message[err.status](err.message);
        });
    },
    CheckUserJoinedChannel: (memberId, channelId) => {
      return new Promise((resolve, reject) => {
        dispatch(CheckUserJoinedChannel(memberId, channelId))
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalJoinChannel);
