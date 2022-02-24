import React, { useContext, useEffect, useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "../application.module.scss";
import cartStyles from "../product-listing/order-summary/cart-items/cartItems.module.scss";
import DeliveryInfo from "./delivery-info/deliveryInfo";
import PaymentInfo from "./payment-info/paymentInfo";
import { CartContext } from "../../../context/cartContext";
import RuppeSvg from "../../shared/svg/ruppe";
import ArrowDown from "../../shared/svg/arrow-down";
import { ONDC_COLORS } from "../../shared/colors";
import Button from "../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../utils/button";
import { useHistory } from "react-router-dom";
import empty_state from "../../../assets/images/empty_state.svg";
import AddSvg from "../../shared/svg/add";
import SubstractSvg from "../../shared/svg/substract";
import { callGetApi, callPostApi } from "../../../api";

export default function Checkout() {
  const history = useHistory();
  const transaction_id = localStorage.getItem("transaction_id") || "";
  const { cartItems, onReduceQuantity, onAddQuantity } =
    useContext(CartContext);
  const [quoteMessageIds, setQuoteMessageIds] = useState("");
  const [loading, setLoading] = useState(true);
  let quoteTimer;

  const onGetQuote = useCallback(async () => {
    try {
      await callGetApi(`/client/v2/on_get_quote?messageIds=${quoteMessageIds}`);
    } catch (err) {
      console.log(err);
    }
  }, [quoteMessageIds]);

  // use this effect for getting quote of the items
  useEffect(() => {
    function constructQouteObject() {
      const map = new Map();
      cartItems.map((item) => {
        if (map.get(item.bpp_id)) {
          return map.set(item.bpp_id, [...map.get(item.bpp_id), item]);
        }
        return map.set(item.bpp_id, [item]);
      });
      getQuote(Array.from(map.values()));
    }
    async function getQuote(items) {
      try {
        const data = await callPostApi(
          "/client/v2/get_quote",
          items.map((item) => ({
            context: {
              transaction_id,
            },
            message: {
              cart: {
                items: item,
              },
            },
          }))
        );
        const array_of_ids = data.map((d) => d.context.message_id);
        setQuoteMessageIds(array_of_ids);
      } catch (err) {
        console.log(err);
      }
    }
    constructQouteObject();
  }, [cartItems, transaction_id]);

  // use this effect for calling apis of initialize order
  useEffect(() => {
    if (quoteMessageIds) {
      callGetQuoteMultipleTimes();
    }
    // eslint-disable-next-line
  }, [quoteMessageIds]);

  function callGetQuoteMultipleTimes() {
    let counter = 3;
    quoteTimer = setInterval(async () => {
      if (counter <= 0) {
        setLoading(false);
        clearInterval(quoteTimer);
        return;
      }
      await onGetQuote().finally(() => {
        counter -= 1;
      });
    }, 2000);
  }
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

  const loadingSpinner = (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50vh" }}
    >
      <div
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );

  const emptyState = (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <div className="text-center">
        <img src={empty_state} alt="empty_state" widht="250px" />
        <div className="py-3">
          <p className={styles.empty_state_header_text}>Your cart is empty</p>
          <p className={styles.empty_state_body_text}>
            Looks like you haven’t added any items to the bag yet. Start
            shopping to fill it in.
          </p>
        </div>
        <div className="py-2">
          <Button
            button_text="Shop now"
            type={buttonTypes.primary}
            size={buttonSize.small}
            onClick={() => history.push("/home")}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.background}>
      {cartItems.length > 0 ? (
        loading ? (
          loadingSpinner
        ) : (
          <div className="container py-4">
            <div className="row">
              <div className="col-12">
                <div className="py-2 d-inline-flex">
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/products")}
                  >
                    <div style={{ transform: "rotate(90deg" }}>
                      <ArrowDown color={ONDC_COLORS.SECONDARYCOLOR} />
                    </div>
                    <p className={styles.back_text}>back</p>
                  </div>
                </div>
              </div>
              {/* CHECKOUT LABEL  */}
              <div className="col-12">
                <p className={`pb-2 ${cartStyles.label}`}>Checkout</p>
              </div>
              {/* GRID FOR SHOPPING DETAILS AND SUMMARY  */}
              <div className="col-lg-8 py-2">
                <div className="row">
                  <Switch>
                    <Route
                      path={"/checkout/delivery-info"}
                      component={DeliveryInfo}
                    />
                    <Route
                      path={"/checkout/payment-info"}
                      component={PaymentInfo}
                    />
                  </Switch>
                </div>
              </div>
              <div className="col-lg-4 py-2">
                {/* SUMMARY HERE  */}
                <div className={styles.cart_card}>
                  <div className={styles.cart_card_spacing}>
                    <p className={styles.cart_card_header}>Summary</p>
                  </div>
                  <div className={styles.cart_card_spacing}>
                    {cartItems.map((item) => {
                      const { product, id, quantity } = item;
                      return (
                        <div key={id} className="d-flex align-items-start pb-3">
                          {/* PRODUCT NAME AND AMOUNT  */}
                          <div className="pe-3 flex-grow-1">
                            <p
                              className={cartStyles.product_name}
                              title={product.descriptor.name}
                              style={{ width: "95%", height: "100%" }}
                            >
                              {product.descriptor.name}
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="pe-1">
                                <RuppeSvg
                                  height="10"
                                  width="7"
                                  color={ONDC_COLORS.SECONDARYCOLOR}
                                />
                              </div>
                              <p
                                className={cartStyles.amount}
                                style={{
                                  fontSize: "12px",
                                  color: ONDC_COLORS.SECONDARYCOLOR,
                                }}
                              >
                                {Math.round(
                                  quantity.count * product.price.value
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="ms-auto px-1">
                            {/* QUANTITY BUTTON  */}
                            <div
                              className={cartStyles.add_to_cart_button_wrapper}
                            >
                              <div className="d-flex align-items-center">
                                <div
                                  className="px-1 flex-fill"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onReduceQuantity(id)}
                                >
                                  <SubstractSvg
                                    color={ONDC_COLORS.ACCENTCOLOR}
                                  />
                                </div>
                                <div className="px-2 flex-fill">
                                  <p
                                    className={
                                      cartStyles.add_to_cart_button_text
                                    }
                                  >
                                    {quantity.count}
                                  </p>
                                </div>
                                <div
                                  className="px-1 flex-fill"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onAddQuantity(id)}
                                >
                                  <AddSvg color={ONDC_COLORS.ACCENTCOLOR} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <hr />
                    <div className="d-flex align-items-center">
                      <p className={styles.sub_total_text}>SubTotal:</p>
                      <div className="ms-auto d-flex align-items-center">
                        <div className="px-1">
                          <RuppeSvg
                            height="13"
                            width="8"
                            color={ONDC_COLORS.PRIMARYCOLOR}
                          />
                        </div>
                        <div className="px-1">
                          <p className={styles.sub_total_text}>
                            {getSubTotal()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        emptyState
      )}
    </div>
  );
}
