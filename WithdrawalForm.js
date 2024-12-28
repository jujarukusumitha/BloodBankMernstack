import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import './WithdrawalForm.css';
import logoImage from "../../src/Images/Home.jpg";

const WithdrawalForm = ({ customer, updateBalance }) => {
  const [withdrawalData, setWithdrawalData] = useState({
    username: customer?.username || "",
    accountNumber: customer?.accountNumber || "",
    withdrawalAmount: "",
    withdrawalType: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(withdrawalData);
    try {
      const response = await axios.post("http://localhost:3001/api/withdraw", withdrawalData);
      console.log(response.data);
      updateBalance(response.data.balance);
     

      Swal({
        title: "Withdrawal Successful!",
        text: `Amount withdrawn: ${withdrawalData.withdrawalAmount}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Withdrawal failed", error);
    }
  };

  const handleClear = () => {
    setWithdrawalData({
      ...withdrawalData,
      withdrawalAmount: "",
      withdrawalType: "",
    });
  };

  if (!customer) {
    return <div>Please log in to access the withdrawal form.</div>;
  }

  return (
    <div className="withdraw-container">
      <div className="image-withdraw-container"></div>

      <div className="text-withdraw-container">
        <img src={logoImage} alt="Hema Coding Bank logo" />
        <form onSubmit={handelSubmit}>
          <h2>Withdrawal Form :</h2>
          <p>Username: {customer.username}</p>
          <p>Account Number: {customer.accountNumber}</p>
          <label>Withdrawal Amount:</label>
          <input
            type="number"
            placeholder="Withdrawal Amount"
            value={withdrawalData.withdrawalAmount}
            onChange={(e) =>
              setWithdrawalData({
                ...withdrawalData,
                withdrawalAmount: e.target.value,
              })
            }
            required
          />
          <label>Withdrawal Type:</label>
          <input
            type="text"
            placeholder="Withdrawal Type"
            value={withdrawalData.withdrawalType}
            onChange={(e) =>
              setWithdrawalData({
                ...withdrawalData,
                withdrawalType: e.target.value,
              })
            }
            required
          />
          <button type="submit">Withdraw</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalForm;
