import React from "react";
import styles from "./input.module.scss";

export default function Input(props) {
  const { label_name, id } = props;
  return (
    <div className="mb-2">
      <label htmlFor={id} className={styles.label_name}>
        {label_name}
      </label>
      <input {...props} className={styles.formControl} />
    </div>
  );
}
