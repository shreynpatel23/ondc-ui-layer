import React, { useState } from "react";
import styles from "./home.module.scss";
import Dropdown from "../../shared/dropdown/dropdown";
import ArrowDown from "../../shared/svg/arrow-down";
import { ONDC_COLORS } from "../../shared/colors";
export default function Home() {
  const search_by_types = ["Product Name", "Category", "Provider"];

  // states
  const [searchType, setSearchType] = useState(search_by_types[0]);
  return (
    <div
      className={`${styles.background} d-flex align-items-center justify-content-center`}
    >
      <div className={styles.home_card}>
        {/* HEADLINE  */}
        <div className="py-2">
          <p className={styles.headline}>
            Open <br /> Commerce
          </p>
          <p className={styles.sub_headline}>for All</p>
        </div>
        {/* BODYTEXT */}
        <div className="py-2">
          <p className={styles.bodytext}>
            A global marketplace to discover and buy anything you need. Just
            type what you want to buy and we'll take care of the rest.
          </p>
        </div>
        <div className="py-2">
          {/* SEARCH BY DROPDOWN  */}
          <div className="d-flex align-items-center">
            <div className="pe-2">
              <p className={styles.search_by_text}>Search by</p>
            </div>
            <Dropdown
              id="search_by_value"
              menu_width="200px"
              options={search_by_types}
              click={(value) => setSearchType(value)}
              activeOption={searchType}
            >
              <div className="d-flex align-items-center">
                <p className={styles.selected_search_type_value}>
                  {searchType}
                </p>
                <div className="ps-2">
                  <ArrowDown
                    width="15"
                    height="20"
                    color={ONDC_COLORS.ACCENTCOLOR}
                  />
                </div>
              </div>
            </Dropdown>
          </div>
          {/* SEARCH BY INOUT */}
        </div>
      </div>
    </div>
  );
}
