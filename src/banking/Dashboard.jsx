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

  // ... aquí dejas todas tus funciones iguales (send, deposit, withdraw, logout, etc) ...

  return (
    <div className="dashboard-container">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4 align-items-center">
          {/* Account Info */}
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

          {/* User Info + Balance */}
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

        {/* Transactions Table */}
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
