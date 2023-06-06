import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { deleteWithdrawal, getMypage } from 'apis/mypage';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import useInput from 'hooks/useInput';
import styles from './mypage.module.scss';
import likeNullIcon from '../../assets/svg/likeNull.svg';
import officeIcon from '../../assets/svg/office.svg';
import reservationIcon from '../../assets/svg/reservation.svg';
import logoutIcon from '../../assets/svg/logout.svg';
import profileDefault from '../../assets/img/profileDefault.png';
import { AuthContext } from '../../contexts/AuthContext';
import { authLogout } from '../../apis/auth/login';
import { removeCookie } from '../../utils/cookies';

function Mypage() {
  const navigate = useNavigate();
  const { updateLoginStatus } = useContext(AuthContext);

  const mutationLogout = useMutation(authLogout, {
    onSuccess: () => {
      removeCookie();
      updateLoginStatus();
      alert('로그아웃 처리 되었습니다');
      navigate('/main');
    },
  });

  const initialState = {
    password: '',
  };
  const [password, setPassword] = useState(initialState);
  // 데이터 조회
  const { data, isLoading, isError } = useQuery('mypage', getMypage);

  // 회원 탈퇴
  const mutationWithdrawal = useMutation(deleteWithdrawal, {
    onSuccess: result => {
      if (result === 200) {
        removeCookie();
        alert('탈퇴가 완료되었습니다.');
        navigate('/main');
      }
    },
    onError: error => {
      alert('탈퇴가 완료되지 않았습니다. 다시 시도해주세요.');
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;

  const { email, imageUrl, likeCount, nickname, postCount, reserveCount } =
    data.data;

  // 로그아웃 버튼
  const handleClickLogoutBtn = () => {
    mutationLogout.mutate();
  };

  // 회원 탈퇴 버튼
  const handleClickWithdrawal = () => {
    mutationWithdrawal.mutate({
      password,
    });
  };

  const handleInputChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.profile}>
          <h2 className={styles.title}>내 정보</h2>
          <div className={styles.profileBox}>
            <div className={styles.photoFrame}>
              <img src={imageUrl || profileDefault} alt='프로필사진' />
            </div>
            <div className={styles.profileText}>
              <p className={styles.nickname}>{nickname}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>
        <div className={styles.linkBox}>
          <div>
            <Link to='/likedposts'>
              <h2 className={styles.title}>
                <img src={likeNullIcon} alt='좋아요 아이콘' />
                좋아요
                <span className={styles.count}>{likeCount}</span>
              </h2>
            </Link>
          </div>
          <div>
            <Link to='/myposts'>
              <h2 className={styles.title}>
                <img src={officeIcon} alt='나의 오피스 아이콘' />
                나의 오피스 <span className={styles.count}>{postCount}</span>
              </h2>
            </Link>
          </div>
          <div>
            <Link to='/myreservations'>
              <h2 className={styles.title}>
                <img src={reservationIcon} alt='예약현황 아이콘' />
                예약현황 <span className={styles.count}>{reserveCount}</span>
              </h2>
            </Link>
          </div>
          <div>
            <button
              type='button'
              className={styles.title}
              onClick={handleClickLogoutBtn}
            >
              <img src={logoutIcon} alt='로그아웃 아이콘' />
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <button
        type='button'
        className={styles.withdrawal}
        onClick={handleClickWithdrawal}
      >
        <h2>회원탈퇴</h2>
      </button>
      <input
        type='password'
        name='password'
        placeholder='탈퇴하시려면 비밀번호를 입력해주세요.'
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Mypage;
