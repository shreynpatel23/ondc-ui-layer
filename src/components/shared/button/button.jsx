import React from "react";
import styles from "./button.module.scss";
import { getButtonStyle, buttonSize } from "../../../utils/button";

export default function Button(props) {
  const buttonStyle = getButtonStyle(props.type);
  return (
    <button
      className={styles.btn}
      {...props}
      style={{
        ...buttonStyle,
        width:
          props.size === buttonSize.large
            ? "300px"
            : props.size === buttonSize.medium
            ? "150px"
            : "110px",
      }}
    >
      <p
        className={styles.btn_text}
        style={{ color: buttonStyle.buttonTextColor }}
      >
        {props.button_text}
      </p>
    </button>
  );
}
