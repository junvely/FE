import styles from './input.module.scss';

function Input({ type, name, value, placeholder, onChange }) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}

export default Input;
