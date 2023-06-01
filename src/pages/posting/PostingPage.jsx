import PostInput from 'components/PostInput';
import { useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import { useState } from 'react';
import styles from './posting.module.scss';
import AddImageIcon from '../../assets/svg/addImage.svg';
import RightArrow from '../../assets/svg/addressArrow.svg';
import SearchLocationPage from '../searchLocation/SearchLocationPage';

function PostingPage() {
  const navigate = useNavigate();
  const initialState = {
    title: '',
    price: '',
    capacity: '',
    content: '',
    operatingTime: '',
    contentDetails: ' ',
    amenities: '',
    image: '',
  };
  const [form, handleFormChange, handleImageUpload, resetForm] =
    useForm(initialState);
  const [location, setLocation] = useState('주소를 입력해주세요');

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const handleClickLocationOpen = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  const locationSave = keyword => {
    setLocation(keyword);
  };

  console.log(location);

  return (
    <>
      <div className={styles.wrap}>
        <PostInput
          type='text'
          name='title'
          value={form.title}
          label='글 제목'
          placeHolder='글 제목을 입력해 주세요'
          onChange={handleFormChange}
        ></PostInput>
        <div className={`${styles.inputCon} ${styles.address}`}>
          <span type='button'>주소</span>
          <button
            type='button'
            name='content'
            onClick={handleClickLocationOpen}
          >
            {location}
            <img src={RightArrow} alt='address' />
          </button>
        </div>
        <PostInput
          type='text'
          name='price'
          value={form.price}
          label='가격'
          placeHolder='ex. 50000'
          onChange={handleFormChange}
        ></PostInput>
        <PostInput
          type='text'
          name='capacity'
          value={form.capacity}
          label='최대 인원'
          placeHolder='수용 가능한 인원을 작성해 주세요'
          onChange={handleFormChange}
        ></PostInput>
        <div className={styles.inputCon}>
          <span>오피스 소개</span>
          <textarea
            name='content'
            placeholder='오피스 공간에 대해 소개해 주세요'
            onChange={handleFormChange}
          >
            {form.content}
          </textarea>
        </div>
        <PostInput
          type='text'
          name='operatingTime'
          value={form.operatingTime}
          label='운영 시간'
          placeHolder='ex. 월-금 8시-18시'
          onChange={handleFormChange}
        ></PostInput>
        <div className={styles.inputCon}>
          <span>추가 안내</span>
          <textarea
            name='contentDetails'
            placeholder='사용 가능 시간, 환불 규정 등'
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className={styles.inputCon}>
          <span>편의 시설</span>
          <textarea
            name='amenities'
            placeholder='ex. 에어컨, 복사/인쇄기, 프로젝터 등'
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className={styles.inputCon}>
          <span>이미지 등록</span>
          <button type='button' className={styles.addImage}>
            <img src={AddImageIcon} alt='add' />
          </button>
        </div>
        <button type='button' className={styles.button}>
          작성 완료
        </button>
      </div>
      <div
        className={`${styles.locationCon} ${
          isLocationOpen ? styles.slide : ''
        }`}
      >
        <SearchLocationPage
          locationOpen={handleClickLocationOpen}
          locationSave={locationSave}
        />
      </div>
    </>
  );
}

export default PostingPage;
