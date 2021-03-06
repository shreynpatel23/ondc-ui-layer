import React, { useEffect } from "react";
import styles from "./locationInput.module.scss";
import ArrowDown from "../svg/arrow-down";
import { ONDC_COLORS } from "../colors";
import LocationSvg from "../svg/location";
import LocationDropdown from "./location-dropdown/locationDropdown";
import CrossSvg from "../svg/cross";
import { dropdownTypes } from "../../../constants/dropdown-types";

export default function LocationInput(props) {
  const {
    selectedSearchType,
    selectedLocation,
    searchValue,
    setSelectedLocation,
    setSearchValue,
    isLocationSelected = () => {},
    dropdownType = dropdownTypes.DOWN,
  } = props;

  useEffect(() => {
    if (selectedLocation && searchValue) {
      isLocationSelected(true);
      return;
    }
    isLocationSelected(false);
  }, [searchValue, selectedLocation, isLocationSelected]);
  return (
    <div className={`d-flex ${styles.location_and_input_wrapper}`}>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.location_wrapper}`}
      >
        {/* LOCATION DROPDOWN  */}
        <LocationDropdown
          id="location-dropdown"
          click={(value) => setSelectedLocation(value)}
          dropdownType={dropdownType}
        >
          <div className="d-flex align-items-center">
            <div className="px-2">
              <LocationSvg width="15" />
            </div>
            <div className="px-1">
              {selectedLocation ? (
                <div>
                  <p className={styles.location_name}>
                    {selectedLocation.name}
                  </p>
                  <p className={styles.location_description}>
                    {selectedLocation.description}
                  </p>
                </div>
              ) : (
                <p className={styles.location}>Select Location</p>
              )}
            </div>
            <div className="px-2">
              {selectedLocation ? (
                <CrossSvg
                  width="10"
                  height="10"
                  onClick={() => setSelectedLocation()}
                  styles={{ cursor: "pointer" }}
                />
              ) : (
                <ArrowDown color={ONDC_COLORS.WHITE} />
              )}
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
