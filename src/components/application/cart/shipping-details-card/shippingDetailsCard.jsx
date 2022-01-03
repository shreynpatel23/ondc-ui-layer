import React from "react";
import LocationSvg from "../../../shared/svg/location";
import CrossSvg from "../../../shared/svg/cross";
import ArrowDown from "../../../shared/svg/arrow-down";
import styles from "../../application.module.scss";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";
import { ONDC_COLORS } from "../../../shared/colors";

export default function ShippingDetailsCard(props) {
  const {
    currentStep,
    shippingAddress,
    setShippingAddress,
    setToggleShippingAddressModal,
  } = props;
  return (
    <div className={styles.cart_card}>
      {/* HEADER  */}
      <div className={`d-flex align-items-center ${styles.cart_card_spacing}`}>
        <p className={styles.cart_card_header}>Shipping Details</p>
        <div className="ms-auto px-2">
          {currentStep.includes(steps_to_checkout.ADD_SHIPPING_DETAILS) ? (
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
      {/* BODY  */}
      {currentStep.includes(steps_to_checkout.ADD_SHIPPING_DETAILS) && (
        <div className={styles.cart_card_spacing}>
          <div className="d-inline-flex">
            {shippingAddress ? (
              <div
                className={`${styles.address_wrapper_card} d-flex align-items-start`}
              >
                <div className="pb-2">
                  <p className={styles.person_name}>{shippingAddress?.name}</p>
                  <p className={styles.person_email}>
                    {shippingAddress?.email}
                  </p>
                  <div className="py-2">
                    <p className={styles.street_name}>
                      {shippingAddress?.street}
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="pe-1">
                        <p className={styles.city}>{shippingAddress?.city},</p>
                      </div>
                      <div className="pe-1">
                        <p className={styles.state}>
                          {shippingAddress?.state},
                        </p>
                      </div>
                      <div className="pe-1">
                        <p className={styles.country_code}>
                          {shippingAddress?.pinCode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className={styles.person_name}>
                      {shippingAddress?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="ms-auto">
                  <CrossSvg
                    width="10"
                    height="10"
                    color={ONDC_COLORS.SECONDARYCOLOR}
                    onClick={() => setShippingAddress()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`${styles.add_location_button_wrapper} d-flex align-items-center`}
                onClick={() => setToggleShippingAddressModal(true)}
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
        </div>
      )}
    </div>
  );
}
