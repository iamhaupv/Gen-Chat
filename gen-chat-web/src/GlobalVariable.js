import { StringeeClient } from "stringee";

// const api_host = "https://ba28-115-79-25-196.ngrok-free.app"

// const api_host = "http://localhost:6969"
const api_host = "http://13.229.124.25:3000";

// const socket_host = "http://0.tcp.ap.ngrok.io:18615" // tcp trong url doi thanh http nha
const socket_host = "http://localhost:6969"; //chat 1-1

const STRINGEE_SERVER_ADDRS = [
  "wss://v1.stringee.com:6899/",
  "wss://v2.stringee.com:6899/",
];
const client = new StringeeClient(STRINGEE_SERVER_ADDRS);

client.on("authen", (res) => {
  console.log(`Stringee Authenticate: `, res);
});

export default { api_host, socket_host, client };
