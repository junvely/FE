import React from 'react';
import styles from './exit.module.scss';

function ExitPage() {
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
          id='password'
          className={styles.password}
        />
        <p className={styles.caution}>
          회원 탈퇴 시, 내 예약 정보 및 개인 정보가 모두 삭제됩니다.
        </p>
      </div>
      <div>
        <button type='button' className={styles.exitBtn}>
          완료
        </button>
      </div>
    </div>
  );
}

export default ExitPage;
