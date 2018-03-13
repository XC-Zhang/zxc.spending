<template>
    <main id="new-transaction">
        <form @submit.prevent="onSubmit">
            <div id="type-selection">
                <mdc-radio v-model="transaction.type" name="radios" :value="SpendingType.Expense" label="Expense" />
                <mdc-radio v-model="transaction.type" name="radios" :value="SpendingType.Income" label="Income" />
            </div>
            <textfield type="number" required autofocus min="0" step="0.01" v-model.number="transaction.amount" label="Amount" box leading-icon="monetization_on" />
            <textfield v-model="transaction.note" label="Note" box leading-icon="comment" />
            <textfield type="datetime-local" required v-model="datetimeString" label="Datetime" box leading-icon="watch_later" />
            <mdc-button id="save-button">保存</mdc-button>
        </form>
        <mdc-snackbar />
    </main>
</template>

<script>
import SpendingType from "../scripts/models/SpendingType";
import Transaction from "../scripts/models/Transaction";
import TextField from "./TextField";
import { Storage } from "../scripts/models/Storage";
import Transaction from "../scripts/models/Transaction";

export default {
    props: {
        local: Storage,
        transaction: Transaction
    },
    data () {
        return { };
    },
    created () {
        this.SpendingType = SpendingType;
    },
    computed: {
        datetimeString: {
            get () {
                return new Date(this.transaction.datetime.valueOf() - this.transaction.datetime.getTimezoneOffset() * 60 * 1000).toISOString().substr(0, 16);
            },
            set (value) {
                this.transaction.datetime = new Date(value);
            }
        }
    },
    components: {
        "textfield": TextField
    },
    methods: {
        onSubmit () {
            this.local.transactions.add(this.transaction);
            this.$root.$emit("show-snackbar", {
                message: "Saved."
            });
            this.transaction = Transaction.default;
        }
    }
}
</script>
