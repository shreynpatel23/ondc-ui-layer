import React, { Fragment, useContext } from "react";
import styles from "./restaurantWrapper.module.scss";
import ProductCard from "../product-card/productCard";
import no_image_found from "../../../../assets/images/no_image_found.png";
import { CartContext } from "../../../../context/cartContext";

export default function RestaurantWrapper(props) {
  const {
    descriptor,
    items,
    provider_name,
    bpp_id,
    location_id,
    bpp_provider_id,
  } = props;

  const cartContext = useContext(CartContext);

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
                <ProductCard
                  descriptor={descriptor}
                  price={price}
                  product_id={id}
                  bpp_id={bpp_id}
                  location_id={location_id}
                  bpp_provider_id={bpp_provider_id}
                  onUpdateCart={(value) => {
                    // check if the product is present or not
                    const product = cartContext.cartItems.find(
                      (product) => product.id === value.id
                    );
                    // if present than update the product count
                    if (product) {
                      const productInCart = cartContext.cartItems.map(
                        (item) => {
                          if (item.id === value.id) {
                            return {
                              ...item,
                              quantity: value.quantity,
                            };
                          }
                          return { ...item };
                        }
                      );
                      cartContext.setCartItems(productInCart);
                      return;
                    }
                    // else push the product in array
                    cartContext.setCartItems([...cartContext.cartItems, value]);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
