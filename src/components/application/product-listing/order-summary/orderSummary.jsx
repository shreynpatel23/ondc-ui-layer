import React, { useState, useContext } from "react";
import styles from "./orderSummary.module.scss";
import ArrowDown from "../../../shared/svg/arrow-down";
import { ONDC_COLORS } from "../../../shared/colors";
import { CartContext } from "../../../../context/cartContext";
import RuppeSvg from "../../../shared/svg/ruppe";
import Button from "../../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../../utils/button";
import CartItems from "./cart-items/cartItems";
import { useHistory } from "react-router-dom";

export default function OrderSummary() {
  const history = useHistory();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [toggleCollapse, setToggleCollapse] = useState(false);

  function getSubTotal() {
    let sum = 0;
    cartItems.forEach(({ product, quantity }) => {
      if (quantity.count < 2) {
        sum += Number(product.price.value);
        return;
      } else {
        sum += quantity.count * Number(product.price.value);
      }
    });
    return sum;
  }
  return (
    <div
      className={`${styles.order_summary_back} ${
        toggleCollapse
          ? styles.focused_background_color
          : styles.non_focused_background_color
      }`}
    >
      {toggleCollapse && <CartItems onClose={() => setToggleCollapse(false)} />}
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-md-8 py-2">
            <div className="d-flex align-items-center">
              <div className="px-1">
                <div
                  className={styles.collapse_button_wrapper}
                  onClick={() => setToggleCollapse(!toggleCollapse)}
                >
                  {toggleCollapse ? (
                    <div style={{ transform: "rotate(180deg)" }}>
                      <ArrowDown
                        width="15"
                        height="15"
                        color={ONDC_COLORS.WHITE}
                      />
                    </div>
                  ) : (
                    <div style={{ transform: "rotate(0)" }}>
                      <ArrowDown
                        width="15"
                        height="15"
                        color={ONDC_COLORS.WHITE}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2">
                <p className={styles.total_items_in_cart_text}>
                  Items in cart ({cartItems.length})
                </p>
              </div>
              <div className="ms-auto">
                <p className={styles.sub_total_text}>
                  SubTotal:
                  <span className="ps-2">
                    <RuppeSvg
                      height="13"
                      width="8"
                      color={ONDC_COLORS.PRIMARYCOLOR}
                    />
                  </span>{" "}
                  <span>{getSubTotal()}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 py-2 d-flex align-items-center justify-content-start">
            <div className="px-2">
              <Button
                button_text="Clear Cart"
                type={buttonTypes.secondary}
                size={buttonSize.small}
                onClick={() => setCartItems([])}
              />
            </div>
            <div className="px-2">
              <Button
                button_text="View Cart"
                type={buttonTypes.primary}
                size={buttonSize.small}
                onClick={() => history.push("/cart")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
