import Vue from "vue";
import VueRouter from "vue-router";
import VueMDCButton from "vue-mdc-adapter/components/button";
import VueMDCDrawer from "vue-mdc-adapter/components/drawer";
import VueMDCLayoutApp from "vue-mdc-adapter/components/layout-app";
import VueMDCLinearProgress from "vue-mdc-adapter/components/linear-progress";
import VueMDCList from "vue-mdc-adapter/components/list";
import VueMDCRadio from "vue-mdc-adapter/components/radio";
import VueMDCSnackbar from "vue-mdc-adapter/components/snackbar";
import VueMDCTextField from "vue-mdc-adapter/components/textfield";
import VueMDCToolbar from "vue-mdc-adapter/components/toolbar";
import App from "../components/app.vue";
import New from "../components/new.vue";
import Transactions from "../components/transactions.vue";
import Transaction from "./models/Transaction";
import { Local } from "./models/LocalStorage";
Vue.use(VueRouter);
Vue.use(VueMDCButton);
Vue.use(VueMDCDrawer);
Vue.use(VueMDCLayoutApp);
Vue.use(VueMDCLinearProgress);
Vue.use(VueMDCList);
Vue.use(VueMDCRadio);
Vue.use(VueMDCSnackbar);
Vue.use(VueMDCTextField);
Vue.use(VueMDCToolbar);
const local = new Local();
const router = new VueRouter({
    mode: "history",
    routes: [{
        path: "/new",
        component: New,
        props: {
            local,
            transaction: Transaction.default    
        }
    }, {
        path: "/transactions/:id",
        name: "transaction",
        component: New,
        props (route) {
            return {
                transaction: local.transactions.getById(route.params.id),
                local
            };
        }
    }, {
        path: "/transactions",
        name: "transactions",
        component: Transactions,
        props: { 
            local
        }
    }, {
        path: "*",
        redirect: "/new"
    }]
});
new Vue({
    el: "#vue-app",
    render (h) {
        return h(App);
    },
    router
});