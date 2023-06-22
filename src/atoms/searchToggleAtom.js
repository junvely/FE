import { atom } from 'recoil';

const searchToggleState = atom({
  key: 'searchToggleState',
  default: false,
});

export default searchToggleState;
