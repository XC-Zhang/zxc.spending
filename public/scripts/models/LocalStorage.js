import { Storage, TransactionCollection } from "./Storage";
import Transaction from "./Transaction";

export class LocalTransactionCollection extends TransactionCollection {
    constructor () {
        super();
        let t = localStorage.getItem(TransactionCollection.collectionName);
        if (t === null) {
            this._entries = [];
        } else {
            this._entries = JSON.parse(t, function (key, value) {
                if (key === "datetime") {
                    return new Date(value);
                } else if (Array.isArray(this)) {
                    return new Transaction(value.type, value.amount, value.note, value.datetime);
                } else {
                    return value;
                }
            });
        }
    }

    /**
     * @param {Transaction} document 
     */
    add (document) {
        this._entries.push(document);
        this.save();
    }

    /**
     * @returns {Transaction[]}
     */
    getAll () {
        return this._entries;
    }

    /**
     * @param {Number | String} id 
     * @returns {Transaction}
     */
    getById (id) {
        if (typeof id === "string") {
            id = parseInt(id, 10);
        }
        return this._entries[id];
    }

    save () {
        let t = JSON.stringify(this._entries);
        localStorage.setItem(TransactionCollection.collectionName, t);
    }
}

export class Local extends Storage {
    constructor () {
        super(new LocalTransactionCollection());
    }
}