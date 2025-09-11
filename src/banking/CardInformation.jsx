import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { NumericFormat } from "react-number-format";

function CardInformation() {
  const location = useLocation();
  const { user, jwt, passwordLogin } = location.state || {};
  const [newCardBalance, setNewCardBalance] = useState(null);
  const cvvRef = useRef(null);
  const cvvEyeIcon = useRef(null);
  const loader = useRef(null);

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

  useEffect(() => {
    getNewBalance();
  }, [user.accountNumber]);

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
        {/* Loader */}
        <div className="token-validation d-none" ref={loader}>
          <div className="spin"></div>
        </div>

        {/* Navbar */}
        <nav className="navbar card-information-navbar px-3">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a className="navbar-brand fs-3 fw-bold text-light">AG-Bank</a>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                window.history.back();
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </nav>

        {/* Card info */}
        <div className="container my-4">
          <h2 className="text-center mb-4 card-info-title">Card Details</h2>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg rounded-4 p-4">
                <div className="text-center mb-3">
                  <i className="fa-solid fa-credit-card fa-2x card-icon"></i>
                </div>

                {/* Card number */}
                <div className="mb-3">
                  <p className="fw-semibold mb-1">Card Number</p>
                  <p className="text-muted fs-5">{user.cardNumber}</p>
                </div>

                {/* Expiration + CVV in flexbox */}
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="fw-semibold mb-1">Exp</p>
                    <p className="text-muted">
                      {user.expirationMonth}/{user.expirationYear}
                    </p>
                  </div>

                  <div className="text-end">
                    <p className="fw-semibold mb-1">CVV</p>
                    <p className="text-muted" ref={cvvRef}>
                      cvv
                    </p>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={showCvv}
                    >
                      <i className="fa-solid fa-eye-slash" ref={cvvEyeIcon}></i>
                    </button>
                  </div>
                </div>

                <hr />

                {/* Balance */}
                <div className="text-center mt-3">
                  <h4 className="fw-bold">
                    <NumericFormat
                      value={newCardBalance}
                      displayType={"text"}
                      thousandSeparator=","
                      prefix="$"
                    />
                  </h4>
                  <p className="text-muted">Available Balance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CardInformation;