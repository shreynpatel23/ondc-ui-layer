import React, { useState, useContext } from "react";
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

export default function BillingDetailsCard(props) {
  const {
    currentStep,
    billingAddress,
    setBillingAddress,
    onInitializeOrder,
  } = props;
  const shippingAddress = JSON.parse(localStorage.getItem("shipping_address"));
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
                    setBillingAddress();
                    return;
                  }
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
                          {billingAddress?.location?.address?.street}
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="pe-1">
                            <p className={styles.city}>
                              {billingAddress?.location?.address?.city},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.state}>
                              {billingAddress?.location?.address?.state},
                            </p>
                          </div>
                          <div className="pe-1">
                            <p className={styles.country_code}>
                              {billingAddress?.location?.address?.area_code}
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
          <Button
            button_text="Initialize order"
            type={buttonTypes.primary}
            size={buttonSize.small}
            disabled={!billingAddress}
            onClick={onInitializeOrder}
          />
        </div>
      )}
    </div>
  );
}
