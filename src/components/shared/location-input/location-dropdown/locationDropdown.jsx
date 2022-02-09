import React, { useState } from "react";
import locationStyles from "../locationInput.module.scss";
import styles from "../../dropdown/dropdown.module.scss";
import inputStyles from "../locationInput.module.scss";
import SearchSvg from "../../svg/search";
import { ONDC_COLORS } from "../../colors";
import { debounce } from "../../../../utils/search";
import axios from "axios";

export default function LocationDropdown(props) {
  const { id, children, click, dropdownType } = props;
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  async function getAllLocations(query) {
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}`
      );
      const formattedLocations = data.predictions.map((location) => ({
        place_id: location.place_id,
        name: location.structured_formatting.main_text,
        description: location.structured_formatting.secondary_text,
      }));
      setLocations(formattedLocations);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getPlaceFromPlaceId(location) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.place_id}&key=${API_KEY}`
      );
      click({
        ...location,
        lat: data.result.geometry.location.lat,
        lng: data.result.geometry.location.lng,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function onChange(event) {
    setLoading(true);
    debounce(() => {
      // this check required so that when the input is cleared
      // we do not need to call the search driver api
      if (event.target.value) {
        getAllLocations(event.target.value);
        return;
      }
      setLocations([]);
      setLoading(false);
    }, 800)();
  }

  const loadingSpinner = (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "150px" }}
    >
      <div
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );

  return (
    <div className={dropdownType}>
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
                onChange={(event) => onChange(event)}
              />
            </div>
          </div>
        </div>
        <div style={{ maxHeight: "250px", overflow: "auto" }}>
          {loading ? (
            loadingSpinner
          ) : locations.length > 0 ? (
            locations.map((location) => {
              return (
                <div
                  className={styles.dropdown_link_wrapper}
                  key={location.place_id}
                  onClick={() => {
                    getPlaceFromPlaceId(location);
                  }}
                >
                  <p className={styles.dropdown_link}>{location.name}</p>
                  <p
                    className={locationStyles.location_description}
                    style={{ color: ONDC_COLORS.SECONDARYCOLOR }}
                  >
                    {location.description}
                  </p>
                </div>
              );
            })
          ) : (
            <div
              style={{ height: "150px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="text-center">
                <div className="py-2"></div>
                <h4 className={styles.empty_text_header}>
                  Search for location
                </h4>
                <p className={styles.empty_text_sub_header}>
                  Type the location you want to search
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
