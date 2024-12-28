import React from "react";
import './AccountDetails.css';
import logoImage from "../../src/Images/Home.jpg";

const AccountDetails = ({customer}) => {
  console.log(customer)
  return (
    <div className="account-container">
      <div className="image-account-container"></div>
      <div className="text-account-container">
      <img src={logoImage} alt="Hema Coding Bank logo" />

      <h2>Account Details :</h2>

      <p>Username:{customer.username}</p>
      <p>Account Number:{customer.accountNumber}</p>
      <p>Branch:{customer.branch}</p>
      <p>Phone Number:{customer.phoneNumber}</p>
      <p>Available Balance:{customer.balance}</p>
    </div>
    </div>
  );
};

export default AccountDetails;