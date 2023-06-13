import uuid from 'react-uuid';

function SelectOptions({ options, selected, selectedUpdate }) {
  const handleGetSelected = e => {
    selectedUpdate(e.target.value);
  };

  return (
    <select onChange={handleGetSelected} value={selected}>
      {options.map(option => (
        <option
          key={uuid()}
          value={option}
          style={selected === option ? { color: '#7c00de' } : undefined}
        >
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectOptions;
