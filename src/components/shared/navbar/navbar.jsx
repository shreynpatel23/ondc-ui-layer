import React from "react";
import ShoppingCart from "../svg/shopping-cart";
import styles from "./navbar.module.scss";
import MoreInfo from "../svg/more-info";
import UserAvatar from "../svg/user-avatar";

export default function Navbar() {
  return (
    <div className={`${styles.header_back} d-flex align-items-center`}>
      <p className="m-0">Logo</p>
      <div className="ms-auto d-flex align-items-center">
        <div className="px-3">
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
  );
}
