import React, { useContext } from "react";
import styles from "./cartItems.module.scss";
import CrossSvg from "../../../../shared/svg/cross";
import { ONDC_COLORS } from "../../../../shared/colors";
import { CartContext } from "../../../../../context/cartContext";
import RuppeSvg from "../../../../shared/svg/ruppe";
import no_image_found from "../../../../../assets/images/no_image_found.png";
import SubstractSvg from "../../../../shared/svg/substract";
import AddSvg from "../../../../shared/svg/add";

export default function CartItems(props) {
  const { onClose } = props;
  const { cartItems, setCartItems } = useContext(CartContext);
  function removeProductFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  function reduceQuantityOfProduct(id) {
    const updatedProducts = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: { count: item.quantity.count - 1 } };
      }
      return { ...item };
    });
    // find the product and check if quantity is now 0
    const product = updatedProducts.find((item) => item.id === id);
    // if the quantity is 0 than we will remove from list
    if (product.quantity.count === 0) {
      const filteredProducts = cartItems.filter((product) => product.id !== id);
      setCartItems(filteredProducts);
      return;
    }
    setCartItems(updatedProducts);
  }
  function addQuantityOfProduct(id) {
    const updatedProducts = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: { count: item.quantity.count + 1 } };
      }
      return { ...item };
    });
    setCartItems(updatedProducts);
  }
  return (
    <div className={styles.items_container}>
      <div className="container">
        <div className="d-flex align-items-center py-3">
          <p className={styles.label}>Cart</p>
          <div className="ms-auto">
            <CrossSvg
              width="15"
              height="15"
              style={{ cursor: "pointer" }}
              color={ONDC_COLORS.SECONDARYCOLOR}
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.items_wrapper}>
          <div className="container">
            <div className="row pb-2">
              {cartItems.map((item) => {
                const { product, id, quantity } = item;
                return (
                  <div className="col-md-6 col-lg-4 col-xl-3 p-2" key={id}>
                    <div className={styles.product_card}>
                      <div className="d-flex align-items-center">
                        {/* PRODUCT IMAGE  */}
                        <div className={styles.product_img_container}>
                          <img
                            src={product.descriptor.images[0] ?? no_image_found}
                            alt={product.descriptor.name}
                            className={styles.product_img}
                            onError={(event) => {
                              event.target.onerror = null;
                              event.target.src = no_image_found;
                            }}
                          />
                        </div>
                        {/* DESCRIPTION OF PRODUCT  */}
                        <div className={styles.description_container}>
                          <div className={styles.description_wrapper}>
                            <p
                              className={styles.product_name}
                              title={product.descriptor.name}
                            >
                              {product.descriptor.name}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="pe-2">
                                <RuppeSvg height="13" width="8" />
                              </div>
                              <p className={styles.amount}>
                                {Math.round(product.price.value)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <p
                          className={styles.remove_product_text}
                          onClick={() => removeProductFromCart(id)}
                        >
                          remove
                        </p>
                        <div className="ms-auto">
                          <div className={styles.add_to_cart_button_wrapper}>
                            <div className="d-flex align-items-center">
                              <div
                                className="px-1 flex-fill"
                                style={{ cursor: "pointer" }}
                                onClick={() => reduceQuantityOfProduct(id)}
                              >
                                <SubstractSvg color={ONDC_COLORS.ACCENTCOLOR} />
                              </div>
                              <div className="px-2 flex-fill">
                                <p className={styles.add_to_cart_button_text}>
                                  {quantity.count}
                                </p>
                              </div>
                              <div
                                className="px-1 flex-fill"
                                style={{ cursor: "pointer" }}
                                onClick={() => addQuantityOfProduct(id)}
                              >
                                <AddSvg color={ONDC_COLORS.ACCENTCOLOR} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
