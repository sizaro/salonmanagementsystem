import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;
const socket = io(SOCKET_URL, { transports: ["websocket", "polling"], withCredentials: true });
export default socket;
