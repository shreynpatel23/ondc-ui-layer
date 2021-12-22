import React from "react";
import styles from "./dropdown.module.scss";

export default function Dropdown(props) {
  const { id, menu_width, children, options = [], click, activeOption } = props;
  return (
    <div className="dropdown">
      <div
        type="button"
        id={id}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {children}
      </div>
      <div
        className="dropdown-menu"
        aria-labelledby={id}
        style={{
          position: "absolute",
          width: `${menu_width}`,
          padding: "10px 0",
          border: 0,
          borderRadius: "8px",
          boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        {options.map((option) => {
          return (
            <div
              className={styles.dropdown_link_wrapper}
              key={option}
              onClick={() => click(option)}
            >
              <p
                className={`${
                  option === activeOption
                    ? styles.active_dropdown_link
                    : styles.dropdown_link
                }`}
              >
                {option}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
