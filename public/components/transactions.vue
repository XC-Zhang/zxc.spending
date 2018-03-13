<template>
    <main id="transactions">
        <mdc-list bordered two-line interactive>
            <mdc-list-item v-for="(t, index) in transactions" :key=index @click="onListItemClick(t, index)">
                <span>
                    <span :class="{ 'mdc-theme--secondary': t.type === SpendingType.Income }">{{ toMoneyString(t.amount) }}</span>
                    <span></span>
                    <span>{{ toLocalDateTimeString(t.datetime) }}</span>
                </span>
                <span slot="secondary">{{ t.note }}</span>
            </mdc-list-item>
        </mdc-list>
    </main>
</template>

<script>
import { Storage } from "../scripts/models/Storage";
import SpendingType from "../scripts/models/SpendingType";

export default {
    props: {
        local: Storage
    },
    data () {
        return {
            transactions: []
        }
    },
    created () {
        this.SpendingType = SpendingType;
    },
    mounted () {
        this.transactions = this.local.transactions.getAll();
    },
    methods: {
        /**
         * @param {Date} datetime
         */
        toLocalDateTimeString (datetime) {
            const timezone = datetime.getTimezoneOffset();
            const t = new Date(datetime.valueOf() - timezone * 60 * 1000);
            return t.toISOString().replace("T", " ").substr(0, 16);
        },
        /**
         * @param {Number} amount
         */
        toMoneyString (amount) {
            return amount.toFixed(2);
        },
        onListItemClick (transaction, index) {
            this.$router.push({
                name: "transaction",
                params: { id: index }
            });
        }
    }
}
</script>
