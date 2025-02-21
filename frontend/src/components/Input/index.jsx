import { useFormContext } from "react-hook-form";

import styles from "./Input.module.css";

const Input = ({ name, label, type = "text" }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} type={type} className={styles.input} />
    </div>
  );
};

export default Input;
