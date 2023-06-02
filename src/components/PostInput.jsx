import styles from '../pages/posting/posting.module.scss';

function PostInput({ type, name, value, label, placeHolder, onChange }) {
  return (
    <div className={styles.inputCon}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default PostInput;
