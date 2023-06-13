import PostInput from 'components/PostInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import useForm from 'hooks/useForm';
import { postAddPost } from 'apis/posts';
import uuid from 'react-uuid';
import styles from './posting.module.scss';
import AddImageIcon from '../../assets/svg/addImage.svg';
import RightArrow from '../../assets/svg/addressArrow.svg';
import SearchLocationPage from '../searchLocation/SearchLocationPage';
import IncreaseIcon from '../../assets/svg/increase.svg';
import DecreaseIcon from '../../assets/svg/decrease.svg';
import SelectOptions from '../../components/SelectOptions';

function PostingPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('주소를 입력해주세요');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // 운영 시간 옵션
  const openTimes = ['06 : 00', '07 : 00', '08 : 00', '09 : 00'];
  const closeTimes = ['18 : 00', '19 : 00', '20 : 00', '21 : 00'];
  const [openTime, setOpenTime] = useState(openTimes[0]);
  const [closeTime, setCloseTime] = useState(closeTimes[0]);

  // 휴무 옵션
  const holidayTypes = ['매주', '격주', '매월'];
  const [holidayType, setHolidayType] = useState(holidayTypes[0]);
  const [holidays, setHolidays] = useState({
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
    일: false,
  });

  // 최대 인원
  const [persons, setPersons] = useState(0);

  // 편의시설
  const [amenityTypes, setAmenityTypes] = useState({
    에어컨: false,
    '복사/인쇄기': false,
    프로젝터: false,
    도어락: false,
    콘센트: false,
    팩스: false,
    난방기: false,
    주차: false,
    정수기: false,
    개인락커: false,
    TV: false,
    화이트보드: false,
    '인터넷/WIFI': false,
  });

  const initialState = {
    title: '',
    price: '',
    content: '',
    contentDetails: ' ',
    amenities: '',
    image: '',
  };

  const [form, handleFormChange, handleImageUpload, resetForm] =
    useForm(initialState);
  const [preImageUrl, setPreImageUrl] = useState();
  const { title, price, content, contentDetails, amenities, image } = form;

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

  const handleClickLocationOpen = () => {
    setIsLocationOpen(!isLocationOpen);
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

  const handleHolidayUpdate = e => {
    const { name, checked } = e.target;
    const newHoliday = { ...holidays, [name]: checked };
    setHolidays(newHoliday);
  };

  const handleAmenityTypesUpdate = e => {
    const { name, checked } = e.target;
    const newAmenityTypes = { ...amenityTypes, [name]: checked };
    setAmenityTypes(newAmenityTypes);
  };

  const handleChangeImageUploadBtn = async e => {
    await handleImageUpload(e);
  };

  const validation = () => {
    const NumCheck = /^[0-9]+$/;
    if (!title || !price || !content || !contentDetails) {
      alert('입력란을 모두 작성해 주셔야 합니다');
      return false;
    }
    if (!persons) {
      alert('인원을 확인해 주세요');
      return false;
    }
    if (!NumCheck.test(price)) {
      alert('가격은 숫자만 입력해 주세요');
      return false;
    }
    if (!image) {
      alert('사진을 선택해 주세요');
      return false;
    }
    return true;
  };

  // 운영 시간 데이터 가공
  const getOperatingTime = () => {
    let holidayString = `운영 시간은 ${openTime} ~ ${closeTime}시 까지 입니다. \n휴무일은 `;
    const holidaysArr = Object.keys(holidays).filter(key => holidays[key]);

    if (holidaysArr.length) {
      holidayString += `${holidayType} `;
      holidaysArr.forEach(value => {
        holidayString += `${value}요일 `;
      });
      holidayString += '입니다.';
      return holidayString;
    }
    holidayString += '연중무휴 입니다.';
    return holidayString;
  };

  // 편의 시설 데이터 가공
  const getAmenities = () => {
    let amenityString = '편의시설은 ';
    const amenitiesArr = Object.keys(amenityTypes).filter(
      key => amenityTypes[key],
    );

    if (amenitiesArr.length) {
      amenitiesArr.forEach(value => {
        amenityString += `${value}, `;
      });
      amenityString += '등이 구비되어 있습니다.';
      return amenityString;
    }
    amenityString += '따로 구비되어 있지 않습니다.';
    return amenityString;
  };

  const handleClickSubmitPosting = () => {
    const operatingTimeValue = getOperatingTime();
    const amenitiesValue = getAmenities();

    if (validation()) {
      mutation.mutate({
        title,
        price: Number(form.price),
        capacity: Number(persons),
        content: content.replace(/\n/g, '\\n'),
        contentDetails: contentDetails.replace(/\n/g, '\\n'),
        amenities: amenitiesValue,
        operatingTime: operatingTimeValue,
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
    }
  }, [image]);

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
        {/* 주소 */}
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
        {/* 가격 */}
        <PostInput
          type='text'
          name='price'
          value={price}
          label='가격/일'
          placeHolder='ex. 50000'
          max='9'
          onChange={handleFormChange}
        ></PostInput>
        {/* 최대 인원 */}
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
        {/* 오피스 소개 */}
        <div className={styles.inputCon}>
          <span>오피스 소개</span>
          <textarea
            name='content'
            placeholder='오피스 공간에 대해 소개해 주세요'
            onChange={handleFormChange}
            value={content}
          />
        </div>
        {/* 운영 시간 */}
        <div className={styles.operatingTime}>
          <span className={styles.title}>운영 시간</span>
          <div className={styles.operatingCon}>
            <SelectOptions
              options={openTimes}
              selected={openTime}
              selectedUpdate={setOpenTime}
            />
            <span>~</span>
            <SelectOptions
              options={closeTimes}
              selected={closeTime}
              selectedUpdate={setCloseTime}
            />
          </div>
          <p className={styles.holidayTitle}>
            *휴무일에 체크해 주세요<span>(연중무휴 경우 체크 x)</span>
          </p>
          <div className={styles.holidayCon}>
            <SelectOptions
              options={holidayTypes}
              selected={holidayType}
              selectedUpdate={setHolidayType}
            />
            <div className={styles.selectDays}>
              {[...Object.keys(holidays)].map(day => (
                <label
                  htmlFor={day}
                  // key={uuid()}
                  className={`${styles.checkbox} ${
                    holidays[day] ? styles.checked : undefined
                  }`}
                >
                  <input
                    type='checkbox'
                    name={day}
                    id={day}
                    onChange={handleHolidayUpdate}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* 추가 안내 */}
        <div className={styles.inputCon}>
          <span>추가 안내</span>
          <textarea
            name='contentDetails'
            placeholder='사용 가능 시간, 환불 규정 등'
            onChange={handleFormChange}
          />
        </div>
        {/* 편의 시설 */}
        <div className={styles.amenity}>
          <span className={styles.title}>편의 시설</span>
          <div className={styles.amenities}>
            {[...Object.keys(amenityTypes)].map(item => (
              <label
                htmlFor={item}
                className={`${styles.checkbox} ${
                  amenityTypes[item] ? styles.checked : undefined
                }`}
              >
                <input
                  type='checkbox'
                  name={item}
                  id={item}
                  onChange={handleAmenityTypesUpdate}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        {/* 이미지 등록 */}
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
