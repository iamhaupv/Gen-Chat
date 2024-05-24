import { StringeeClient } from "stringee";

// const api_host = "https://ba28-115-79-25-196.ngrok-free.app"
<<<<<<< HEAD
const api_host = " http://175.41.155.30:3000";
// const socket_host = "http://0.tcp.ap.ngrok.io:18615" // tcp trong url doi thanh http nha
const socket_host = "http://localhost:6969"; //chat 1-1
// const socket_host_Group = "http://0.tcp.ap.ngrok.io:11029"//chat group
const socket_host_Group = "http://localhost:8000"; //chat group

export default { api_host, socket_host, socket_host_Group };
=======
// const api_host = "http://localhost:6969"
const api_host = "http://13.229.124.25:3000"

// const socket_host = "http://0.tcp.ap.ngrok.io:18615" // tcp trong url doi thanh http nha
const socket_host = "http://localhost:6969" //chat 1-1

const STRINGEE_SERVER_ADDRS = [
  "wss://v1.stringee.com:6899/",
  "wss://v2.stringee.com:6899/"
];
const client = new StringeeClient(STRINGEE_SERVER_ADDRS);

client.on('authen', (res) => {
  console.log(`Stringee Authenticate: `, res);
});

export default {api_host, socket_host, client};
>>>>>>> e3c074b12c04e8e9a4044a6c795c63397174e319
