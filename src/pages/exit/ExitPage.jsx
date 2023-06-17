import React, { useState } from 'react';
import { deleteMembership } from 'apis/mypage';
import { useMutation } from 'react-query';
import { removeCookie } from 'utils/helpers/cookies';
import { useNavigate } from 'react-router';
import styles from './exit.module.scss';

function ExitPage() {
  const initialState = {
    password: '',
  };
  const [password, setPassword] = useState(initialState);
  const navigate = useNavigate();

  // 회원 탈퇴
  const mutationExitMembership = useMutation(deleteMembership, {
    onSuccess: result => {
      if (result === 200) {
        removeCookie();
        alert('탈퇴가 완료되었습니다.');
        navigate('/main');
      }
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'UnfinishedReservationExist') {
        alert('완료되지 않은 예약이 존재하여 회원탈퇴가 불가합니다.');
      }
      if (errorCode === 'MyPostUnfinishedReservationExist') {
        alert('나의 게시물에 완료되지 않은 예약이 있어 회원탈퇴가 불가합니다.');
      }
    },
  });

  // 회원 탈퇴 버튼
  const handleClickExitBtn = () => {
    mutationExitMembership.mutate({
      password,
    });
  };

  const handleInputChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      <div>
        <p className={styles.info}>
          회원 탈퇴를 원하시는 경우 <br></br>
          비밀번호를 한 번 더 입력해 주세요.
        </p>
        <input
          type='password'
          name='password'
          className={styles.password}
          placeholder='비밀번호를 입력해주세요.'
          onChange={handleInputChange}
        />
        <p className={styles.caution}>
          회원 탈퇴 시, 내 예약 정보 및 개인 정보가 모두 삭제됩니다.
        </p>
      </div>
      <div>
        <button
          type='button'
          className={styles.exitBtn}
          onClick={handleClickExitBtn}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default ExitPage;
