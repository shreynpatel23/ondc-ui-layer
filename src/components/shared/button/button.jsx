import React from "react";
import styles from "./button.module.scss";
import { getButtonStyle, buttonSize } from "../../../utils/button";

export default function Button(props) {
  const { loading = false } = props;
  const buttonStyle = getButtonStyle(props.type);
  return (
    <button
      className={styles.btn}
      {...props}
      style={{
        ...buttonStyle,
        width: "100%",
        padding: "5px 10px",
        minWidth:
          props.size === buttonSize.large
            ? "300px"
            : props.size === buttonSize.medium
            ? "150px"
            : "110px",
      }}
    >
      {loading === 1 ? (
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="spinner-border spinner-border-sm text-light"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      ) : (
        <p
          className={styles.btn_text}
          style={{ color: buttonStyle.buttonTextColor }}
        >
          {props.button_text}
        </p>
      )}
    </button>
  );
}
