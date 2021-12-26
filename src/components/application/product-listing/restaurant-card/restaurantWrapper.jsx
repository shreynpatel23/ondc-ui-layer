import React, { Fragment } from "react";
import styles from "./restaurantWrapper.module.scss";
import ProductCard from "../product-card/productCard";
import no_image_found from "../../../../assets/images/no_image_found.png";

export default function RestaurantWrapper(props) {
  const { descriptor, items, provider_name } = props;

  return (
    <Fragment>
      <div className="px-2 py-1 d-flex align-items-center">
        <div className="pe-2">
          <img
            src={descriptor.images[0] ?? no_image_found}
            alt={descriptor.name}
            className={styles.restaurant_logo}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = no_image_found;
            }}
          />
        </div>
        <div className="px-1">
          <p className={styles.restaurant_name}>
            {descriptor.name ?? "Provider name"}
          </p>
          <p className={styles.provider_name}>By - {provider_name}</p>
        </div>
      </div>
      <div className="py-2">
        <div className="d-flex align-items-center flex-wrap">
          {items.map(({ id, descriptor, price }) => {
            return (
              <div key={id} className="p-2">
                <ProductCard descriptor={descriptor} price={price} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
