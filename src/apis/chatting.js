import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import instance from './instance/instance';

let stompClient = null;

// 채팅 연결
const connectClient = (roomId, jsonParseChat) => {
  const sock = new SockJS('https://api.ohpick.shop/ws');
  stompClient = Stomp.over(() => sock);
  stompClient.debug = () => {};
  stompClient.connect(
    {
      header: {
        access_token: axios.defaults.headers.common.Access_Token,
      },
    },
    frame => {
      // console.log('frame 연결 성공 =', frame);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, jsonParseChat);
    },
  );
};

// 실시간 채팅 보내기
const sendChat = (roomId, sender, message) => {
  stompClient.send(
    '/pub/chat/message',
    {},
    JSON.stringify({
      roomId,
      sender,
      message,
    }),
  );
};

// 채팅 데이터 가져오기
const getChattingData = async roomId => {
  try {
    const { data } = await instance.get(`/api/chat/room/${roomId}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// 채팅 목록 가져오기
const getChattingList = async () => {
  try {
    const { data } = await instance.get(`/api/chat/room`);
    return data.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 채팅 방 만들기
const postMakeChattingRoom = async postId => {
  try {
    const { data } = await instance.post(`/api/chat/room/${postId}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// 연결 종료
const disconnectClient = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};

export {
  getChattingData,
  connectClient,
  sendChat,
  getChattingList,
  postMakeChattingRoom,
  disconnectClient,
};
