import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from 'utils/cookies';
import instance from './instance';

// SockJS 연결
let stompClient = null;
const sock = new SockJS('https://api.ohpick.shop/ws');
stompClient = Stomp.over(() => sock);

// 실시간 채팅 받기
const connectChat = roomId => {
  stompClient.connect(
    {
      access_token: getCookie('access_token'),
    },
    function (frame) {
      console.log('frame= 연결 성공');
      stompClient.subscribe('/api/chat/room/1');
    },
  );
};

// 실시간 채팅 보내기
const sendChat = () => {
  stompClient.send(
    '/pub/chat/message',
    {},
    JSON.stringify({
      sender: JSON.parse(localStorage.getItem('sender')),
    }),
  );
};

// 채팅데이터 가져오기
const getChattingData = async roomId => {
  try {
    const { data } = await instance.get(`/api/chat/room/1`);
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export { getChattingData, connectChat, sendChat };
