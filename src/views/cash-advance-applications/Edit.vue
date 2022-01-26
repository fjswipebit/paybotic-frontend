<template>
  <Breadcrumbs :pages="pages" />

  <div class="bg-white shadow overflow-hidden sm:rounded-lg m-8">
        <form @submit.prevent="update">
            <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-between">
                <span> Edit Cash Advance Details </span>
                <div class="flex">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Save 
                    </button>
                </div>
               
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Did you miss something? You can update your MCA here. 
            </p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Principal Amount
                  </label>
                  <input
                    type="text"
                    required
                    v-model="form.principalAmount"
                    @focus="clearfield()"
                    @blur="formatCurrency(form.principalAmount)"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Factor Rate</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.factorRate"
                    v-maska="'#.####'"
                    placeholder="#.####"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Origination Fee
                  </label>
                  <input
                    type="text"
                    required
                    v-model="form.originationFee"
                    v-maska="['# %', '#.# %', '#.## %']"
                    placeholder="#.## %"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Origination Fee Amount
                  </label>
                  <input
                    type="text"
                    required
                    readonly
                    v-model="form.originationFeeAmount"
                    v-money3="money"
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Disbursed Amount</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.disbursedAmount"
                    v-money3="money"
                    readonly
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Payback Amount</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.paybackAmount"
                    v-money3="money"
                    readonly
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Date of Coverage
                      <span
                        class="text-indigo-500 font-bold"
                        v-show="form.numberOfDays > 1"
                        >({{ form.numberOfDays }} days)</span
                      ></label
                    >
                    <input
                      type="date"
                      required
                      v-model="form.startDate"
                      :min="setStartDate"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-transparent"
                      >Date of Coverage
                    </label>
                    <input
                      type="date"
                      required
                      v-model="form.endDate"
                      :min="getStartDate"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Payment Frequency</label
                    >
                    <input
                      type="text"
                      required
                      readonly
                      v-model="form.paymentFrequency"
                      class="
                        bg-gray-100
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Repayment Type</label
                    >
                    <select
                      required
                      v-model="form.repaymentType"
                      class="
                        mt-1
                        block
                        w-full
                        py-2
                        px-3
                        border border-gray-300
                        bg-white
                        rounded-md
                        shadow-sm
                        focus:outline-none
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        sm:text-sm
                      "
                    >
                      <option value="daily_fixed_amount">
                        Daily Fixed Amount
                      </option>
                      <option value="daily_witholding">Daily Witholding</option>
                    </select>
                  </div>
                </div>
                <div
                  class="col-span-6"
                  v-if="form.repaymentType == 'daily_witholding'"
                >
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Witholding Percentage</label
                    >
                    <input
                      type="text"
                      required
                      v-model="form.withHoldingPercentage"
                      v-maska="['# %', '#.# %', '#.## %', '##.## %']"
                      placeholder="##.## %"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
        </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import authHeader from "@/services/auth-header";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { Money3Directive } from "v-money3";
import { maska } from "maska";
import moment from "moment-timezone";

const pages = [
  {
    name: "List of Cash Advance Applications",
    href: "/cash-advance-applications",
    current: false,
  },
  { name: "Edit Cash Advance Application", href: "#", current: true },
];

export default {
    directives: { maska, money3: Money3Directive },
    components: {
        Breadcrumbs,
    },
    created(){
        this.getCashAdvanceInfo();
        this.moment = moment;
        var date = new Date();
        date.setDate(date.getDate() + 1);
        this.form.startDate = new Date(date).toISOString().slice(0, 10).toLocaleString("en-US", {timeZone: "America/New_York"});
    },
    setup() {
        return {
            pages,
        };
    },
    data() {
        return {
            form: {
                paymentFrequency: "daily",
                principalAmount: null,
                numberOfDays: 0,
                originationFeeAmount: 0,
                disbursedAmount: 0,
            },
            mca: null,
            money: {
                decimal: ".",
                thousands: ",",
                prefix: "$ ",
                suffix: "",
                precision: 2,
                masked: false /* doesn't work with directive */,
            },
            percentage4: {
                decimal: ".",
                thousands: ",",
                prefix: "",
                suffix: " factor rate",
                precision: 4,
                masked: false,
            },
            percentage2: {
                decimal: ".",
                thousands: ",",
                prefix: " ",
                suffix: "%",
                precision: 2,
                masked: false /* doesn't work with directive */,
            },
        };
    },
    watch: {
        "form.factorRate": function (factorRate) {
            if (this.form.principalAmount)
                this.form.paybackAmount = (
                factorRate.replace(/[^0-9.]/g, "") *
                this.form.principalAmount.replace(/[^0-9.]/g, "")
                ).toFixed(2);
        },
        "form.originationFee": function (originationFee) {
            console.log(originationFee, this.form.principalAmount);
            if (this.form.principalAmount) {
                this.form.originationFeeAmount = (
                (originationFee.replace(/[^0-9.]/g, "") / 100) *
                this.form.principalAmount.replace(/[^0-9.]/g, "")
                ).toFixed(2);
                this.form.disbursedAmount = (
                this.form.principalAmount.replace(/[^0-9.]/g, "") -
                this.form.originationFeeAmount.replace(/[^0-9.]/g, "")
                ).toFixed(2);
            }
        },
        "form.endDate": function () {
            if (this.form.startDate) {
                this.form.numberOfDays = moment(this.form.endDate)
                .add(1, "days")
                .diff(moment(this.form.startDate), "days");
            }
        },
        "form.startDate": function (startDate) {
            var date = new Date(startDate);
            date.setDate(date.getDate() + 1);
            this.form.endDate = new Date(date).toISOString().slice(0, 10);
        },
    },
    computed: {
        getStartDate() {
            var date = new Date(this.form.startDate);
            date.setDate(date.getDate() + 1);
            return new Date(date).toISOString().slice(0, 10);
        },
        setStartDate() {
            var date = new Date();
            date.setDate(date.getDate() + 1);
            return new Date(date).toISOString().slice(0, 10);
        },
        checkSubmitLink() {
            return this.existingMerchant ? this.submitForm : this.goTo(7, "next");
        },
    },
    methods: {
        async getCashAdvanceInfo() {
            await axios
                .get(
                process.env.VUE_APP_API_URL +
                    `/cash-advance-applications/` +
                    this.$route.params.id,
                {
                    headers: authHeader(),
                }
                )
                .then((response) => {
                    this.mca = response.data.data;
                    this.form.merchantId = this.mca.merchantId.merchantInformation.id
                    this.form.principalAmount = this.mca.principalAmount
                    this.form.factorRate = this.mca.factorRate
                    this.form.originationFee = this.mca.originationFee
                    this.form.originationFeeAmount = this.mca.principalAmount * this.mca.originationFee
                    this.form.startDate = this.mca.startDate
                    this.form.endDate = this.mca.endDate
                    this.form.paymentFrequency = this.mca.paymentFrequency
                    this.form.repaymentType = this.mca.repaymentType
                    this.form.withHoldingPercentage = this.mca.witholdingPercentage
                });
            },
        async update() {
            var data = {
                merchantId: this.form.merchantId,
                principalAmount: this.form.principalAmount.replace(/[^0-9.]/g, "") ?? 0,
                startDate: this.form.startDate,
                endDate: this.form.endDate,
                paymentFrequency: this.form.paymentFrequency,
                factorRate: this.form.factorRate.replace(/[^0-9.]/g, ""),
                originationFee: this.form.originationFee.replace(/[^0-9.]/g, ""),
                repaymentType: this.form.repaymentType,
                witholdingPercentage: this.form.withHoldingPercentage
                ? (
                    this.form.withHoldingPercentage.replace(/[^0-9.]/g, "") / 100
                    ).toFixed(4)
                : 0.0,
            };
            console.log(data);
            axios
                .put(
                    process.env.VUE_APP_API_URL + `/cash-advance-applications/update/`+ this.$route.params.id,
                    data,
                { headers: authHeader() }
                )
                .then((response) => {
                    console.log(response);
                    Swal.fire({
                        title: "Congratulations.",
                        text: "You have successfully updated the cash advance",
                        icon: "success",
                    });
                    window.location.reload()
                })
                .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log(
                    error.response.data.errors[0].message ??
                        error.response.data.errors
                    );
                    Swal.fire({
                    title: "Oops! Something went wrong.",
                    text: error.response.data.errors[0].message ?? "",
                    icon: "error",
                    });
                } else if (error.request) {
                    console.log(error.request);
                    Swal.fire({
                    title: "Oops! Something went wrong.",
                    text: error.request,
                    icon: "error",
                    });
                } else {
                    console.log("Error", error.message);
                    Swal.fire({
                        title: "Oops! Something went wrong.",
                        text: error.message,
                        icon: "error",
                    });
                }
            });
        },
        formatCurrency(value) {
            if (!value) {
                this.form.principalAmount = null;
                return;
            }
                value = value.replace(/[^0-9.]/g, "");
                const number = (value / 1).toFixed(2).replace(",", ".");
                this.form.principalAmount =
                    "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (this.form.factorRate)
                this.form.paybackAmount = (
                this.form.principalAmount.replace(/[^0-9.]/g, "") *
                this.form.factorRate.replace(/[^0-9.]/g, "")
                ).toFixed(2);

            if (this.form.originationFee) {
                this.form.originationFeeAmount = (
                this.form.principalAmount.replace(/[^0-9.]/g, "") *
                (this.form.originationFee.replace(/[^0-9.]/g, "") / 100)
                ).toFixed(2);
                this.form.disbursedAmount = (
                this.form.principalAmount.replace(/[^0-9.]/g, "") -
                this.form.originationFeeAmount.replace(/[^0-9.]/g, "")
                ).toFixed(2);
                console.log("disbursedAmount", this.form.disbursedAmount);
            }
        },
        clearfield() {
            // this.form.principalAmount = null;
        },
  },
}
</script>
