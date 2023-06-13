import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { connectClient, getChattingData, sendChat } from '../../apis/chatting';
import styles from './chatting.module.scss';
import profileImg from '../../assets/img/profileDefault.png';

function ChattingRoomPage() {
  const scrollRef = useRef();
  const param = useParams();
  const { roomId } = param;

  const { data } = useQuery('chatData', () => getChattingData(roomId));
  const sender = data && data.data.nickname;

  const [beforeMessages, setBeforeMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chat, setChat] = useState('');

  // 채팅 메세지 변환
  const jsonParseChat = chatData => {
    const newData = JSON.parse(chatData.body);
    setCurrentMessages(current => [...current, newData]);
    console.log('newData=> ', newData);
  };
  console.log('메세지들-----------------------------', beforeMessages);

  const handleChatSubmit = () => {
    if (!chat) {
      alert('메세지를 입력하세요.');
    } else {
      sendChat(roomId, sender, chat);
      setChat('');
    }
  };

  useEffect(() => {
    connectClient(roomId, jsonParseChat);
  }, []);

  useEffect(() => {
    if (data) {
      setBeforeMessages(data.data.chats);
    }
  }, [data]);

  // 스크롤 포커스
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [beforeMessages, currentMessages]);

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer} ref={scrollRef}>
        {beforeMessages.map((message, i) => (
          <div>
            <div
              className={
                i > 0 && message.createdAt !== beforeMessages[i - 1].createdAt
                  ? styles.createdAt
                  : styles.createdAtNone
              }
            >
              {message.createdAt}
            </div>
            <div
              className={
                message.sender === sender
                  ? styles.chatComponentMe
                  : styles.chatComponent
              }
            >
              <p className={styles.sender}>{message.sender}</p>
              <div className={styles.chatWrap}>
                <div className={styles.profileBox}>
                  <img
                    src={profileImg}
                    alt='프로필 이미지'
                    className={styles.profile}
                  />
                </div>
                <div className={styles.message}>{message.message}</div>
              </div>
            </div>
          </div>
        ))}
        {currentMessages.map((message, i) => (
          <div>
            <div
              className={
                i > 0 && message.createdAt !== currentMessages[i - 1].createdAt
                  ? styles.createdAt
                  : styles.createdAtNone
              }
            >
              {message.createdAt}
            </div>
            <div
              className={
                message.sender === sender
                  ? styles.chatComponentMe
                  : styles.chatComponent
              }
            >
              <p className={styles.sender}>{message.sender}</p>
              <div className={styles.chatWrap}>
                <div className={styles.profileBox}>
                  <img
                    src={profileImg}
                    alt='프로필 이미지'
                    className={styles.profile}
                  />
                </div>
                <div className={styles.message}>{message.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
        <textarea
          type='text'
          value={chat}
          placeholder='메세지를 입력하세요.'
          onChange={e => setChat(e.target.value)}
        />
        <button
          type='submit'
          onClick={handleChatSubmit}
          className={styles.submitButton}
        >
          보내기
        </button>
      </form>
    </div>
  );
}

export default ChattingRoomPage;
