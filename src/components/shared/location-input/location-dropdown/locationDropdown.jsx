import React, { useState } from "react";
import styles from "../../dropdown/dropdown.module.scss";
import inputStyles from "../locationInput.module.scss";
import SearchSvg from "../../svg/search";
import { ONDC_COLORS } from "../../colors";

export default function LocationDropdown(props) {
  const { id, children, click } = props;
  const [locations] = useState(["Pune", "Banglore", "Chennai"]);
  const [searchedLocation, setSearchedLocation] = useState("");

  //   filter the locations
  function filterLocations() {
    return locations.filter((location) =>
      location.toLowerCase().includes(searchedLocation.toLowerCase())
    );
  }
  return (
    <div className="dropup">
      <div
        type="button"
        id={id}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {children}
      </div>
      <div
        className="dropdown-menu"
        aria-labelledby={id}
        style={{
          position: "absolute",
          bottom: "70px",
          left: "-15px",
          width: "500px",
          border: 0,
          padding: "10px 0",
          borderRadius: "8px",
          boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="py-2 px-3">
          <div
            className={`${styles.search_wrapper} d-flex align-items-center px-2`}
          >
            <div className="px-1">
              <SearchSvg color={ONDC_COLORS.PLACEHOLDERTEXT} />
            </div>
            <div className="flex-grow-1">
              <input
                type="text"
                className={inputStyles.formControl}
                placeholder="Search Location"
                autoComplete="off"
                value={searchedLocation}
                onChange={(event) => {
                  setSearchedLocation(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
          {filterLocations().length > 0 ? (
            filterLocations().map((location) => {
              return (
                <div
                  className={styles.dropdown_link_wrapper}
                  key={location}
                  onClick={() => click(location)}
                >
                  <p className={styles.dropdown_link}>{location}</p>
                </div>
              );
            })
          ) : (
            <div
              style={{ height: "200px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <div className="py-2"></div>
                <h4 className={styles.empty_text_header}>No Location Found</h4>
                <p className={styles.empty_text_sub_header}>
                  Search for something else
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
