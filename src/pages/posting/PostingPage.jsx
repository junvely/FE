import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import useForm from 'hooks/useForm';
import { postAddPost, putEditPost } from 'apis/posts';
import getPostDetail from 'apis/detail';
import PostInput from 'components/PostInput';
import OperatingTime from './OperatingTime';
import SearchLocationPage from '../searchLocation/SearchLocationPage';
import SelectOptions from '../../components/SelectOptions';
import styles from './posting.module.scss';
import AddImageIcon from '../../assets/svg/addImage.svg';
import RightArrow from '../../assets/svg/addressArrow.svg';
import IncreaseIcon from '../../assets/svg/increase.svg';
import DecreaseIcon from '../../assets/svg/decrease.svg';
import XBoxIcon from '../../assets/svg/xBox.svg';
import {
  amenityCheckList,
  holidayCheckList,
  holidayTypes,
  initialCloseTime,
  initialOpenTime,
  initialState,
} from '../../utils/constants/constants';

function PostingPage() {
  const navigate = useNavigate();
  const path = useLocation();
  const param = useParams();
  const { postId } = param;
  const editMode = path.pathname.startsWith('/edit');

  // 주소
  const [location, setLocation] = useState('주소를 입력해주세요');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  // 운영 시간
  const [openTime, setOpenTime] = useState(initialOpenTime);
  const [closeTime, setCloseTime] = useState(initialCloseTime);
  // 휴무 옵션/체크리스트
  const [holidayType, setHolidayType] = useState(holidayTypes[0]);
  const [holidays, setHolidays] = useState(holidayCheckList);
  // 최대 인원
  const [persons, setPersons] = useState(1);
  // 편의시설 체크리스트
  const [amenityList, setAmenityList] = useState(amenityCheckList);
  // 포스팅 폼
  const [form, handleFormChange, resetForm, setForm] = useForm(initialState);
  const [imageList, setImageList] = useState([]);
  const { title, price, content, contentDetails } = form;

  // 수정 할 데이터 가져오기
  const { data, isLoading, isError } = useQuery(
    'postDetail',
    () => getPostDetail(postId),
    {
      onSuccess: response => {
        setForm(response.data);
        setLocation(response.data.location);
        setPersons(response.data.capacity);
        setImageList(response.data.imageUrl);
        setHolidayType(response.data.operatingTime.holidayTypes);
      },
      enabled: editMode,
    },
  );

  const mutation = useMutation(postAddPost, {
    onSuccess: () => {
      alert('포스팅 성공');
      resetForm();
      navigate('/main');
    },
    onError: error => {
      if (error.message === 'Maximum upload size exceeded') {
        alert('이미지 용량 사이즈를 초과하였습니다!');
      } else {
        alert('서버 에러 발생 : 포스팅 실패', error.msg);
      }
    },
  });

  const mutationEdit = useMutation(putEditPost, {
    onSuccess: () => {
      alert('포스팅 수정 완료');
      resetForm();
      navigate('/main');
    },
    onError: error => {
      alert('서버 에러 발생 : 포스팅 실패', error.msg);
    },
  });

  const handleClickLocationOpen = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  const saveLocation = keyword => {
    setLocation(keyword);
  };

  const handleIncrease = () => {
    if (persons < 99) {
      setPersons(Number(persons) + 1);
    }
  };
  const handleDecrease = () => {
    if (persons > 1) {
      setPersons(Number(persons) - 1);
    }
  };

  const handleHolidayUpdate = e => {
    const { name, checked } = e.target;
    const newHoliday = holidays.map(day => {
      if (day.key === name) {
        return {
          ...day,
          checked,
        };
      }
      return day;
    });
    setHolidays(newHoliday);
  };

  const handleAmenitiesUpdate = e => {
    const { name, checked } = e.target;
    const newAmenityList = amenityList.map(amenity => {
      if (amenity.key === name) {
        return {
          ...amenity,
          checked,
        };
      }
      return amenity;
    });
    setAmenityList(newAmenityList);
  };

  // 운영 시간 데이터 형식 가공
  const getOperatingTime = () => {
    const newHolidaysData = {};
    holidays.forEach(day => {
      newHolidaysData[day.key] = day.checked;
    });

    const newOperatingTime = {
      openTime: openTime.hour + openTime.minute,
      closeTime: closeTime.hour + closeTime.minute,
      holidayTypes: holidayType,
      holidays: newHolidaysData,
    };

    return newOperatingTime;
  };

  // 편의 시설 데이터 형식 가공
  const getAmenities = () => {
    const newAmenitiesData = {};
    amenityList.forEach(amenity => {
      newAmenitiesData[amenity.key] = amenity.checked;
    });

    return newAmenitiesData;
  };

  const validation = () => {
    const numCheck = /^[0-9]+$/;
    if (!title || !price || !content || !contentDetails) {
      alert('입력란을 모두 작성해 주셔야 합니다');
      return false;
    }
    if (
      !numCheck.test(price) ||
      !numCheck.test(persons) ||
      !numCheck.test(openTime.hour) ||
      !numCheck.test(openTime.minute) ||
      !numCheck.test(closeTime.hour) ||
      !numCheck.test(closeTime.minute)
    ) {
      alert('가격, 인원, 운영 시간은 숫자로 입력해 주세요');
      return false;
    }
    if (!imageList.length) {
      alert('사진을 선택해 주세요');
      return false;
    }
    return true;
  };

  const handleClickSubmitPosting = () => {
    const operatingTimeData = getOperatingTime();
    const amenitiesData = getAmenities();

    if (validation()) {
      mutation.mutate({
        title,
        price: Number(form.price),
        capacity: Number(persons),
        content: content.replace(/\n/g, '\\n'),
        contentDetails: contentDetails.replace(/\n/g, '\\n'),
        amenities: amenitiesData,
        operatingTime: operatingTimeData,
        imageList,
        location,
      });
    }
  };

  const handleClickEditPosting = () => {
    const operatingTimeData = getOperatingTime();
    const amenitiesData = getAmenities();

    if (validation()) {
      alert('준비중인 기능입니다.');
      navigate('/main');
      // mutationEdit.mutate({
      //   postId,
      //   title,
      //   price: Number(form.price),
      //   capacity: Number(persons),
      //   content: content.replace(/\n/g, '\\n'),
      //   contentDetails: contentDetails.replace(/\n/g, '\\n'),
      //   amenities: amenitiesData,
      //   operatingTime: operatingTimeData,
      //   imageList,
      //   location,
      // });
    }
  };

  // 멀티 이미지 업로드
  const handleChangeImageUpload = e => {
    if (imageList.length >= 3) {
      alert('최대 3장의 이미지만 업로드 할 수 있습니다.');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const newImage = {
        imageURL: reader.result,
        file,
      };

      setImageList([...imageList, newImage]);
    };
  };

  // 이미지 삭제
  const handleImageDelete = idx => {
    const deletedImageList = imageList.filter(
      (image, listIndex) => listIndex !== idx,
    );
    setImageList(deletedImageList);
  };

  // 수정할 데이터
  const editAmenityList = amenityCheckList.map(item => {
    return { ...item, checked: data && data.data.amenities[item.key] };
  });

  const editOpenTime = {
    hour: data && data.data.operatingTime.openTime.slice(0, 2),
    minute: data && data.data.operatingTime.openTime.slice(2, 4),
  };

  const editCloseTime = {
    hour: data && data.data.operatingTime.closeTime.slice(0, 2),
    minute: data && data.data.operatingTime.closeTime.slice(2, 4),
  };

  const editHolidayList = holidayCheckList.map(item => {
    return {
      ...item,
      checked: data && data.data.operatingTime.holidays[item.key],
    };
  });

  return (
    <>
      <div className={styles.wrap}>
        <PostInput
          type='text'
          name='title'
          value={title}
          label='글 제목'
          placeHolder='글 제목을 입력해 주세요'
          max='35'
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
            placeholder='오피스 공간에 대해 소개해 주세요(255자)'
            maxLength='255'
            onChange={handleFormChange}
            value={content}
          />
        </div>
        {/* 운영 시간 */}
        <div className={styles.operatingTime}>
          <span className={styles.title}>운영 시간</span>
          <div className={styles.operatingCon}>
            <div className={styles.timeCon}>
              <OperatingTime
                time={editMode ? editOpenTime : openTime}
                setTime={setOpenTime}
              />
              <span>~</span>
              <OperatingTime
                time={editMode ? editCloseTime : closeTime}
                setTime={setCloseTime}
              />
            </div>
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
              {(editMode ? editHolidayList : holidays).map(day => (
                <label
                  htmlFor={day.key}
                  // key={uuid()}
                  className={`${styles.checkbox} ${
                    day.checked ? styles.checked : undefined
                  }`}
                >
                  <input
                    type='checkbox'
                    name={day.key}
                    id={day.key}
                    onChange={handleHolidayUpdate}
                  />
                  {day.label}
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
            placeholder='오피스 공간에 대해 소개해 주세요(255자)'
            value={contentDetails}
            maxLength='255'
            onChange={handleFormChange}
          />
        </div>
        {/* 편의 시설 */}
        <div className={styles.amenity}>
          <span className={styles.title}>편의 시설</span>
          <div className={styles.amenities}>
            {(editMode ? editAmenityList : amenityList).map(amenity => (
              <label
                htmlFor={amenity.key}
                className={`${styles.checkbox} ${
                  amenity.checked ? styles.checked : undefined
                }`}
              >
                <input
                  type='checkbox'
                  name={amenity.key}
                  id={amenity.key}
                  onChange={handleAmenitiesUpdate}
                />
                {amenity.label}
              </label>
            ))}
          </div>
        </div>
        {/* 이미지 등록 */}
        <div className={styles.inputCon}>
          <span>이미지 등록 {`(${imageList.length}/3)`}</span>
          <div className={styles.labelWrap}>
            {imageList.map((img, idx) => (
              <div className={styles.addImage}>
                <img
                  src={(imageList && img.imageURL) || imageList[idx]}
                  alt='preview'
                  className={styles.imagePreview}
                />
                <button
                  type='button'
                  className={styles.imgDelete}
                  onClick={() => handleImageDelete(idx)}
                >
                  <img src={XBoxIcon} alt='img-delete' />
                </button>
              </div>
            ))}
            {imageList.length < 3 && (
              <label htmlFor='imgUpload' className={styles.addImage}>
                <img src={AddImageIcon} alt='preview' />
                <input
                  type='file'
                  name='imgUpload'
                  id='imgUpload'
                  onChange={e => handleChangeImageUpload(e)}
                  className='hidden'
                  accept='image/*'
                />
              </label>
            )}
          </div>
        </div>
        <button
          type='button'
          className={styles.button}
          onClick={editMode ? handleClickEditPosting : handleClickSubmitPosting}
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
