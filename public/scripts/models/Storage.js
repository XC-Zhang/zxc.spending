import Transaction from "./Transaction";

export class TransactionCollection {
    static get collectionName () {
        return "TransactionCollection";
    }

    /**
     * @param {Transaction} document 
     */
    add (document) {

    }

    /**
     * @returns {Transaction[]}
     */
    getAll () {

    }

    /**
     * @returns {Transaction}
     */
    getById (id) {

    }
}

export class Storage {
    /**
     * @param {TransactionCollection} transactions 
     */
    constructor (transactions) {
        this.transactions = transactions;
    }
}