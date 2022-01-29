import React, { useState } from "react";
import styles from "./addAddressModal.module.scss";
import applicationStyles from "../../application.module.scss";
import CrossSvg from "../../../shared/svg/cross";
import { ONDC_COLORS } from "../../../shared/colors";
import Input from "../../../shared/input/input";
import Button from "../../../shared/button/button";
import { buttonSize, buttonTypes } from "../../../../utils/button";
export default function AddAddressModal(props) {
  const { onClose, onAddAddress } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [building, setBuilding] = useState("");
  return (
    <div className={styles.overlay}>
      <div className={styles.pop_up_card}>
        <div
          className={`${applicationStyles.cart_card_spacing} d-flex align-items-center`}
        >
          <p className={applicationStyles.cart_card_header}>Address</p>
          <div className="ms-auto">
            <CrossSvg
              color={ONDC_COLORS.SECONDARYCOLOR}
              width="10"
              height="10"
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={applicationStyles.cart_card_spacing}>
          <div className="container">
            <div className={`row py-2 ${styles.input_wrapper}`}>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter Name"
                  id="name"
                  label_name="Name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  label_name="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  id="phone_number"
                  placeholder="Enter Phone"
                  label_name="Phone Number"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter Street Name"
                  id="street_name"
                  label_name="Street Name"
                  onChange={(event) => setStreet(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter Building Name"
                  id="street_name"
                  label_name="Building"
                  onChange={(event) => setBuilding(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter Landmark"
                  id="landMark"
                  label_name="Landmark"
                  onChange={(event) => setLandmark(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter City"
                  id="city"
                  label_name="City"
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter State"
                  id="state"
                  label_name="State"
                  onChange={(event) => setState(event.target.value)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <Input
                  type="text"
                  placeholder="Enter Pin code"
                  id="pin_code"
                  label_name="Pin Code"
                  onChange={(event) => setPinCode(event.target.value)}
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="d-flex align-items-center justify-content-center">
                <div className="px-2">
                  <Button
                    button_text="Cancel"
                    type={buttonTypes.secondary}
                    size={buttonSize.small}
                    onClick={onClose}
                  />
                </div>
                <div className="px-2">
                  <Button
                    button_text="Add Address"
                    type={buttonTypes.primary}
                    size={buttonSize.small}
                    disabled={
                      name === "" ||
                      email === "" ||
                      phoneNumber === "" ||
                      street === "" ||
                      city === "" ||
                      state === "" ||
                      pinCode === "" ||
                      landmark === "" ||
                      building === ""
                    }
                    onClick={() =>
                      onAddAddress({
                        name,
                        email,
                        phoneNumber,
                        street,
                        city,
                        state,
                        pinCode,
                        landmark,
                        building,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
