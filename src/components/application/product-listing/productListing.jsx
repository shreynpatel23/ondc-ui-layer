import React, { useState, useEffect, useCallback } from "react";
import styles from "../application.module.scss";
import RestaurantCard from "./restaurant-card/restaurantWrapper";
import { callGetApi } from "../../../api";
import { useLocation } from "react-router-dom";
import Toast from "../../shared/toast/toast";
import no_image_found from "../../../assets/images/no_image_found.png";

export default function ProductListing() {
  const uselocation = useLocation();
  const {
    state: { message_id },
  } = uselocation;
  //states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = useCallback(async () => {
    try {
      const { data } = await callGetApi(
        `/products/on-search?message_id=${message_id}`
      );
      if (data.message.catalogs <= 0) {
        getProducts();
        return;
      }
      const filteredProducts = data.message.catalogs.map((catalog) => {
        if (catalog?.bpp_providers) {
          return { ...catalog };
        } else {
          return { ...catalog, bpp_providers: [] };
        }
      });
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      const { err } = error.response.data;
      setError(err);
      setLoading(false);
    }
  }, [message_id]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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

  const emptyState = (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50vh" }}
    >
      <div className="text-center">
        <img src={no_image_found} alt="no_image_found" widht="250px" />
        <h3 className="py-2">No Items found</h3>
      </div>
    </div>
  );

  return (
    <div className={styles.background}>
      {error && <Toast message={error} onRemove={() => setError("")} />}
      {loading ? (
        loadingSpinner
      ) : (
        <div className="p-3">
          {/* PRODUCTS LIST  */}
          <div className={`py-2 container`}>
            {products.length > 0
              ? products?.map((product, index) => {
                  return (
                    <div className="row" key={`${product.bpp_id}-id-${index}`}>
                      {product.bpp_providers.length > 0
                        ? product?.bpp_providers.map(
                            (
                              { id, descriptor, items, locations },
                              product_index
                            ) => {
                              return (
                                <div
                                  key={`${id}-product-id-${product_index}`}
                                  className="col-12"
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
                          )
                        : emptyState}
                    </div>
                  );
                })
              : emptyState}
          </div>
        </div>
      )}
    </div>
  );
}
