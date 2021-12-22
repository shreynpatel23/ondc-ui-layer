import React, { useState } from "react";
import styles from "./locationInput.module.scss";
import ArrowDown from "../svg/arrow-down";
import { ONDC_COLORS } from "../colors";
import LocationSvg from "../svg/location";
import LocationDropdown from "./location-dropdown/locationDropdown";

export default function LocationInput(props) {
  const { selectedSearchType } = props;
  // states
  const [selectedLocation, setSelectedLocation] = useState();
  const [searchValue, setSearchValue] = useState();
  return (
    <div className={`d-flex ${styles.location_and_input_wrapper}`}>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.location_wrapper}`}
      >
        {/* LOCATION DROPDOWN  */}
        <LocationDropdown
          id="location-dropdown"
          click={(value) => console.log(value)}
        >
          <div className="d-flex align-items-center">
            <div className="px-1">
              <LocationSvg width="15" />
            </div>
            <div className="px-1">
              <p className={styles.location}>Select Location</p>
            </div>
            <div className="px-1">
              <ArrowDown color={ONDC_COLORS.WHITE} />
            </div>
          </div>
        </LocationDropdown>
      </div>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          className={styles.formControl}
          placeholder={`Enter ${selectedSearchType}`}
          disabled={!selectedLocation}
          autoComplete="off"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
    </div>
  );
}
