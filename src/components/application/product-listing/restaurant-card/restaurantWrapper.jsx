import React from "react";
import styles from "./restaurantWrapper.module.scss";
import ProductCard from "../product-card/productCard";
import no_image_found from "../../../../assets/images/no_image_found.png";

export default function RestaurantWrapper(props) {
  const {
    descriptor,
    items,
    provider_name,
    bpp_id,
    location_id,
    bpp_provider_id,
  } = props;

  return (
    <div className="pb-2">
      <div className="px-2 py-1 d-flex align-items-center">
        <div className="pe-2">
          <img
            src={
              descriptor?.images?.length > 0
                ? descriptor?.images[0]
                : no_image_found
            }
            alt={descriptor?.name}
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
      <div className="pb-2">
        <div className="row">
          {items.map((product) => {
            return (
              <div
                key={product.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 p-3"
              >
                <ProductCard
                  product={product}
                  bpp_id={bpp_id}
                  location_id={location_id}
                  bpp_provider_id={bpp_provider_id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
