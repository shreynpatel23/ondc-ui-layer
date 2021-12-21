import React from "react";
import styles from "./home.module.scss";
import Header from "../../shared/header/header";
export default function Home() {
  return (
    <div className={styles.background}>
      <Header />
    </div>
  );
}
