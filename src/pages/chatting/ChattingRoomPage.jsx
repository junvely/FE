import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { connectClient, getChattingData, sendChat } from '../../apis/chatting';
import styles from './chatting.module.scss';

function ChattingRoomPage() {
  const roomId = 1;
  const sender = '제주오피스';
  const { data } = useQuery('chatData', () => getChattingData(roomId));

  const [beforeMessages, setBeforeMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chat, setChat] = useState('');

  // 채팅 메세지 변환
  const jsonParseChat = chatData => {
    const newData = JSON.parse(chatData.body);
    console.log('메세지들-----------------------------', beforeMessages);
    setCurrentMessages(current => [...current, newData]);

    console.log('newData=> ', newData);
    console.log('채팅=> ', newData.message);
  };

  console.log(beforeMessages);
  const handleChatSubmit = () => {
    sendChat(roomId, sender, chat);
  };

  useEffect(() => {
    connectClient(roomId, jsonParseChat);
  }, []);

  useEffect(() => {
    if (data) {
      setBeforeMessages(data.data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {beforeMessages.map(message => (
        <div>
          <span>{message.createdAt}</span>
          <p>{message.sender}</p>
          <div>{message.message}</div>
        </div>
      ))}
      <span>-------------------------------------</span>
      {currentMessages.map(message => (
        <div>
          <span>{message.createdAt}</span>
          <p>{message.sender}</p>
          <div>{message.message}</div>
        </div>
      ))}
      <form onSubmit={e => e.preventDefault()}>
        <input
          type='text'
          value={chat}
          onChange={e => setChat(e.target.value)}
        />
        <button type='submit' onClick={handleChatSubmit}>
          전송
        </button>
      </form>
    </div>
  );
}

export default ChattingRoomPage;
