import React from "react";
import styles from "../add-address-modal/addAddressModal.module.scss";
import applicationStyles from "../../application.module.scss";
import { buttonSize, buttonTypes } from "../../../../utils/button";
import Button from "../../../shared/button/button";
import { ONDC_COLORS } from "../../../shared/colors";

export default function OrderIdListModal({ orderIds, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.pop_up_card}>
        <div
          className={`${applicationStyles.cart_card_spacing} d-flex align-items-center`}
        >
          <p className={applicationStyles.cart_card_header}>Order Ids</p>
        </div>
        <div className={applicationStyles.cart_card_spacing}>
          <div className="py-4">
            <div className="py-2">
              <p
                className={styles.order_id_text}
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: ONDC_COLORS.ERROR,
                  width: "70%",
                  margin: "0 auto",
                }}
              >
                Your Order ids are listed below copy them now as they wont be
                shown again
              </p>
            </div>
            <hr />
            {orderIds?.map((id) => {
              return (
                <p key={id} className={`${styles.order_id_text} py-2`}>
                  {id}
                </p>
              );
            })}
          </div>
          <div style={{ width: "150px", margin: "0 auto" }} className="py-4">
            <Button
              button_text="Close"
              type={buttonTypes.primary}
              size={buttonSize.small}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
