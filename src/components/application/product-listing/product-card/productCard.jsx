import React, { useState, useEffect, useContext } from "react";
import styles from "./productCard.module.scss";
import no_image_found from "../../../../assets/images/no_image_found.png";
import RuppeSvg from "../../../shared/svg/ruppe";
import ShoppingCart from "../../../shared/svg/shopping-cart";
import { ONDC_COLORS } from "../../../shared/colors";
import SubstractSvg from "../../../shared/svg/substract";
import AddSvg from "../../../shared/svg/add";
import { CartContext } from "../../../../context/cartContext";

export default function ProductCard(props) {
  const { product, bpp_id, location_id, bpp_provider_id } = props;
  const { id, descriptor, price } = product;
  const [quantityCount, setQuantityCount] = useState();
  const [toggleAddToCart, setToggleAddToCart] = useState();
  const {
    cartItems,
    onAddQuantity,
    onReduceQuantity,
    onAddProduct,
  } = useContext(CartContext);
  useEffect(() => {
    const isProductPresent = cartItems.find(({ product }) => product.id === id);
    if (isProductPresent) {
      setToggleAddToCart(true);
      setQuantityCount(isProductPresent.quantity.count);
    } else {
      setToggleAddToCart(false);
      setQuantityCount(0);
    }
  }, [cartItems, id]);
  return (
    <div className={`${styles.card_bg} d-flex align-items-start`}>
      <div className={styles.product_img_container}>
        <img
          src={
            descriptor?.images?.length > 0
              ? descriptor?.images[0]
              : no_image_found
          }
          alt={descriptor?.name}
          className={styles.product_img}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = no_image_found;
          }}
        />
      </div>
      <div className={styles.description_container}>
        <div className={styles.description_wrapper}>
          <p
            className={styles.product_name}
            title={`${descriptor.name} from ${bpp_id}`}
          >
            {descriptor.name} <br />
            <span className={styles.product_desc}>from {bpp_id}</span>
          </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="pe-2">
              <RuppeSvg height="13" width="8" />
            </div>
            <p className={styles.amount}>{Math.round(price.value)}</p>
          </div>
          {/* ADD TO CART BUTTON  */}
          <div className="ms-auto">
            <div className={styles.add_to_cart_button_wrapper}>
              {toggleAddToCart ? (
                <div className="d-flex align-items-center">
                  <div
                    className="px-1 flex-fill"
                    onClick={() => {
                      setQuantityCount(quantityCount - 1);
                      onReduceQuantity(id);
                      if (quantityCount - 1 === 0) {
                        setToggleAddToCart(false);
                        return;
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <SubstractSvg />
                  </div>
                  <div className="px-2 flex-fill">
                    <p className={styles.add_to_cart_button_text}>
                      {quantityCount}
                    </p>
                  </div>
                  <div
                    className="px-1 flex-fill"
                    onClick={() => {
                      setQuantityCount(quantityCount + 1);
                      onAddQuantity(id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <AddSvg />
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setToggleAddToCart(true);
                    setQuantityCount(quantityCount + 1);
                    onAddProduct({
                      id,
                      quantity: { count: quantityCount + 1 },
                      bpp_id,
                      provider: {
                        id: bpp_provider_id,
                        locations: [location_id],
                      },
                      product: {
                        id: product.id,
                        descriptor: product.descriptor,
                        price: {
                          ...product.price,
                          value: Math.round(price.value),
                        },
                      },
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="px-1">
                    <ShoppingCart
                      width="15"
                      height="15"
                      color={ONDC_COLORS.WHITE}
                    />
                  </div>
                  <div className="px-1">
                    <p className={styles.add_to_cart_button_text}>Add</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
