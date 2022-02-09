import React from "react";
import PaymentTypesCard from "../../cart/payment-types-card/paymentTypesCard";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";

export default function PaymentInfo() {
  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-12 py-3">
          <PaymentTypesCard
            currentStep={steps_to_checkout.SELECT_PAYMENT_METHOD}
          />
        </div>
      </div>
    </div>
  );
}
