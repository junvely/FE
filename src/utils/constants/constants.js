// [MainPage]
export const sortingList = [
  '인기순',
  '최신 순',
  '낮은 가격 순',
  '높은 가격 순',
];

// [SearchBar]
export const locations = [
  '전체',
  '서울',
  '경기',
  '인천',
  '강원',
  '충남',
  '대전',
  '충북',
  '세종',
  '부산',
  '울산',
  '대구',
  '경북',
  '경남',
  '전남',
  '광주',
  '전북',
  '제주',
];

// [PostingPage]
// 포스팅 입력폼
export const initialState = {
  title: '',
  price: '',
  content: '',
  contentDetails: ' ',
  imageList: '',
};
// 운영시간
export const initialOpenTime = {
  hour: '00',
  minute: '00',
};
export const initialCloseTime = {
  hour: '24',
  minute: '00',
};
// 휴일
export const holidayTypes = ['매주', '격주', '매월'];
export const holidayCheckList = [
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
];

export const amenityCheckList = [
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
];
