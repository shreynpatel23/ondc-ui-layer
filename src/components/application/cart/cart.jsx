import React, { useContext } from "react";
import styles from "../application.module.scss";
import cartStyles from "../product-listing/order-summary/cart-items/cartItems.module.scss";
import no_image_found from "../../../assets/images/no_image_found.png";
import RuppeSvg from "../../shared/svg/ruppe";
import SubstractSvg from "../../shared/svg/substract";
import AddSvg from "../../shared/svg/add";
import { CartContext } from "../../../context/cartContext";
import { ONDC_COLORS } from "../../shared/colors";
import { useHistory } from "react-router-dom";
import Button from "../../shared/button/button";
import { buttonTypes, buttonSize } from "../../../utils/button";

export default function Cart() {
  const history = useHistory();
  const { cartItems, setCartItems } = useContext(CartContext);

  const emptyState = (
    <div className="col-12">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <img
            src={no_image_found}
            alt="no_image_found"
            widht="250px"
            style={{ borderRadius: "8px" }}
          />
          <h4 className="py-2">Cart is empty </h4>
          <div className="py-2">
            <Button
              button_text="Shop now"
              type={buttonTypes.primary}
              size={buttonSize.small}
              onClick={() => history.push("/home")}
            />
          </div>
        </div>
      </div>
    </div>
  );

  function removeProductFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  function reduceQuantityOfProduct(id) {
    const updatedProducts = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: { count: item.quantity.count - 1 } };
      }
      return { ...item };
    });
    // find the product and check if quantity is now 0
    const product = updatedProducts.find((item) => item.id === id);
    // if the quantity is 0 than we will remove from list
    if (product.quantity.count === 0) {
      const filteredProducts = cartItems.filter((product) => product.id !== id);
      setCartItems(filteredProducts);
      return;
    }
    setCartItems(updatedProducts);
  }
  function addQuantityOfProduct(id) {
    const updatedProducts = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: { count: item.quantity.count + 1 } };
      }
      return { ...item };
    });
    setCartItems(updatedProducts);
  }
  return (
    <div className={styles.background}>
      <div className="container py-4">
        <p className={cartStyles.label}>Cart</p>
        <div className="container">
          <div className="row pb-2">
            {cartItems.length > 0
              ? cartItems.map((item) => {
                  const { product, id, quantity } = item;
                  return (
                    <div className="col-md-6 col-lg-4 col-xl-3 p-2" key={id}>
                      <div
                        className={cartStyles.product_card}
                        style={{
                          backgroundColor: ONDC_COLORS.WHITE,
                          border: 0,
                          boxShadow: "0 3px 10px 0 rgba(0,0,0,0.15)",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          {/* PRODUCT IMAGE  */}
                          <div className={cartStyles.product_img_container}>
                            <img
                              src={
                                product.descriptor.images[0] ?? no_image_found
                              }
                              alt={product.descriptor.name}
                              className={cartStyles.product_img}
                              onError={(event) => {
                                event.target.onerror = null;
                                event.target.src = no_image_found;
                              }}
                            />
                          </div>
                          {/* DESCRIPTION OF PRODUCT  */}
                          <div className={cartStyles.description_container}>
                            <div className={cartStyles.description_wrapper}>
                              <p
                                className={cartStyles.product_name}
                                title={product.descriptor.name}
                              >
                                {product.descriptor.name}
                              </p>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="pe-2">
                                  <RuppeSvg height="13" width="8" />
                                </div>
                                <p className={cartStyles.amount}>
                                  {Math.round(product.price.value)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p
                            className={cartStyles.remove_product_text}
                            onClick={() => removeProductFromCart(id)}
                          >
                            remove
                          </p>
                          <div className="ms-auto">
                            <div
                              className={cartStyles.add_to_cart_button_wrapper}
                            >
                              <div className="d-flex align-items-center">
                                <div
                                  className="px-1 flex-fill"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => reduceQuantityOfProduct(id)}
                                >
                                  <SubstractSvg
                                    color={ONDC_COLORS.ACCENTCOLOR}
                                  />
                                </div>
                                <div className="px-2 flex-fill">
                                  <p
                                    className={
                                      cartStyles.add_to_cart_button_text
                                    }
                                  >
                                    {quantity.count}
                                  </p>
                                </div>
                                <div
                                  className="px-1 flex-fill"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => addQuantityOfProduct(id)}
                                >
                                  <AddSvg color={ONDC_COLORS.ACCENTCOLOR} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : emptyState}
          </div>
        </div>
      </div>
    </div>
  );
}
