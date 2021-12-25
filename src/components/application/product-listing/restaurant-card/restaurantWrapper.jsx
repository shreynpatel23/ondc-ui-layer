import React, { Fragment } from "react";
import styles from "./restaurantWrapper.module.scss";
import ProductCard from "../product-card/productCard";

export default function RestaurantWrapper(props) {
  const { descriptor, items, provider_name } = props;
  const no_image_found =
    "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  return (
    <Fragment>
      <div className="p-2 d-flex align-items-center">
        <div className="pe-2">
          <img
            src={descriptor.images[0] ?? no_image_found}
            alt={descriptor.name}
            className={styles.restaurant_logo}
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
          {items.map(({ id, descriptor, price }, index) => {
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
