const { atom } = require('recoil');

const editingState = atom({
  key: 'editingState',
  default: false,
});

export default editingState;
