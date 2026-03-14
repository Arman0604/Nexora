import axios from "axios";
import express from "express";

const API = "http://localhost:4001/blockchain";

const app = express();
app.use(express.json());

const TEST_PORT = 4002;


/*
STORE EXPENSE
POST /test/expense
*/

app.post("/test/expense", async (req, res) => {

  try {

    const expense = req.body;

    console.log("Received expense:", expense);

    const result = await axios.post(`${API}/expense`, expense);

    console.log("Expense Stored:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
VERIFY EXPENSE
POST /test/verify-expense
*/

app.post("/test/verify-expense", async (req, res) => {

  try {

    const expense = req.body;

    console.log("Verifying expense:", expense);

    const result = await axios.post(`${API}/verify-expense`, expense);

    console.log("Expense Verified:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
STORE SETTLEMENT
POST /test/settlement
*/

app.post("/test/settlement", async (req, res) => {

  try {

    const settlement = req.body;

    console.log("Received settlement:", settlement);

    const result = await axios.post(`${API}/settlement`, settlement);

    console.log("Settlement Stored:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
VERIFY SETTLEMENT
POST /test/verify-settlement
*/

app.post("/test/verify-settlement", async (req, res) => {

  try {

    const settlement = req.body;

    console.log("Verifying settlement:", settlement);

    const result = await axios.post(`${API}/verify-settlement`, settlement);

    console.log("Settlement Verified:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
STORE LEDGER
POST /test/ledger
*/

app.post("/test/ledger", async (req, res) => {

  try {

    const ledger = req.body;

    console.log("Received ledger:", ledger);

    const result = await axios.post(`${API}/ledger`, ledger);

    console.log("Ledger Stored:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
VERIFY LEDGER
POST /test/verify-ledger
*/

app.post("/test/verify-ledger", async (req, res) => {

  try {

    const ledger = req.body;

    console.log("Verifying ledger:", ledger);

    const result = await axios.post(`${API}/verify-ledger`, ledger);

    console.log("Ledger Verified:", result.data);

    res.json(result.data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


/*
HEALTH CHECK
GET /test
*/

app.get("/test", (req, res) => {
  res.json({ status: "Test server running" });
});


app.listen(TEST_PORT, () => {
  console.log(`Test server listening on port ${TEST_PORT}`);
  console.log(`Send POST requests to:`);
  console.log(`  Store:  /test/expense, /test/settlement, /test/ledger`);
  console.log(`  Verify: /test/verify-expense, /test/verify-settlement, /test/verify-ledger`);
});