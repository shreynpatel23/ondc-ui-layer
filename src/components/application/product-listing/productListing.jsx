import React, { useState, Fragment, useEffect } from "react";
import styles from "../application.module.scss";
import Dropdown from "../../shared/dropdown/dropdown";
import ArrowDown from "../../shared/svg/arrow-down";
import LocationInput from "../../shared/location-input/locationInput";
import { search_by_types } from "../../../constants/search-types";
import { ONDC_COLORS } from "../../shared/colors";
import RestaurantCard from "./restaurant-card/restaurantWrapper";
import { callGetApi } from "../../../api";
import { useLocation } from "react-router-dom";
import Toast from "../../shared/toast/toast";

export default function ProductListing() {
  const uselocation = useLocation();
  const {
    state: { location, message_id, search_value },
  } = uselocation;
  console.log({ location, message_id, search_value });
  //states
  const [searchType, setSearchType] = useState(search_by_types[0]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getProducts() {
      try {
        const { data } = await callGetApi(
          `/products/on-search?message_id=${message_id}`
        );
        const filteredProducts = data.message.catalogs.map((catalog) => {
          if (catalog?.bpp_providers) {
            return { ...catalog };
          } else {
            return { ...catalog, bpp_providers: [] };
          }
        });
        setProducts(filteredProducts);
      } catch (error) {
        const { err } = error.response.data;
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [message_id]);

  const loadingSpinner = (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50vh" }}
    >
      <div
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );

  return (
    <div className={styles.background}>
      {error && <Toast message={error} onRemove={() => setError("")} />}
      {loading ? (
        loadingSpinner
      ) : (
        <div className="p-3">
          {/* SEARCH INPUT HERE  */}
          <div className={`p-2 ${styles.search_wrapper}`}>
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
            <div className="py-2">
              {/* SEARCH BY INOUT */}
              <LocationInput
                selectedSearchType={searchType}
                selectedLocation={selectedLocation}
                searchValue={searchValue}
                setSelectedLocation={(value) => setSelectedLocation(value)}
                setSearchValue={(value) => setSearchValue(value)}
              />
            </div>
          </div>
          {/* PRODUCTS LIST  */}
          <div className={"py-2"}>
            {products?.map((product, index) => {
              return (
                <Fragment key={`${product.bpp_id}-id-${index}`}>
                  {product?.bpp_providers.map(
                    ({ id, descriptor, items, locations }, product_index) => {
                      return (
                        <div
                          key={`${id}-product-id-${product_index}`}
                          className="pb-3"
                        >
                          <RestaurantCard
                            descriptor={descriptor}
                            items={items}
                            provider_name={product.bpp_descriptor.name}
                            bpp_id={product.bpp_id}
                            location_id={locations[0].id}
                            bpp_provider_id={id}
                          />
                        </div>
                      );
                    }
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
