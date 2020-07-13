import React from "react";
import "./MessageItem.css";
import { SlackSquareOutlined } from "@ant-design/icons";
import { formatDate } from "../../../utils/moment";

function MessageItem({ item }) {
  return (
    <div className="message-item">
      <ul>
        <li>
          <div className="wraaper-message">
            <div className="Logo">
              <SlackSquareOutlined style={{ fontSize: "24px" }} />
            </div>
            <div className="message-right">
              <div className="t-name">
                <div className="fullname">{item.author.fullname}</div>
                <div className="time">{formatDate(item.createdAt)}</div>
              </div>
              <div className="content-message">{item.message}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default MessageItem;
