import { atom } from 'recoil';

const searchQueryState = atom({
  key: 'searchQueryState',
  default: {
    page: 0,
    size: 10,
    keyword: '',
    sorting: '인기순',
    district: '',
  },
});

const isSearchedState = atom({
  key: 'isSearchedState',
  default: false,
});

export { searchQueryState, isSearchedState };
