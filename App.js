import "./App.css";
import Home from "./Home";
import Login from "./Forms/Login";
import Registration from "./Forms/Registration";
import AccountDetails from "./Forms/AccountDetails";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DepositForm from "./Forms/DepositForm";
import WithdrawalForm from "./Forms/WithdrawalForm";

function App() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(); // Holds logged-in customer details
  const [updatedBalance, setUpdatedBalance] = useState(0); // Balance updates
  

  const updateBalance = (newBalance) => {
    setUpdatedBalance(newBalance);
  };

  const updateCustomer = (userData) => {
    setCustomer(userData);
    console.log(userData);
  };

  const handleLogout = () => {
    setCustomer(null);
   
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {!customer ? (
            <>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/account-details">
                  Account Details
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/deposit">
                  Deposit
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/withdraw">
                  Withdraw
                </Link>
              </li>
              <li>
                
                {(
                  <button
                    onClick={handleLogout} className="nav-link"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#f04e30",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login updateCustomer={updateCustomer} />}
        />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/account-details"
          element={
            <AccountDetails customer={customer} updatedBalance={updatedBalance} />
          }
        />
        <Route
          path="/deposit"
          element={<DepositForm customer={customer} updateBalance={updateBalance} />}
        />
        <Route
          path="/withdraw"
          element={
            <WithdrawalForm customer={customer} updateBalance={updateBalance} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
