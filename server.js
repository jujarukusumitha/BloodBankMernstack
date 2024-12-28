const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/RAJ_BANK", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  accountNumber: Number,
  branch: String,
  phoneNumber: Number,
  balance: {
    type: Number,
    default: 0,
  },
});

const Customer = mongoose.model("Customer", userSchema);

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, accountNumber, branch, phoneNumber } = req.body;
    const newCustomer = new Customer({
      username,
      password,
      accountNumber,
      branch,
      phoneNumber,
    });
    await newCustomer.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username });
    if (!customer) {
      res.status(401).json({
        message: "Invalid username ",
      });
    }
    if (customer.password !== password) {
      res.status(401).json({
        message: "Invalid password ",
      });
    }
    res.status(200).json({
      message: "Login successful",
      customer: {
        username: customer.username,
        accountNumber: customer.accountNumber,
        branch: customer.branch,
        phoneNumber: customer.phoneNumber,
        balance: customer.balance,
      },
    });
    console.log(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
const depositSchema = new mongoose.Schema({
  username: String,
  accountNumber: Number,
  date: String,
  depositAmount: Number,
  depositType: String,
});
const Deposit = mongoose.model("Deposit", depositSchema);

app.post("/api/deposit", async (req, res) => {
  try {
    const { username, accountNumber, date, depositAmount, depositType } =
      req.body;
    console.log(req.body);
    const customer = await Customer.findOne({ username, accountNumber });
    console.log(customer);
    console.log(customer.balance);
    console.log(depositAmount);
    customer.balance = Number(customer.balance) + Number(depositAmount);
    console.log(customer.balance);
    await customer.save();

    if (!customer) {
      res.status(401).json({ message: "Invalid username and account number" });
    }
    const newDeposit = new Deposit({
      username,
      accountNumber,
      date,
      depositAmount,
      depositType,
    });

    await newDeposit.save();
    return res.status(200).json({
      message: "Deposit successful",
      balance: customer.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
const withdrawalSchema = new mongoose.Schema({
  username: String,
  accountNumber: Number,
  withdrawalAmount: Number,
  withdrawalType: String,
  date: String,
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
app.post("/api/withdraw", async (req, res) => {
  try {

    const {username,accountNumber,withdrawalAmount,withdrawalType,date} = req.body;

   const customer=  await Customer.findOne({username, accountNumber});
    console.log(req.body);
    console.log(customer.balance)
    console.log(withdrawalAmount)
    customer.balance = customer.balance - withdrawalAmount;
    console.log(customer.balance)
    await customer.save()

    return res.status(200).json({
      message:"Withdrawal successful",
      balance:customer.balance
    })
    const newWithdrawal = new Withdrawal({
      username,
      accountNumber,
      withdrawalAmount,
      withdrawalType,
      date,
    });
    await newWithdrawal.save();
  }  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});