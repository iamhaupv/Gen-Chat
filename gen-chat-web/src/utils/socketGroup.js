import { io } from "socket.io-client";
import host from "../GlobalVariable";;
const socket = io.connect(host.socket_host);
const socketGroup = io.connect(host.socket_host_Group);
// export default {socket, socketGroup};
export default socket;