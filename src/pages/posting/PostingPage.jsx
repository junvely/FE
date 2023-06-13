import PostInput from 'components/PostInput';
import { useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { postAddPost } from 'apis/posts';
import styles from './posting.module.scss';
import AddImageIcon from '../../assets/svg/addImage.svg';
import RightArrow from '../../assets/svg/addressArrow.svg';
import SearchLocationPage from '../searchLocation/SearchLocationPage';
import IncreaseIcon from '../../assets/svg/increase.svg';
import DecreaseIcon from '../../assets/svg/decrease.svg';

function PostingPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('주소를 입력해주세요');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [persons, setPersons] = useState(0);

  const initialState = {
    title: '',
    price: '',
    content: '',
    operatingTime: '',
    contentDetails: ' ',
    amenities: '',
    image: '',
  };

  const [form, handleFormChange, handleImageUpload, resetForm] =
    useForm(initialState);

  const [preImageUrl, setPreImageUrl] = useState();

  const {
    title,
    price,
    content,
    operatingTime,
    contentDetails,
    amenities,
    image,
  } = form;

  const mutation = useMutation(postAddPost, {
    onSuccess: result => {
      alert('포스팅 성공');
      resetForm();
      navigate('/main');
    },
    onError: error => {
      alert('서버 에러 발생 : 포스팅 실패', error.msg);
    },
  });

  const saveLocation = keyword => {
    setLocation(keyword);
  };

  const handleIncrease = () => {
    if (persons < 50) {
      setPersons(Number(persons) + 1);
    }
  };
  const handleDecrease = () => {
    if (persons > 0) {
      setPersons(Number(persons) - 1);
    }
  };

  const handleClickLocationOpen = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  const handleChangeImageUploadBtn = async e => {
    await handleImageUpload(e);
  };

  const validation = () => {
    const NumCheck = /^[0-9]+$/;
    if (
      !title ||
      !price ||
      !content ||
      !operatingTime ||
      !contentDetails ||
      !amenities
    ) {
      alert('입력란을 모두 작성해 주셔야 합니다');
      return false;
    }
    if (!persons) {
      alert('인원을 확인해 주세요');
      return false;
    }
    if (!NumCheck.test(price)) {
      alert('가격은 숫자로만 입력해 주세요');
      return false;
    }
    if (!image) {
      alert('사진을 선택해 주세요');
      return false;
    }
    return true;
  };

  const handleClickSubmitPosting = () => {
    if (validation()) {
      mutation.mutate({
        title,
        price: Number(form.price),
        capacity: Number(persons),
        content: content.replace(/\n/g, '\\n'),
        contentDetails: contentDetails.replace(/\n/g, '\\n'),
        amenities: amenities.replace(/\n/g, '\\n'),
        operatingTime,
        image,
        location,
      });
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(form.image);
      reader.onload = () => {
        setPreImageUrl(reader.result);
      };
      console.log(form.image);
    }
  }, [image]);
  console.log(persons);
  return (
    <>
      <div className={styles.wrap}>
        <PostInput
          type='text'
          name='title'
          value={title}
          label='글 제목'
          placeHolder='글 제목을 입력해 주세요'
          max='50'
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
          value={price}
          label='가격/일'
          placeHolder='ex. 50000'
          max='9'
          onChange={handleFormChange}
        ></PostInput>
        <div className={styles.capacity}>
          <span>최대 인원</span>
          <div className={styles.persons}>
            <button type='button' onClick={handleDecrease}>
              <img src={DecreaseIcon} alt='decrease' />
            </button>
            <input
              type='text'
              value={persons}
              maxLength='2'
              onChange={e => setPersons(e.target.value)}
            />
            <button type='button' onClick={handleIncrease}>
              <img src={IncreaseIcon} alt='increase' />
            </button>
          </div>
        </div>
        <div className={styles.inputCon}>
          <span>오피스 소개</span>
          <textarea
            name='content'
            placeholder='오피스 공간에 대해 소개해 주세요'
            onChange={handleFormChange}
          >
            {content}
          </textarea>
        </div>
        <PostInput
          type='text'
          name='operatingTime'
          value={operatingTime}
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
          <label htmlFor='image' className={styles.addImage}>
            <img src={preImageUrl || AddImageIcon} alt='preview' />
            <input
              type='file'
              name='image'
              id='image'
              onChange={e => handleChangeImageUploadBtn(e)}
              className='hidden'
            />
          </label>
        </div>
        <button
          type='button'
          className={styles.button}
          onClick={handleClickSubmitPosting}
        >
          작성 완료
        </button>
      </div>
      <div
        className={`${styles.locationCon} ${isLocationOpen && styles.slide}`}
      >
        <SearchLocationPage
          locationOpen={handleClickLocationOpen}
          saveLocation={saveLocation}
        />
      </div>
    </>
  );
}

export default PostingPage;
