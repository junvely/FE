import PostInput from 'components/PostInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import useForm from 'hooks/useForm';
import { postAddPost } from 'apis/posts';
import { getPostDetail } from 'apis/detail';
import { useRecoilState } from 'recoil';
import editingState from 'recoil/atom';
import uuid from 'react-uuid';
import SearchLocationPage from '../searchLocation/SearchLocationPage';
import SelectOptions from '../../components/SelectOptions';
import OperatingTime from './OperatingTime';
import styles from './posting.module.scss';
import AddImageIcon from '../../assets/svg/addImage.svg';
import RightArrow from '../../assets/svg/addressArrow.svg';
import IncreaseIcon from '../../assets/svg/increase.svg';
import DecreaseIcon from '../../assets/svg/decrease.svg';
import XBoxIcon from '../../assets/svg/xBox.svg';

function PostingPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('주소를 입력해주세요');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationValue = useLocation();
  const { postId } = { ...locationValue.state };
  const [isEditing, setIsEditing] = useRecoilState(editingState);

  // 운영 시간
  const initialTime = {
    hour: '00',
    minute: '00',
  };
  const [openTime, setOpenTime] = useState(initialTime);
  const [closeTime, setCloseTime] = useState(initialTime);

  // 휴무 옵션/체크리스트
  const holidayTypes = ['매주', '격주', '매월'];
  const [holidayType, setHolidayType] = useState(holidayTypes[0]);
  const [holidays, setHolidays] = useState([
    {
      key: 'isMon',
      label: '월',
      checked: false,
    },
    {
      key: 'isTue',
      label: '화',
      checked: false,
    },
    {
      key: 'isWed',
      label: '수',
      checked: false,
    },
    {
      key: 'isThu',
      label: '목',
      checked: false,
    },
    {
      key: 'isFri',
      label: '금',
      checked: false,
    },
    {
      key: 'isSat',
      label: '토',
      checked: false,
    },
    {
      key: 'isSun',
      label: '일',
      checked: false,
    },
  ]);

  // setAmenityList(prevAmenityList => {
  //   const updatedAmenityList = { ...prevAmenityList };
  //   Object.keys(updatedAmenityList).forEach(key => {
  //     updatedAmenityList[key].checked = server[key].checked; // 변경하고자 하는 값을 여기에 설정
  //   });
  //   return updatedAmenityList;
  // });

  // 최대 인원
  const [persons, setPersons] = useState(0);

  // 편의시설 체크리스트
  const [amenityList, setAmenityList] = useState([
    {
      key: 'isAircon',
      label: '에어컨',
      checked: false,
    },
    {
      key: 'isCopierPrinter',
      label: '복사/인쇄기',
      checked: false,
    },
    {
      key: 'isProjector',
      label: '프로젝터',
      checked: false,
    },
    {
      key: 'isDoorLock',
      label: '도어락',
      checked: false,
    },
    {
      key: 'isPowerOutlet',
      label: '콘센트',
      checked: false,
    },
    {
      key: 'isFax',
      label: '팩스',
      checked: false,
    },
    {
      key: 'isHeater',
      label: '난방기',
      checked: false,
    },
    {
      key: 'isParking',
      label: '주차',
      checked: false,
    },
    {
      key: 'isWaterPurifier',
      label: '정수기',
      checked: false,
    },
    {
      key: 'isPersonalLocker',
      label: '개인락커',
      checked: false,
    },
    {
      key: 'isTV',
      label: 'TV',
      checked: false,
    },
    {
      key: 'isWhiteBoard',
      label: '화이트보드',
      checked: false,
    },
    {
      key: 'isInternetWiFi',
      label: '인터넷/WIFI',
      checked: false,
    },
  ]);

  // 포스팅 입력폼 전체
  const initialState = {
    title: '',
    price: '',
    content: '',
    contentDetails: ' ',
    image: '',
  };

  const [form, handleFormChange, handleImageUpload, resetForm, setForm] =
    useForm(initialState);
  const [preImageUrl, setPreImageUrl] = useState();
  const { title, price, content, contentDetails, image } = form;

  // 수정 할 데이터 가져오기
  const { data, isLoading, isError } = useQuery(
    'postDetail',
    () => getPostDetail(postId),
    {
      onSuccess: response => {
        console.log('데이터 가져옴!! ', response.data);
        setForm(response.data);
      },
      enabled: isEditing,
    },
  );

  const mutation = useMutation(postAddPost, {
    onSuccess: () => {
      alert('포스팅 성공');
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
    if (persons > 0) {
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

  const handleChangeImageUpload = async e => {
    await handleImageUpload(e);
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
    if (!image) {
      alert('사진을 선택해 주세요');
      return false;
    }
    return true;
  };

  const handleClickSubmitPosting = () => {
    const operatingTimeData = getOperatingTime();
    const amenitiesData = getAmenities();

    console.log('operatingTimeData', operatingTimeData, amenitiesData);
    if (validation()) {
      mutation.mutate({
        title,
        price: Number(form.price),
        capacity: Number(persons),
        content: content.replace(/\n/g, '\\n'),
        contentDetails: contentDetails.replace(/\n/g, '\\n'),
        amenities: amenitiesData,
        operatingTime: operatingTimeData,
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

  useEffect(() => {
    if (isEditing) {
      setLocation(location || '주소를 입력해주세요');
    } else {
      setLocation('주소를 입력해주세요');
    }
  }, [isEditing, data]);

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
            <div className={styles.timeCon}>
              <OperatingTime time={openTime} setTime={setOpenTime} />
              <span>~</span>
              <OperatingTime time={closeTime} setTime={setCloseTime} />
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
              {holidays.map(day => (
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
            value={contentDetails}
            placeholder='사용 가능 시간, 환불 규정 등'
            onChange={handleFormChange}
          />
        </div>
        {/* 편의 시설 */}
        <div className={styles.amenity}>
          <span className={styles.title}>편의 시설</span>
          <div className={styles.amenities}>
            {amenityList.map(amenity => (
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
          <span>이미지 등록</span>
          <label htmlFor='image' className={styles.addImage}>
            {preImageUrl ? (
              <>
                <img
                  src={preImageUrl}
                  alt='preview'
                  className={styles.preImageUrl}
                />
                <button
                  type='button'
                  className={styles.imgDelete}
                  onClick={() => console.log('delete')}
                >
                  <img src={XBoxIcon} alt='img-delete' />
                </button>
              </>
            ) : (
              <img src={AddImageIcon} alt='preview' />
            )}
            <input
              type='file'
              name='image'
              id='image'
              onChange={e => handleChangeImageUpload(e)}
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
