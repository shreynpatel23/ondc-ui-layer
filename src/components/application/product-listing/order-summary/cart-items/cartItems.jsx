import React from "react";
import styles from "./cartItems.module.scss";

export default function CartItems() {
  return (
    <div className={styles.items_container}>
      <div className="container">
        <p>Hello from cart items</p>
      </div>
    </div>
  );
}
