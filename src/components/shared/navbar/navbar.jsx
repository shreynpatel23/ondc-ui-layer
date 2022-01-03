import React, { useContext } from "react";
import ShoppingCart from "../svg/shopping-cart";
import styles from "./navbar.module.scss";
import MoreInfo from "../svg/more-info";
import UserAvatar from "../svg/user-avatar";
import { CartContext } from "../../../context/cartContext";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const history = useHistory();
  return (
    <div className={styles.header_back}>
      <div className="container">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            height="40px"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          />
          <div className="ms-auto d-flex align-items-center">
            <div className="p-3">
              <div
                onClick={() => history.push("/cart")}
                style={{ position: "relative", cursor: "pointer" }}
              >
                {cartItems.length > 0 && (
                  <div className={styles.marker}>
                    <p className={styles.marker_text}>{cartItems.length}</p>
                  </div>
                )}
                <ShoppingCart />
              </div>
            </div>
            <div className="px-3">
              <UserAvatar style={{ cursor: "pointer" }} />
            </div>
            <div className="px-3">
              <MoreInfo style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
