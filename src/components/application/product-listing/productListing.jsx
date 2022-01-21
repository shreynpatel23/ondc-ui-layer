import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "../application.module.scss";
import RestaurantCard from "./restaurant-card/restaurantWrapper";
import { callGetApi } from "../../../api";
import Toast from "../../shared/toast/toast";
import empty_state from "../../../assets/images/empty_state.svg";
import { CartContext } from "../../../context/cartContext";
import OrderSummary from "./order-summary/orderSummary";

export default function ProductListing() {
  const message_id = localStorage.getItem("message_id") || "";
  //states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cartItems } = useContext(CartContext);
  let timer;

  const getProducts = useCallback(async () => {
    try {
      const data = await callGetApi(
        `/client/v1/on_search?messageId=${message_id}`
      );
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
    // eslint-disable-next-line
  }, [message_id]);

  useEffect(() => {
    callApiMultipleTimes();
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, []);

  function callApiMultipleTimes() {
    let counter = 6;
    timer = setInterval(async () => {
      if (counter <= 0) {
        clearInterval(timer);
        return;
      }
      await getProducts().finally(() => {
        counter -= 1;
      });
    }, 2000);
  }

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
      style={{ height: "80vh" }}
    >
      <div className="text-center">
        <img src={empty_state} alt="empty_state" widht="250px" />
        <div className="py-3">
          <p className={styles.empty_state_header_text}>
            The product you are looking for is not found
          </p>
          <p className={styles.empty_state_body_text}>
            Try searching for a different product.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={styles.background}
        style={
          cartItems.length > 0
            ? { height: "calc(100vh - 120px)" }
            : { height: "100%" }
        }
      >
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
                      <div
                        className="row"
                        key={`${product.bpp_id}-id-${index}`}
                      >
                        {product?.bpp_providers.map(
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
                        )}
                      </div>
                    );
                  })
                : emptyState}
            </div>
          </div>
        )}
      </div>
      {cartItems.length > 0 && <OrderSummary />}
    </>
  );
}
