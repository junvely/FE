import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import LoadingSpinner from 'components/LoadingSpinner';
import {
  connectClient,
  disconnectClient,
  getChattingData,
  sendChat,
} from '../../apis/chatting';
import styles from './chatting.module.scss';
import bgImg from '../../assets/img/profileDefault.png';

function ChattingRoomPage() {
  const scrollRef = useRef();
  const param = useParams();
  const { roomId } = param;

  const { isLoading, isError, data } = useQuery('chatData', () =>
    getChattingData(roomId),
  );

  console.log(data && data);

  const [beforeMessages, setBeforeMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chat, setChat] = useState('');

  const sender = data && data.data.member;
  console.log('발신자!!!!!', sender);

  const handleChatSubmit = () => {
    if (!chat) {
      alert('메세지를 입력하세요.');
    } else {
      sendChat(roomId, sender, chat);
      setChat('');
    }
  };

  // 채팅 메세지 변환
  const jsonParseChat = chatData => {
    const newData = JSON.parse(chatData.body);
    setCurrentMessages(current => [...current, newData]);
    console.log('newData=> ', newData);
  };
  console.log('메세지들-----------------------------', beforeMessages);

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

  useEffect(() => {
    return () => {
      console.log('언마운트 시 연결 해제');
      disconnectClient();
    };
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {isError && <div>데이터 처리 중 ERROR가 발생하였습니다.</div>}
      <div className={styles.chatContainer} ref={scrollRef}>
        {beforeMessages.length === 0 && currentMessages.length === 0 && (
          <div className={styles.chatContainerNull}>
            <img src={bgImg} alt='배경 이미지' />
            <p className={styles.noneTitle}>{data && data.data.owner}</p>
            <p>{data && data.data.owner} 님과 채팅을 시작합니다.</p>
            <p className={styles.noneInfo}>
              Ohpick은 건강한 채팅 문화를 추구합니다.
            </p>
          </div>
        )}
        {beforeMessages &&
          beforeMessages.length !== 0 &&
          beforeMessages.map((message, i) => (
            <div>
              <div
                className={
                  i > 0 && message.createdAt === beforeMessages[i - 1].createdAt
                    ? styles.createdAtNone
                    : styles.createdAt
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
                      src={message.imageUrl}
                      alt='프로필 이미지'
                      className={styles.profile}
                    />
                  </div>
                  <div className={styles.message}>{message.message}</div>
                </div>
              </div>
            </div>
          ))}
        {currentMessages &&
          currentMessages.length !== 0 &&
          currentMessages.map((message, i) => (
            <div>
              <div
                className={
                  i > 0 &&
                  message.createdAt === currentMessages[i - 1].createdAt
                    ? styles.createdAtNone
                    : styles.createdAt
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
                      src={message.imageUrl}
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
