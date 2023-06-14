function OperatingTime({ time, setTime }) {
  const handleGetTime = e => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
    console.log(name, value);
  };

  return (
    <div>
      <input
        type='text'
        name='hour'
        value={time.hour}
        max={24}
        maxLength={2}
        onChange={handleGetTime}
      />
      <span>:</span>
      <input
        type='text'
        name='minute'
        value={time.minute}
        maxLength={2}
        onChange={handleGetTime}
      />
    </div>
  );
}

export default OperatingTime;
