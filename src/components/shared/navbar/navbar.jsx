import React, { useContext } from "react";
import ShoppingCart from "../svg/shopping-cart";
import styles from "./navbar.module.scss";
import MoreInfo from "../svg/more-info";
import UserAvatar from "../svg/user-avatar";
import { CartContext } from "../../../context/cartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className={styles.header_back}>
      <div className="container">
        <div className="d-flex align-items-center">
          <p className="m-0">Logo</p>
          <div className="ms-auto d-flex align-items-center">
            <div className="p-3" style={{ position: "relative" }}>
              {cartItems.length > 0 && (
                <div className={styles.marker}>
                  <p className={styles.marker_text}>{cartItems.length}</p>
                </div>
              )}
              <ShoppingCart style={{ cursor: "pointer" }} />
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
