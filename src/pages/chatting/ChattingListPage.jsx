import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getChattingList } from 'apis/chatting';
import LoadingSpinner from 'components/LoadingSpinner';
import styles from './chatting.module.scss';
import rightArrow from '../../assets/svg/chatListRightArrow.svg';

function ChattingListPage() {
  const { isLoading, isError, data } = useQuery('chatList', getChattingList);

  return (
    <div className={styles.chatListContainer}>
      {isLoading && <LoadingSpinner />}
      {isError && <div>데이터 처리 중 ERROR가 발생하였습니다.</div>}
      {data && data.length === 0 && (
        <div>
          <div className={styles.noData}>생성된 채팅 방이 없습니다.</div>
        </div>
      )}
      {data &&
        data.length !== 0 &&
        data.map(list => (
          <Link to={`/chatting/room/${list.roomId}`} key={list.roomId}>
            {console.log(list)}
            <div className={styles.listWrap}>
              <div className={styles.listPhotoFrame}>
                <img src={list.postImage} alt='오피스이미지' />
              </div>
              <div className={styles.listContentWrap}>
                <div className={styles.listTextWrap}>
                  <div className={styles.listTitleWrap}>
                    <p className={styles.listTitle}>{list.title}</p>
                    <span>{list.createdAt}</span>
                  </div>
                  <p className={styles.chatListText}>{list.message}</p>
                </div>
                <img src={rightArrow} alt='오른쪽 화살표' />
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ChattingListPage;
