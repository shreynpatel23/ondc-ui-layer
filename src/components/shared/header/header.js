import React from "react";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={`${styles.header_back} d-flex align-items-center`}>
      hello from header
    </div>
  );
}
