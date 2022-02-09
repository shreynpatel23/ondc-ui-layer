import React, { useState, useCallback, useContext } from "react";
import LocationSvg from "../../../shared/svg/location";
import CrossSvg from "../../../shared/svg/cross";
import ArrowDown from "../../../shared/svg/arrow-down";
import styles from "../../application.module.scss";
import checkboxstyles from "./billingDetailsCard.module.scss";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";
import { ONDC_COLORS } from "../../../shared/colors";
import AddAddressModal from "../add-address-modal/addAddressModal";
import Button from "../../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../../utils/button";
import { callGetApi, callPostApi } from "../../../../api";
import { CartContext } from "../../../../context/cartContext";
import { useHistory } from "react-router-dom";

export default function BillingDetailsCard(props) {
  const { currentStep, billingAddress, setBillingAddress } = props;
  let initializeTimer;
  const history = useHistory();
  const shippingAddress = JSON.parse(localStorage.getItem("shipping_address"));
  const transaction_id = localStorage.getItem("transaction_id") || "";
  const { cartItems } = useContext(CartContext);
  const [toggleSameAsBillingAddress, setToggleSameAsBillingAddress] = useState(
    false
  );
  const [toggleBillingAddressModal, setToggleBillingAddressModal] = useState(
    false
  );
  const [loading, setLoading] = useState(false);

  const onInitializeOrder = useCallback(async (initializeOrderMessageIds) => {
    try {
      const data = await callGetApi(
        `/client/v2/on_initialize_order?messageIds=${initializeOrderMessageIds}`
      );
      if (data[0]?.message) {
        setLoading(false);
        history.push("/checkout/payment-info");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // use this api to initialize the order
  async function initializeOrder() {
    setLoading(true);
    try {
      const data = await callPostApi(
        "/client/v2/initialize_order",
        cartItems.map((item) => ({
          context: {
            transaction_id,
          },
          message: {
            items: [item],
            billing_info: {
              address: {
                door: billingAddress?.address?.door,
                country: billingAddress?.address?.country,
                city: billingAddress?.address?.city,
                street: billingAddress?.address?.street,
                area_code: billingAddress?.address?.area_code,
                state: billingAddress?.address?.state,
                building: billingAddress?.address?.building,
              },
              phone: billingAddress?.phone,
              name: billingAddress?.name,
              email: billingAddress?.email,
            },
            delivery_info: {
              type: "HOME-DELIVERY",
              name: shippingAddress?.name,
              phone: shippingAddress?.phone,
              email: shippingAddress?.email,
              location: {
                address: {
                  door: shippingAddress?.address?.door,
                  country: shippingAddress?.address?.country,
                  city: shippingAddress?.address?.city,
                  street: shippingAddress?.address?.street,
                  area_code: shippingAddress?.address?.area_code,
                  state: shippingAddress?.address?.state,
                  building: shippingAddress?.address?.building,
                },
              },
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
    initializeTimer = setInterval(async () => {
      if (counter <= 0) {
        clearInterval(initializeTimer);
        return;
      }
      await onInitializeOrder(array_of_ids).finally(() => {
        counter -= 1;
      });
    }, 2000);
  }

  return (
    <div className={styles.cart_card}>
      {toggleBillingAddressModal && (
        <AddAddressModal
          onClose={() => setToggleBillingAddressModal(false)}
          onAddAddress={(value) => {
            const billing_address = {
              name: value.name,
              email: value.email,
              phone: value.phoneNumber,
              address: {
                area_code: value.pinCode,
                building: value.building,
                city: value.city,
                country: "IND",
                door: value.landmark,
                state: value.state,
                street: value.street,
              },
            };
            localStorage.setItem(
              "billing_address",
              JSON.stringify(billing_address)
            );
            setBillingAddress(billing_address);
            setToggleBillingAddressModal(false);
          }}
        />
      )}
      <div className={`d-flex align-items-center ${styles.cart_card_spacing}`}>
        <p className={styles.cart_card_header}>Billing Details</p>
        <div className="ms-auto px-2">
          {currentStep.includes(steps_to_checkout.ADD_BILLING_DETAILS) ? (
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
      {currentStep.includes(steps_to_checkout.ADD_BILLING_DETAILS) && (
        <div className={styles.cart_card_spacing}>
          <div className="py-2">
            <label className={checkboxstyles.container}>
              Same as Shipping Address
              <input
                type="checkbox"
                name="billing_address_radio"
                onChange={() => {
                  setToggleSameAsBillingAddress(!toggleSameAsBillingAddress);
                  if (toggleSameAsBillingAddress) {
                    localStorage.setItem("billing_address", JSON.stringify({}));
                    setBillingAddress();
                    return;
                  }
                  localStorage.setItem(
                    "billing_address",
                    JSON.stringify(shippingAddress)
                  );
                  setBillingAddress(shippingAddress);
                }}
              />
              <span className={checkboxstyles.checkmark}></span>
            </label>
          </div>
          {!toggleSameAsBillingAddress && (
            <>
              <div className="py-2">
                <p className={styles.person_name}>OR</p>
              </div>
              <div className="d-inline-flex">
                {billingAddress ? (
                  <div
                    className={`${styles.address_wrapper_card} d-flex align-items-start`}
                  >
                    <div className="pb-2">
                      <p className={styles.person_name}>
                        {billingAddress?.name}
                      </p>
                      <p className={styles.person_email}>
                        {billingAddress?.email}
                      </p>
                      <div className="py-2">
                        <p className={styles.street_name}>
                          {billingAddress?.address?.street}
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="pe-1">
                            <p className={styles.city}>
                              {billingAddress?.address?.city},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.state}>
                              {billingAddress?.address?.state},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.country_code}>
                              {billingAddress?.address?.area_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className={styles.person_name}>
                          {billingAddress?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="ms-auto">
                      <CrossSvg
                        width="10"
                        height="10"
                        color={ONDC_COLORS.SECONDARYCOLOR}
                        onClick={() => setBillingAddress()}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${styles.add_location_button_wrapper} d-flex align-items-center`}
                    onClick={() => setToggleBillingAddressModal(true)}
                  >
                    <div className="px-2">
                      <LocationSvg
                        width="15"
                        height="20"
                        color={ONDC_COLORS.ACCENTCOLOR}
                      />
                    </div>
                    <div className="px-2">
                      <p className={styles.add_location_text}>Add Address</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <hr />
          <div style={{ width: "150px", margin: "0 auto" }}>
            <Button
              button_text="Initialize order"
              type={buttonTypes.primary}
              size={buttonSize.small}
              loading={loading ? 1 : 0}
              disabled={!billingAddress || loading}
              onClick={initializeOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
}
