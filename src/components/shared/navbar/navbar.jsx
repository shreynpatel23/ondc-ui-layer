import React, { useContext } from "react";
import ShoppingCart from "../svg/shopping-cart";
import styles from "./navbar.module.scss";
import MoreInfo from "../svg/more-info";
import UserAvatar from "../svg/user-avatar";
import { CartContext } from "../../../context/cartContext";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cartItems } = useContext(CartContext);
  const history = useHistory();
  const location = useLocation();
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.replace("/login");
  }
  return (
    <div className={styles.header_back}>
      <div className="container h-100">
        <div className="d-flex align-items-center h-100">
          <img
            src={logo}
            alt="logo"
            height="40px"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          />
          {!location.pathname.includes("login") && (
            <div className="ms-auto d-flex align-items-center">
              <div className="p-3">
                <div
                  onClick={() => history.push("/checkout/delivery-info")}
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
                <div className="dropdown">
                  <div
                    id="userDropdownLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <UserAvatar style={{ cursor: "pointer" }} />
                  </div>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="userDropdownLink"
                  >
                    <div className="p-2 d-flex align-items-center">
                      <div className="px-2">
                        <p className={styles.user_name}>{user?.name}</p>
                        <p className={styles.user_email}>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="dropdown">
                  <div
                    id="moreOptionsDropdownLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <MoreInfo style={{ cursor: "pointer" }} />
                  </div>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="moreOptionsDropdownLink"
                  >
                    <p
                      className="dropdown-item mb-0"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
