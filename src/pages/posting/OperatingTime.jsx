function OperatingTime({ time, setTime }) {
  const handleGetTime = e => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
  };

  return (
    <div>
      <label htmlFor='hour'>
        <input
          id='hour'
          type='text'
          name='hour'
          value={time.hour}
          max={24}
          maxLength='2'
          onChange={handleGetTime}
        />
      </label>
      <span>:</span>
      <label htmlFor='minute'>
        <input
          id='minute'
          type='text'
          name='minute'
          value={time.minute}
          maxLength='2'
          onChange={handleGetTime}
        />
      </label>
    </div>
  );
}

export default OperatingTime;
