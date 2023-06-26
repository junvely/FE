import { useState } from 'react';
import { deleteMembership } from 'apis/mypage';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styles from './exit.module.scss';
import useAuth from '../../hooks/useAuth';

function ExitPage() {
  const { logout } = useAuth();
  const initialState = {
    password: '',
  };
  const [password, setPassword] = useState(initialState);
  const navigate = useNavigate();

  // 회원 탈퇴
  const mutationExitMembership = useMutation(deleteMembership, {
    onSuccess: result => {
      if (result === 200) {
        logout('회원 탈퇴');
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
      if (errorCode === 'InvalidToken') {
        alert('토큰이 만료됐거나 유효하지 않습니다.');
      }
      if (errorCode === 'WrongPassword') {
        alert('비밀번호를 확인해주세요.');
      }
      if (errorCode === 'Error') {
        alert('탈퇴가 완료되지 않았습니다. 다시 시도해주세요.');
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
        <p className={styles.kakaoExit}>
          카카오 로그인의 경우, 비밀번호 대신 이메일 앞에{' '}
        </p>
        <p className={styles.kakaoExit}>
          &apos;kakao_&apos;를 붙여주세요. ex) kakao_email@email.com
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
