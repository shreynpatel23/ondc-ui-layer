import React from "react";
import styles from "./productCard.module.scss";
import no_image_found from "../../../../assets/images/no_image_found.png";
import RuppeSvg from "../../../shared/svg/ruppe";

export default function ProductCard(props) {
  const { price, descriptor } = props;
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
        <div className={styles.description_wrapper}>
          <p className={styles.prodcut_name} title={descriptor.name}>
            {descriptor.name.length > 35
              ? `${descriptor.name.substr(0, 35)}...`
              : descriptor.name}
          </p>
        </div>
        <div className="py-2 d-flex align-items-center">
          <div className="pe-2">
            <RuppeSvg height="13" width="8" />
          </div>
          <p className={styles.amount}>{Math.round(price.value)}</p>
        </div>
      </div>
    </div>
  );
}
