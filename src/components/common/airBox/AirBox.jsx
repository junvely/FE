function AirBox({ width, height }) {
  return (
    <div
      style={{
        witdh: `${width || '100%'}`,
        height: `${height || '100%'}`,
      }}
    ></div>
  );
}

export default AirBox;
