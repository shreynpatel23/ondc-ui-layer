import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Button from "../shared/button/button";
import { buttonTypes, buttonSize } from "../../utils/button";
import styles from "../application/application.module.scss";
import Toast from "../shared/toast/toast";
import { useHistory } from "react-router-dom";
// import { callPostApi } from "../../api";

export default function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function handleLogin() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL, accessToken } = result.user;
        // saveUserInDatabse({ name: displayName, email, photoURL });
        localStorage.setItem(
          "user",
          JSON.stringify({ name: displayName, email, photoURL })
        );
        localStorage.setItem("token", accessToken);
        setLoading(false);
        history.push("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
  }
  //   async function saveUserInDatabse(user) {
  //     try {
  //       const data = await callPostApi(
  //         "https://ondc-users.firebaseio.com/users.json",
  //         user
  //       );
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  return (
    <div>
      <div
        className={styles.background}
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          {error && <Toast message={error} onRemove={() => setError("")} />}
          <div className={styles.home_card}>
            {/* HEADLINE  */}
            <div className="py-2 text-center">
              <p className={styles.headline}>Welcome to ONDC</p>
            </div>
            {/* BODYTEXT */}
            <div className="py-2 text-center">
              <p className={styles.bodytext}>
                A global marketplace to discover and buy anything you need
              </p>
            </div>
            <div className="py-3 d-flex align-items-center justify-content-center">
              <div className="pe-3">
                <Button
                  button_text="Login with Google"
                  type={buttonTypes.primary}
                  size={buttonSize.small}
                  loading={loading ? 1 : 0}
                  disabled={loading}
                  onClick={handleLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
