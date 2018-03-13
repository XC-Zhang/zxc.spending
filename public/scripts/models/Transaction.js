import SpendingType from "./SpendingType";

export default class Transaction {
    /**
     * Create a new transaction
     * @param {SpendingType} type SpendingType
     * @param {Number} amount Amount
     * @param {String} note Note
     * @param {Date} datetime Datetime
     */
    constructor (type, amount, note, datetime) {
        this.amount = amount;
        this.datetime = datetime;
        this.note = note;
        this.type = type;
    }

    static get default() {
        return new Transaction(SpendingType.Expense, 0.0, "", new Date());
    }
}