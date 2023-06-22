const { atom } = require('recoil');

const isScrollTopState = atom({
  key: 'isScrollTopState',
  default: false,
});

const scrollTopClikedState = atom({
  key: 'scrollTopClikedState',
  default: false,
});

export { isScrollTopState, scrollTopClikedState };
