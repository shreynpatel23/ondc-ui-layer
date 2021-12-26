import React, { useState } from "react";
import styles from "./productCard.module.scss";
import no_image_found from "../../../../assets/images/no_image_found.png";
import RuppeSvg from "../../../shared/svg/ruppe";
import Button from "../../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../../utils/button";

export default function ProductCard(props) {
  const {
    price,
    descriptor,
    product_id,
    bpp_id,
    location_id,
    bpp_provider_id,
    onUpdateCart,
  } = props;
  const [quantityCount, setQuantityCount] = useState(0);
  return (
    <div className={styles.card_bg}>
      <div className={styles.overlay}>
        <div className={styles.button_placement_for_add_to_cart}>
          <div
            className={`${styles.button_wrapper} d-flex align-items-center justify-content-center`}
          >
            <Button
              button_text="Add To Cart"
              type={buttonTypes.primary}
              size={buttonSize.small}
              // loading={loading ? 1 : 0}
              // disabled={!isLocationSelected || loading}
              onClick={() => {
                setQuantityCount(quantityCount + 1);
                onUpdateCart({
                  id: product_id,
                  quantity: { count: quantityCount + 1 },
                  bpp_id,
                  provider: {
                    id: bpp_provider_id,
                    location: [location_id],
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
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
