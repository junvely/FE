import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from 'utils/cookies';
import useForm from 'hooks/useForm';

let stompClient = null;
const sock = new SockJS('https://api.ohpick.shop/ws');

function ChattingRoomPage() {
  const getChattingData = data => {
    // console.log("data.body*********", data.body); //JSON 형식
    const newData = JSON.parse(data.body); // 문자열을 파싱하여 JS 객체로 변환
    console.log('newData=> ', newData);
  };

  // const {} = useForm();
  const [messages, setMessages] = useState();

  stompClient = Stomp.over(() => sock);
  stompClient.connect(
    {
      header: {
        access_token: getCookie('access_token'),
        refresh_token: getCookie('refresh_token'),
      },
    },

    frame => {
      console.log('frame= 연결 성공');
      console.log('frame', frame);
      stompClient.subscribe('/sub/chat/room/1', getChattingData);
      stompClient.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          roomId: 1,
          sender: 'Office_A',
          message: '안녕',
        }),
      );
    },
  );

  return (
    <div>
      <div>
        <div>
          <div>
            <img src='' alt='' />
          </div>
          <div>
            <p>닉네임</p>
            <div>내용</div>
          </div>
        </div>
      </div>
      <div>
        <input type='text' />
        <button type='submit'>전송</button>
      </div>
    </div>
  );
}

export default ChattingRoomPage;
