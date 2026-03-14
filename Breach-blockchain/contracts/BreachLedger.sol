// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BreachLedger {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    enum RecordType {
        EXPENSE,
        SETTLEMENT,
        LEDGER
    }

    struct Record {
        bytes32 hash;
        string referenceId;
        string groupId;
        RecordType recordType;
        uint256 timestamp;
        address actor;
    }

    mapping(string => Record) private records;
    mapping(string => string[]) private groupRecords;

    event RecordAnchored(
        string indexed referenceId,
        string indexed groupId,
        RecordType recordType,
        bytes32 hash,
        address actor,
        uint256 timestamp
    );

    function anchorExpense(
        string memory expenseId,
        string memory groupId,
        bytes32 hash
    ) external onlyOwner {

        require(records[expenseId].timestamp == 0, "Already exists");

        records[expenseId] = Record(
            hash,
            expenseId,
            groupId,
            RecordType.EXPENSE,
            block.timestamp,
            msg.sender
        );

        groupRecords[groupId].push(expenseId);

        emit RecordAnchored(
            expenseId,
            groupId,
            RecordType.EXPENSE,
            hash,
            msg.sender,
            block.timestamp
        );
    }

    function anchorSettlement(
        string memory settlementId,
        string memory groupId,
        bytes32 hash
    ) external onlyOwner {

        require(records[settlementId].timestamp == 0, "Already exists");

        records[settlementId] = Record(
            hash,
            settlementId,
            groupId,
            RecordType.SETTLEMENT,
            block.timestamp,
            msg.sender
        );

        groupRecords[groupId].push(settlementId);

        emit RecordAnchored(
            settlementId,
            groupId,
            RecordType.SETTLEMENT,
            hash,
            msg.sender,
            block.timestamp
        );
    }

    function anchorLedgerEntry(
        string memory entryId,
        string memory groupId,
        bytes32 hash
    ) external onlyOwner {

        require(records[entryId].timestamp == 0, "Already exists");

        records[entryId] = Record(
            hash,
            entryId,
            groupId,
            RecordType.LEDGER,
            block.timestamp,
            msg.sender
        );

        groupRecords[groupId].push(entryId);

        emit RecordAnchored(
            entryId,
            groupId,
            RecordType.LEDGER,
            hash,
            msg.sender,
            block.timestamp
        );
    }

    function verifyRecord(
        string memory referenceId,
        bytes32 hash
    ) external view returns (bool) {

        return records[referenceId].hash == hash;
    }

    function getRecord(
        string memory referenceId
    )
        external
        view
        returns (
            bytes32 hash,
            string memory groupId,
            RecordType recordType,
            uint256 timestamp,
            address actor
        )
    {
        Record memory r = records[referenceId];

        return (
            r.hash,
            r.groupId,
            r.recordType,
            r.timestamp,
            r.actor
        );
    }

    function getGroupAuditTrail(
        string memory groupId
    ) external view returns (string[] memory) {

        return groupRecords[groupId];
    }
}