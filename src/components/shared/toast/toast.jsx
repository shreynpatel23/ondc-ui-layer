import React from "react";
import styles from "./toast.module.scss";

export default function Toast(props) {
  const { message, onRemove } = props;
  setTimeout(() => {
    onRemove()
  }, 5000)
  return (
    <div className={styles.toast_placement}>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}
