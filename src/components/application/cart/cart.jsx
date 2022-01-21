import React, { useContext, useState, useEffect } from "react";
import styles from "../application.module.scss";
import cartStyles from "../product-listing/order-summary/cart-items/cartItems.module.scss";
import empty_state from "../../../assets/images/empty_state.svg";
import RuppeSvg from "../../shared/svg/ruppe";
import SubstractSvg from "../../shared/svg/substract";
import AddSvg from "../../shared/svg/add";
import { CartContext } from "../../../context/cartContext";
import { ONDC_COLORS } from "../../shared/colors";
import { useHistory } from "react-router-dom";
import Button from "../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../utils/button";
import ArrowDown from "../../shared/svg/arrow-down";
import AddAddressModal from "./add-address-modal/addAddressModal";
import ShippingDetailsCard from "./shipping-details-card/shippingDetailsCard";
import { steps_to_checkout } from "../../../constants/steps-to-checkout";
import BillingDetailsCard from "./billing-details-card/billingDetailsCard";
import PaymentTypesCard from "./payment-types-card/paymentTypesCard";
import { callPostApi, callGetApi } from "../../../api";
export default function Cart() {
  const history = useHistory();
  const transaction_id = localStorage.getItem("transaction_id") || "";
  // const token = localStorage.getItem("token") || "";
  const { cartItems, onReduceQuantity, onAddQuantity } = useContext(
    CartContext
  );
  const [messageId, setMessageId] = useState("");
  const [currentStep, setCurrentStep] = useState([
    steps_to_checkout.ADD_SHIPPING_DETAILS,
  ]);

  useEffect(() => {
    async function getQuote() {
      try {
        const { context } = await callPostApi("/client/v1/get_quote", {
          context: {
            transaction_id: transaction_id,
          },
          message: {
            cart: {
              items: cartItems,
            },
          },
        });
        const { message_id } = context;
        setMessageId(message_id);
      } catch (err) {
        console.log(err);
      }
    }
    if (cartItems.length > 0) {
      getQuote();
    }
  }, [cartItems, transaction_id]);

  useEffect(() => {
    async function onGetQuote() {
      try {
        await callGetApi(`/client/v1/on_get_quote?messageId=${messageId}`);
      } catch (err) {
        console.log(err);
      }
    }

    if (messageId) {
      onGetQuote();
    }
    // eslint-disable-next-line
  }, [messageId]);

  // api here for checkout cart
  async function handleCheckout() {
    console.log("checking out now");
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
                {/* SHIPPING DETAILS  */}
                <div className="col-12 pb-3">
                  <ShippingDetailsCard
                    currentStep={currentStep}
                    setCurrentStep={(value) => setCurrentStep(value)}
                  />
                </div>
                {/* BILLING DETAILS  */}
                <div className="col-12 py-3">
                  <BillingDetailsCard
                    currentStep={currentStep}
                    setCurrentStep={(value) => setCurrentStep(value)}
                  />
                </div>
                {/* PAYMENT DETAILS  */}
                <div className="col-12 py-3">
                  <PaymentTypesCard
                    currentStep={currentStep}
                    setCurrentStep={(value) => setCurrentStep(value)}
                  />
                </div>
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
                              {Math.round(quantity.count * product.price.value)}
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
                                <SubstractSvg color={ONDC_COLORS.ACCENTCOLOR} />
                              </div>
                              <div className="px-2 flex-fill">
                                <p
                                  className={cartStyles.add_to_cart_button_text}
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
                        <p className={styles.sub_total_text}>{getSubTotal()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-3">
                    <Button
                      button_text="Checkout"
                      type={buttonTypes.primary}
                      size={buttonSize.small}
                      disabled={
                        !currentStep.includes(steps_to_checkout.CHECKOUT)
                      }
                      onClick={handleCheckout}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        emptyState
      )}
    </div>
  );
}
