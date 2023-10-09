import { io } from 'socket.io-client';

const URL = 'ws://localhost:1880/data';

// export const socket = io(URL,{
//     autoConnect:false
// });

export const socket = new WebSocket(URL)