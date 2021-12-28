import React, { useState, useEffect } from "react";
import styles from "../application.module.scss";
import RestaurantCard from "./restaurant-card/restaurantWrapper";
import { callGetApi } from "../../../api";
import { useLocation } from "react-router-dom";
import Toast from "../../shared/toast/toast";

export default function ProductListing() {
  const uselocation = useLocation();
  const {
    state: { message_id },
  } = uselocation;
  //states
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
          {/* PRODUCTS LIST  */}
          <div className={styles.product_wrapper}>
            <div className={`py-2 container`}>
              {products?.map((product, index) => {
                return (
                  <div className="row" key={`${product.bpp_id}-id-${index}`}>
                    {product?.bpp_providers.map(
                      ({ id, descriptor, items, locations }, product_index) => {
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
