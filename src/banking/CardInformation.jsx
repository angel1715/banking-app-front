import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { href, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { NumericFormat } from "react-number-format";

/**
 * CardInformation Component
 * Displays user's card details including card number, expiration date,
 * CVV, and balance.
 * Allows toggling CVV visibility and navigating back to the dashboard.
 */
function CardInformation() {
  const location = useLocation();
  const { user, jwt, passwordLogin } = location.state || {};
  const [newCardBalance, setNewCardBalance] = useState(null);
  const cvvRef = useRef(null);
  const cvvEyeIcon = useRef(null);
  const loader = useRef(null);

  const navigate = useNavigate();

  /**
   * Toggles the loader and navigates to the dashboard after 1 second.
   */
  const displayLoader = async () => {
        window.location.reload();

    if (!loader.current) return;

    loader.current.style.display =
      loader.current.style.display === "none" ? "block" : "none";

    await axios.post(
      "https://bankingap-afdd1a65c364.herokuapp.com/banking/logout"
    );
    localStorage.removeItem(jwt);
    sessionStorage.clear();
    navigate(
      "/dashboard",
      { state: { user, jwt, passwordLogin } },
      { replace: true }
    );
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/login", { state: { user, jwt, passwordLogin } });
    };
    //navigate("/dashboard", { state: { user, jwt, passwordLogin } });
  };

  /**
   * Fetches the latest card balance from the backend.
   */
  const getNewBalance = async () => {
    try {
      const baseUrl =
        "https://bankingap-afdd1a65c364.herokuapp.com/banking/findByAccountNumber";
      const response = await axios.get(`${baseUrl}/${user.accountNumber}`);
      setNewCardBalance(response.data.cardBalance);
    } catch (error) {
      console.error("Failed to fetch card balance:", error);
    }
  };

  // Load the new balance when component mounts or when user.accountNumber changes
  useEffect(() => {
    getNewBalance();
  }, [user.accountNumber]);

  /**
   * Toggles the CVV display between masked and visible.
   */
  const showCvv = () => {
    if (!cvvRef.current || !cvvEyeIcon.current) return;

    const isMasked = cvvRef.current.innerHTML === "cvv";

    cvvRef.current.innerHTML = isMasked ? user.cardVerificationValue : "cvv";

    cvvEyeIcon.current.classList.toggle("fa-eye");
    cvvEyeIcon.current.classList.toggle("fa-eye-slash");
  };

  return (
    <>
      <div className="card-information-container">
        <div
          className="token-validation"
          style={{ display: "none" }}
          ref={loader}
        >
          <div className="spin"></div>
        </div>

        <nav className="navbar card-information-navbar">
          <div className="container-fluid">
            <a className="navbar-brand fs-1 text-light" href="#">
              AG-Bank
            </a>
            <button
              className="log-out-btn btn btn-lg text-light"
              onClick={displayLoader}
            >
              Dashboard
            </button>
          </div>
        </nav>

        <div className="card-info-container container">
          <h2 className="text-center card-info-title">Card details</h2>
          <i className="fa-solid fa-credit-card card-icon text-center"></i>

          <div className="card-number-container mt-5">
            <p className="card-number-title">Card number</p>
            <p className="card-number">{user.cardNumber}</p>
            <hr />

            <div>
              <p className="card-expiration-title">Exp</p>
              <p className="card-expiration-date">
                {user.expirationMonth}/{user.expirationYear}
              </p>
            </div>

            <hr />
            <div>
              <p className="cvv-title" ref={cvvRef}>
                cvv
              </p>
              <p className="cvv" onClick={showCvv}>
                <i className="fa-solid fa-eye-slash" ref={cvvEyeIcon}></i>
              </p>
            </div>
          </div>

          <div className="card-balance-container mt-5">
            <span className="card-balance">
              US{" "}
              <NumericFormat
                value={newCardBalance}
                displayType={"text"}
                thousandSeparator=","
                prefix="$"
              />
            </span>
            <p className="card-balance-title">Available balance</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CardInformation;
