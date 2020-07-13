import io from "socket.io-client";
import globals from "../configs/globals";

const URL = globals.env.SOCKET;

const socket = io(URL);

export default socket;