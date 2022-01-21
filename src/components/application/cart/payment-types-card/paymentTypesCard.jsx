import React from "react";
import ArrowDown from "../../../shared/svg/arrow-down";
import styles from "../../application.module.scss";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";
import { ONDC_COLORS } from "../../../shared/colors";

export default function PaymentTypesCard(props) {
  const { currentStep, setCurrentStep } = props;
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
              Cash on dilevery
              <input
                type="radio"
                name="cash_on_dilevery"
                onChange={() => {
                  setCurrentStep([...currentStep, steps_to_checkout.CHECKOUT]);
                }}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
