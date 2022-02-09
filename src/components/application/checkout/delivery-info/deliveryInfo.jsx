import React, { useState } from "react";
import ShippingDetailsCard from "../../cart/shipping-details-card/shippingDetailsCard";
import BillingDetailsCard from "../../cart/billing-details-card/billingDetailsCard";
import { steps_to_checkout } from "../../../../constants/steps-to-checkout";

export default function DeliveryInfo() {
  const [currentStep, setCurrentStep] = useState([
    steps_to_checkout.ADD_SHIPPING_DETAILS,
  ]);
  const shipping_address =
    JSON.parse(localStorage.getItem("shipping_address")) || null;
  const billing_address =
    JSON.parse(localStorage.getItem("billing_address")) || null;
  const [shippingAddress, setShippingAddress] = useState(shipping_address);
  const [billingAddress, setBillingAddress] = useState(billing_address);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* SHIPPING DETAILS  */}
        <div className="col-12 pb-3">
          <ShippingDetailsCard
            currentStep={currentStep}
            setCurrentStep={(value) => setCurrentStep(value)}
            shippingAddress={shippingAddress}
            setShippingAddress={(value) => setShippingAddress(value)}
          />
        </div>
        {/* BILLING DETAILS  */}
        <div className="col-12 py-3">
          <BillingDetailsCard
            currentStep={currentStep}
            billingAddress={billingAddress}
            setBillingAddress={(value) => setBillingAddress(value)}
            onOrderInitialized={() =>
              setCurrentStep([
                ...currentStep,
                steps_to_checkout.SELECT_PAYMENT_METHOD,
              ])
            }
          />
        </div>
      </div>
    </div>
  );
}
