import React from "react";
import styles from "./productCard.module.scss";

export default function ProductCard(props) {
  const { price, descriptor } = props;
  const no_image_found =
    "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  return (
    <div className={styles.card_bg}>
      <div className={styles.product_img_container}>
        <img
          src={descriptor.images[0] ?? no_image_found}
          alt={descriptor.name}
          className={styles.product_img}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = no_image_found;
          }}
        />
      </div>
      <div className="p-3">
        <p className={styles.prodcut_name}>{descriptor.name}</p>
      </div>
    </div>
  );
}
