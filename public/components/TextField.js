import Vue from "vue";
import VueMDCTextField from "vue-mdc-adapter/components/textfield/mdc-textfield.vue";
export default Vue.extend(VueMDCTextField).extend({
    props: {
        value: [String, Number],
        type: {
            validator: function (value) {
                return ["text", "email", "search", "password", "tel", "url", "number", "datetime-local"].indexOf(value) !== -1;
            }
        },
        min: String,
        step: String
    },
    mounted () {
        if (this.type === "number") {
            if (this.min !== undefined) {
                this.$refs.input.setAttribute("min", this.min);
            }
            if (this.step !== undefined) {
                this.$refs.input.setAttribute("step", this.step);
            }
        }
    }
});