import { useState } from 'react';

const useInput = () => {
  const [state, setState] = useState();

  const handleInputChange = e => {
    setState(e.target.value);
  };

  const valueChange = value => {
    setState(value);
  };

  const resetState = () => {
    setState('');
  };

  return [state, handleInputChange, valueChange, resetState];
};

export default useInput;
