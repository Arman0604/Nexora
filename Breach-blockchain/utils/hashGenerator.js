import { ethers } from "ethers";

function safe(value) {
  return value ?? "";
}

/* EXPENSE */

export function generateExpenseHash(expense) {

  const canonicalData = [
    safe(expense.id),
    safe(expense.groupId),
    safe(expense.paidByUserId),
    safe(expense.amount),
    safe(expense.currency),
    safe(expense.category),
    safe(expense.description),
    safe(expense.expenseDate)
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}

/* SETTLEMENT */

export function generateSettlementHash(settlement) {

  const canonicalData = [
    safe(settlement.id),
    safe(settlement.groupId),
    safe(settlement.fromUserId),
    safe(settlement.toUserId),
    safe(settlement.amount),
    safe(settlement.currency),
    safe(settlement.settledAt)
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}

/* LEDGER */

export function generateLedgerHash(entry) {

  const canonicalData = [
    safe(entry.id),
    safe(entry.accountId),
    safe(entry.referenceId),
    safe(entry.referenceType),
    safe(entry.amount),
    safe(entry.entryType)
  ].join("|");

  return ethers.keccak256(
    ethers.toUtf8Bytes(canonicalData)
  );
}