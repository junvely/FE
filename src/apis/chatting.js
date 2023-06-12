import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from 'utils/cookies';
import instance from './instance/instance';

let stompClient = null;

// 채팅 연결
const connectClient = (roomId, jsonParseChat) => {
  const sock = new SockJS('https://api.ohpick.shop/ws');
  stompClient = Stomp.over(() => sock);
  stompClient.connect(
    {
      header: {
        access_token: getCookie('access_token'),
      },
    },
    frame => {
      console.log('frame 연결 성공 =', frame);
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

// 채팅데이터 가져오기
const getChattingData = async roomId => {
  try {
    const { data } = await instance.get(`/api/chat/room/${roomId}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export { getChattingData, connectClient, sendChat };
