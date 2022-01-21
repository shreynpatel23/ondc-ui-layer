import React, { useState } from "react";
import LocationSvg from "../../../shared/svg/location";
import CrossSvg from "../../../shared/svg/cross";
import ArrowDown from "../../../shared/svg/arrow-down";
import styles from "../../application.module.scss";
import checkboxstyles from "./billingDetailsCard.module.scss";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";
import { ONDC_COLORS } from "../../../shared/colors";
import AddAddressModal from "../add-address-modal/addAddressModal";

export default function BillingDetailsCard(props) {
  const { currentStep, setCurrentStep } = props;
  const shippingAddress = JSON.parse(localStorage.getItem("shipping_address"));
  const [billingAddress, setBillingAddress] = useState();
  const [toggleSameAsBillingAddress, setToggleSameAsBillingAddress] = useState(
    false
  );
  const [toggleBillingAddressModal, setToggleBillingAddressModal] = useState(
    false
  );
  return (
    <div className={styles.cart_card}>
      {toggleBillingAddressModal && (
        <AddAddressModal
          onClose={() => setToggleBillingAddressModal(false)}
          onAddAddress={(value) => {
            setBillingAddress(value);
            setToggleBillingAddressModal(false);
            setCurrentStep([
              ...currentStep,
              steps_to_checkout.SELECT_PAYMENT_METHOD,
            ]);
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
                    setBillingAddress();
                    return;
                  }
                  setBillingAddress(shippingAddress);
                  setCurrentStep([
                    ...currentStep,
                    steps_to_checkout.SELECT_PAYMENT_METHOD,
                  ]);
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
                          {billingAddress?.street}
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="pe-1">
                            <p className={styles.city}>
                              {billingAddress?.city},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.state}>
                              {billingAddress?.state},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.country_code}>
                              {billingAddress?.pinCode}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className={styles.person_name}>
                          {billingAddress?.phoneNumber}
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
        </div>
      )}
    </div>
  );
}
