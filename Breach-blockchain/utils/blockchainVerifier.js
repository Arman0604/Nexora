import axios from "axios";
import { generateExpenseHash } from "./hashGenerator.js";

const BLOCKCHAIN_API = "http://localhost:4001/blockchain";

/*
Verify expense integrity
*/

export async function verifyExpenseIntegrity(expenseRecord) {

  try {

    /*
    STEP 1 — Recalculate hash from DB record
    */

    const recalculatedHash = generateExpenseHash(expenseRecord);

    /*
    STEP 2 — Ask blockchain if stored hash matches
    */

    const response = await axios.get(
      `${BLOCKCHAIN_API}/verify`,
      {
        params: {
          referenceId: expenseRecord.id,
          hash: recalculatedHash
        }
      }
    );

    const blockchainResult = response.data.valid;

    /*
    STEP 3 — Return final integrity result
    */

    return {
      referenceId: expenseRecord.id,
      recalculatedHash,
      blockchainValid: blockchainResult,
      integrity: blockchainResult === true
    };

  } catch (error) {

    return {
      referenceId: expenseRecord.id,
      integrity: false,
      error: error.message
    };

  }

}