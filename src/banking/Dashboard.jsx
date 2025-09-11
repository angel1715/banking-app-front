import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Dashboard() {
  const location = useLocation();
  const { user, jwt, emailLogin, passwordLogin } = location.state || {};

  const [sender, setSender] = useState(user);
  const [isChecked, setIsChecked] = useState(false);
  const [accountNumber, setAccountNumber] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expirationD, setExpirationD] = useState(null);
  const [cardVerificationValue, setCardVerificationValue] = useState(null);
  const [amount, setAmount] = useState();
  const [Id, setId] = useState(user.id);
  const [newBalance, setNewBalance] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const withdrawdOverlayRef = useRef(null);
  const sendOverlayRef = useRef(null);
  const sentMoneyMessageRef = useRef(null);
  const withdrawMoneyMessageRef = useRef(null);
  const depositMoneyMessageRef = useRef(null);
  const tokenValidationRef = useRef(null);
  const depositOverlayRef = useRef(null);

  let navigate = useNavigate();

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`transactions_${Id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const getNewBalance = async () => {
    try {
      const basesUrl =
        "https://bankingap-afdd1a65c364.herokuapp.com/banking/findById";
      const requestResult = await axios.get(`${basesUrl}/${user.id}`);
      setNewBalance(requestResult.data.balance);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found");
      }
    }
  };

  useEffect(() => {
    getNewBalance();
  }, []);

  // === Tus funciones originales (findUserByAccountNumber, handleSendMoney, handleWithdrawMoney, handleDepositMoney, handleLogout, etc.)
  // No las modifiqué, solo asegúrate de dejarlas igual que antes.

  // --- Render ---
  return (
    <div className="dashboard-container">
      {/* Loader JWT */}
      <div
        className="token-validation"
        style={{ display: "none" }}
        ref={tokenValidationRef}
      >
        <div className="spin"></div>
      </div>

      {/* ================= SEND OVERLAY ================= */}
      <div
        className="send-overlay"
        ref={sendOverlayRef}
        style={{ display: "none" }}
      >
        <div
          className="send-money-message bg-light"
          ref={sentMoneyMessageRef}
          style={{ display: "none" }}
        >
          <p className="send-money-message-title text-center">
            Money sent successfully{" "}
            <i className="fa-solid fa-check send-money-message-check fs-3"></i>
          </p>
        </div>

        <button className="close-btn" onClick={() => window.location.reload()}>
          &times;
        </button>
        <div className="container bg-light p-4 rounded">
          <h2 className="text-center mb-4">Send money</h2>

          <form className="row g-3" onSubmit={handleSendMoney}>
            <div className="col-12">
              <label className="form-label">Product Number</label>
              <input
                className="form-control"
                placeholder="Account #"
                name="Account"
                required
                maxLength={9}
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
            <div className="col-12">
              <label className="form-label">Amount</label>
              <input
                className="form-control"
                placeholder="$$"
                required
                maxLength={6}
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )
                }
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={findUserByAccountNumber}
              >
                Find user
              </button>
            </div>
            <div className="col-12">
              <p>
                User: {userInfo.fName} {userInfo.lName}
              </p>
            </div>
            <div className="col-12 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="send-check-btn"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="send-check-btn">
                Confirm transaction
              </label>
            </div>
            <div className="col-12">
              <button
                type="submit"
                disabled={!isChecked}
                className="btn btn-success w-100"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= WITHDRAW OVERLAY ================= */}
      <div
        className="width-overlay"
        ref={withdrawdOverlayRef}
        style={{ display: "none" }}
      >
        <div
          className="withdraw-money-message bg-light"
          ref={withdrawMoneyMessageRef}
          style={{ display: "none" }}
        >
          <p className="text-center">
            Withdrawal successfully{" "}
            <i className="fa-solid fa-check send-money-message-check fs-3"></i>
          </p>
        </div>

        <button className="close-btn" onClick={() => window.location.reload()}>
          &times;
        </button>
        <div className="container bg-light p-4 rounded">
          <h2 className="text-center mb-4">Withdraw funds</h2>

          <form className="row g-3" onSubmit={handleWithdrawMoney}>
            <div className="col-12">
              <label className="form-label">
                To card ************{user.cardNumber.slice(12, 16)}
              </label>
            </div>
            <div className="col-12">
              <label className="form-label">Amount</label>
              <input
                className="form-control"
                placeholder="$$"
                required
                maxLength={6}
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )
                }
              />
            </div>
            <div className="col-12 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="withdraw-check-btn"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="withdraw-check-btn">
                Confirm transaction
              </label>
            </div>
            <div className="col-12">
              <button
                type="submit"
                disabled={!isChecked}
                className="btn btn-success w-100"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= DEPOSIT OVERLAY ================= */}
      <div
        className="deposit-overlay"
        ref={depositOverlayRef}
        style={{ display: "none" }}
      >
        <div
          className="send-money-message bg-light"
          ref={depositMoneyMessageRef}
          style={{ display: "none" }}
        >
          <p className="text-center">
            Deposit successfully{" "}
            <i className="fa-solid fa-check send-money-message-check fs-3"></i>
          </p>
        </div>

        <button className="close-btn" onClick={() => window.location.reload()}>
          &times;
        </button>
        <div className="container bg-light p-4 rounded">
          <h2 className="text-center mb-4">Deposit money</h2>

          <form className="row g-3" onSubmit={handleDepositMoney}>
            <div className="col-12">
              <label className="form-label">Card number</label>
              <input
                className="form-control"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                required
                maxLength="19"
                value={cardNumber}
                onChange={handleCardNumberInputChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Exp</label>
              <input
                className="form-control"
                type="text"
                placeholder="MM/YY"
                maxLength="7"
                required
                value={expirationD}
                onChange={handleExpirationInputChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label">CVV</label>
              <input
                className="form-control"
                placeholder="CVV"
                maxLength={3}
                required
                value={cardVerificationValue}
                onChange={(e) =>
                  setCardVerificationValue(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>
            <div className="col-12">
              <label className="form-label">Amount</label>
              <input
                className="form-control"
                placeholder="$$"
                maxLength={6}
                required
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )
                }
              />
            </div>
            <div className="col-12 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="deposit-check-btn"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="deposit-check-btn">
                Confirm transaction
              </label>
            </div>
            <div className="col-12">
              <button
                type="submit"
                disabled={!isChecked}
                className="btn btn-success w-100"
              >
                Deposit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar dashboard-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand fs-1 text-light">AG-Bank</a>
          <span
            className="log-out-btn btn btn-lg text-light"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      </nav>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="container py-4">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <div className="p-3 border rounded bg-light h-100">
              <p className="fw-bold">Account number</p>
              <p className="fs-5">{sender.accountNumber}</p>
              <button
                className="btn btn-outline-dark"
                onClick={displayTokenValidation}
              >
                Card <i className="fa-solid fa-credit-card"></i>
              </button>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3 border rounded bg-light h-100 text-center">
              <div className="mb-2">
                <i className="fa-solid fa-user fs-3"></i>
                <span className="ms-2">
                  {user.fName} {user.lName}
                </span>
              </div>
              <span className="d-block fs-3 fw-bold text-success">
                <NumericFormat
                  value={newBalance}
                  displayType={"text"}
                  thousandSeparator=","
                  prefix="$"
                />
              </span>
              <p className="text-muted">Available balance</p>
            </div>
          </div>
        </div>

        {/* Transaction Buttons */}
        <div className="row mt-4">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-center gap-3">
            <span
              className="btn btn-dark w-100 w-md-auto"
              onClick={displaySendOverlay}
            >
              Send
            </span>
            <span
              className="btn btn-dark w-100 w-md-auto"
              onClick={displayWithdrawOverlay}
            >
              Withdraw
            </span>
            <span
              className="btn btn-dark w-100 w-md-auto"
              onClick={displayDipositOverlay}
            >
              Deposit
            </span>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="text-center mb-3">Transaction details</h2>
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id || index}>
                      <td>{transaction.transactionType}</td>
                      <td>
                        <NumericFormat
                          value={transaction.transactionAmount}
                          displayType={"text"}
                          thousandSeparator=","
                          prefix="$"
                          decimalScale={2}
                          fixedDecimalScale
                        />
                      </td>
                      <td>{transaction.transactionDate}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
