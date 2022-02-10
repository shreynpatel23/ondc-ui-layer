import React, { useState, useCallback, useContext } from "react";
import ArrowDown from "../../../shared/svg/arrow-down";
import styles from "../../application.module.scss";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";
import { ONDC_COLORS } from "../../../shared/colors";
import Button from "../../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../../utils/button";
import { callGetApi, callPostApi } from "../../../../api";
import { CartContext } from "../../../../context/cartContext";

export default function PaymentTypesCard(props) {
  const { currentStep } = props;
  let checkoutTimer;
  const transaction_id = localStorage.getItem("transaction_id") || "";
  const shipping_address =
    JSON.parse(localStorage.getItem("shipping_address")) || {};
  const billing_address =
    JSON.parse(localStorage.getItem("billing_address")) || {};
  const { cartItems } = useContext(CartContext);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onConfirmOrder = useCallback(async (messageIds) => {
    try {
      const data = await callGetApi(
        `/client/v2/on_confirm_order?messageIds=${messageIds}`
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  function constructConfirmOrderObject() {
    const map = new Map();
    cartItems.map((item) => {
      if (map.get(item.bpp_id)) {
        return map.set(item.bpp_id, [...map.get(item.bpp_id), item]);
      }
      return map.set(item.bpp_id, [item]);
    });
    confirmOrder(Array.from(map.values()));
  }

  // use this api to initialize the order
  async function confirmOrder(items) {
    setLoading(true);
    try {
      const data = await callPostApi(
        "/client/v2/confirm_order",
        items.map((item) => ({
          context: {
            transaction_id,
          },
          message: {
            items: item,
            billing_info: {
              address: {
                door: billing_address?.address?.door,
                country: billing_address?.address?.country,
                city: billing_address?.address?.city,
                street: billing_address?.address?.street,
                area_code: billing_address?.address?.area_code,
                state: billing_address?.address?.state,
                building: billing_address?.address?.building,
              },
              phone: billing_address?.phone,
              name: billing_address?.name,
              email: billing_address?.email,
            },
            delivery_info: {
              type: "HOME-DELIVERY",
              name: shipping_address?.name,
              phone: shipping_address?.phone,
              email: shipping_address?.email,
              location: {
                address: {
                  door: shipping_address?.address?.door,
                  country: shipping_address?.address?.country,
                  city: shipping_address?.address?.city,
                  street: shipping_address?.address?.street,
                  area_code: shipping_address?.address?.area_code,
                  state: shipping_address?.address?.state,
                  building: shipping_address?.address?.building,
                },
              },
            },
            payment: {
              paid_amount: getSubTotal(),
              status: "PAID",
              transaction_id,
            },
          },
        }))
      );
      const array_of_ids = data.map((d) => d.context.message_id);
      callInitializeMultipleTimes(array_of_ids);
    } catch (err) {
      console.log(err);
    }
  }

  function callInitializeMultipleTimes(array_of_ids) {
    let counter = 5;
    checkoutTimer = setInterval(async () => {
      if (counter <= 0) {
        clearInterval(checkoutTimer);
        return;
      }
      await onConfirmOrder(array_of_ids).finally(() => {
        counter -= 1;
      });
    }, 2000);
  }
  return (
    <div className={styles.cart_card}>
      <div className={`d-flex align-items-center ${styles.cart_card_spacing}`}>
        <p className={styles.cart_card_header}>Payment Type</p>
        <div className="ms-auto px-2">
          {currentStep.includes(steps_to_checkout.SELECT_PAYMENT_METHOD) ? (
            <ArrowDown
              width="10"
              height="10"
              color={ONDC_COLORS.SECONDARYCOLOR}
            />
          ) : (
            <div style={{ transform: "rotate(270deg)" }}>
              <ArrowDown
                width="10"
                height="10"
                color={ONDC_COLORS.SECONDARYCOLOR}
              />
            </div>
          )}
        </div>
      </div>
      {currentStep.includes(steps_to_checkout.SELECT_PAYMENT_METHOD) && (
        <div className={styles.cart_card_spacing}>
          <div className="py-2">
            <label className={styles.container}>
              Cash on delivery
              <input
                type="radio"
                name="cash_on_dilevery"
                onChange={() => {
                  setChecked(true);
                }}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <hr />
          <div style={{ width: "150px", margin: "0 auto" }}>
            <Button
              button_text="Checkout"
              type={buttonTypes.primary}
              size={buttonSize.small}
              loading={loading ? 1 : 0}
              disabled={!checked || loading}
              onClick={constructConfirmOrderObject}
            />
          </div>
        </div>
      )}
    </div>
  );
}
