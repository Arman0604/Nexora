import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

/*
Resolve directory path
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
Load contract ABI
*/

const abiPath = path.join(__dirname, "../contracts/abi.json");

const abi = JSON.parse(
  fs.readFileSync(abiPath, "utf8")
);

/*
Blockchain provider
*/

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

/*
Wallet
*/

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

/*
Contract instance
*/

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);


/*
ANCHOR EXPENSE
Store expense hash on blockchain
*/

export async function anchorExpense(expenseId, groupId, hash) {

  try {

    const tx = await contract.anchorExpense(
      expenseId,
      groupId,
      hash
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {

    throw new Error(`Expense anchoring failed: ${error.message}`);

  }

}


/*
ANCHOR SETTLEMENT
Store settlement hash on blockchain
*/

export async function anchorSettlement(settlementId, groupId, hash) {

  try {

    const tx = await contract.anchorSettlement(
      settlementId,
      groupId,
      hash
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {

    throw new Error(`Settlement anchoring failed: ${error.message}`);

  }

}


/*
ANCHOR LEDGER ENTRY
Store ledger hash on blockchain
*/

export async function anchorLedgerEntry(entryId, referenceId, hash) {

  try {

    const tx = await contract.anchorLedgerEntry(
      entryId,
      referenceId,
      hash
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {

    throw new Error(`Ledger anchoring failed: ${error.message}`);

  }

}


/*
VERIFY RECORD
Check if hash exists on blockchain
*/

export async function verifyRecord(referenceId, hash) {

  try {

    const valid = await contract.verifyRecord(
      referenceId,
      hash
    );

    return valid;

  } catch (error) {

    throw new Error(`Verification failed: ${error.message}`);

  }

}