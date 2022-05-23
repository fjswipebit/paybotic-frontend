<template>
    <!-- <div class="px-4 mt-6 sm:px-6 lg:px-8">
    <div class="flex justify-between">
      <div class="flex justify-start">
        <div>
          <button
            @click="exportToExcel"
            type="button"
            class="
              inline-flex
              items-center
              px-4
              py-2
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-indigo-700
              bg-indigo-100
              hover:bg-indigo-200
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
            <DocumentDownloadIcon
              class="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Export Table
          </button>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          @click="reset"
          type="button"
          class="
            inline-flex
            items-center
            px-4
            py-2 
            mr-3
            border border-transparent
            text-sm
            font-medium
            rounded-md
            text-red-700
            bg-red-100
            hover:bg-red-200
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          "
        >
          <RefreshIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Reset
        </button>
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <div
            class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
              "
          >
            <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            v-model="search"
            class="
                focus:ring-indigo-500
                focus:border-indigo-500
                block
                w-full
                rounded-none rounded-l-md
                pl-10
                sm:text-sm
                border-gray-300
              "
            placeholder="Search"
          />
        </div>
        <button
          class="
            -ml-px
            relative
            inline-flex
            items-center
            space-x-2
            px-4
            py-2
            border border-gray-300
            text-sm
            font-medium
            rounded-r-md
            text-gray-700
            bg-gray-50
            hover:bg-gray-100
            focus:outline-none
            focus:ring-1 focus:ring-indigo-500
            focus:border-indigo-500
          "
          @click="getPayments"
        >
          <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  </div> -->
    <div class="mt-8">
        <div class="align-middle">
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto">
                    <div
                        class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                    >
                        <div
                            class="
                shadow
                overflow-hidden
                border-b border-gray-200
                sm:rounded-lg
              "
                        >
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Date and Time of Payment
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Business Name (DBA)
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Amount Due
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Amount Paid
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Total Amount Paid
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Factoring Fees
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        text-right
                        px-6
                        py-3
                        text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Remaining Principal
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        text-right
                        px-6
                        py-3
                        text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Remaining Total Balance
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        text-right
                        px-6
                        py-3
                        text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Period
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        text-right
                        px-6
                        py-3
                        text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                        px-6
                        py-3
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                                        >
                                            Cash Advance ID
                                        </th>
                                        <!-- <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th> -->
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="payment in payments"
                                        :key="payment.id"
                                    >
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                moment(
                                                    payment?.dateInitiated
                                                ).format("MM/DD/YYYY h:mm a")
                                            }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                payment.merchantInformation
                                                    .businessName
                                            }}
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment
                                                        ?.amortizationScheduleId
                                                        ?.total_daily_repayment
                                                )
                                            }}
                                            <!-- {{ formatCurrency(payment.withHoldingAmount) }} -->
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment
                                                        ?.amortizationScheduleId
                                                        ?.actual_amount_paid
                                                )
                                            }}
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment
                                                        ?.amortizationScheduleId
                                                        ?.actual_amount_paid
                                                )
                                            }}
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment.factoringFees
                                                )
                                            }}
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment.remainingPrincipal
                                                )
                                            }}
                                        </td>
                                        <td
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                                        >
                                            {{
                                                formatCurrency(
                                                    payment?.remainingTotalBalance
                                                )
                                            }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                payment.durationOfCashAdvance +
                                                    " days"
                                            }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            <span
                                                class="
                          inline-flex
                          items-center
                          px-3
                          py-0.5
                          rounded-full
                          text-sm
                          font-medium
                          uppercase
                        "
                                                :class="{
                                                    'bg-green-100 text-green-800':
                                                        payment
                                                            .cashAdvanceApplicationId
                                                            .status == 'FULL',
                                                    'bg-blue-100 text-blue-800':
                                                        payment
                                                            .cashAdvanceApplicationId
                                                            .status != 'FULL',
                                                }"
                                            >
                                                {{ payment.status }}
                                            </span>
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                payment.cashAdvanceApplicationId
                                            }}
                                        </td>
                                    </tr>
                                    <tr v-show="payments.length === 0">
                                        <td
                                            colspan="10"
                                            class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm
                        font-medium
                        text-gray-500 text-center
                        italic
                      "
                                        >
                                            The payments table is currently
                                            empty.
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="10">
                                            <Pagination
                                                :pagination="pagination"
                                                @update="getPayments"
                                            />
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import Pagination from "@/components/Pagination";
import authHeader from "../services/auth-header";
// import {
//   SearchIcon,
//   FilterIcon,
//   DocumentDownloadIcon,
//   RefreshIcon,
// } from "@heroicons/vue/solid";

export default {
    components: {
        // SearchIcon,
        // FilterIcon,
        Pagination,
        // DocumentDownloadIcon,
        // RefreshIcon,
    },
    data() {
        return {
            search: "",
            pagination: "",
            payments: "",
        };
    },
    methods: {
        reset() {
            this.search = null;
            this.getPayments();
        },
        async getPayments(page, search) {
            var url =
                process.env.VUE_APP_API_URL +
                `/cash-advance-payments?order=desc&per_page=10&page=1`;

            if (page)
                url =
                    process.env.VUE_APP_API_URL +
                    `/cash-advance-payments?order=desc&per_page=10&page=` +
                    page;
            else if (search)
                url =
                    process.env.VUE_APP_API_URL +
                    `/cash-advance-payments?order=desc&per_page=10&page=1&search=` +
                    search;

            Swal.fire({
                title: "Fetching payments",
                text: "Please wait.",
                icon: "info",
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                    Swal.getHtmlContainer().querySelector("b");
                },
            });
            axios.get(url, { headers: authHeader() }).then((response) => {
                console.log(response.data.data.data);
                console.log(response);
                const _payments = response.data.data.data
                    .slice()
                    .sort((a, b) => {
                        return (
                            new Date(b.dateInitiated) -
                            new Date(a.dateInitiated)
                        );
                    });

                this.payments = _payments;
                this.pagination = response.data.data;
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Payments fetched",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            });
        },
        async exportToExcel() {
            await axios
                .post(
                    process.env.VUE_APP_API_URL +
                        `/cash-advance-payments/export`,
                    "",
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    window.location.href = response.data.data;
                });
        },
        formatCurrency(value) {
            if (!value) {
                return "$ 0.00";
            }
            const number = (value / 1).toFixed(2).replace(",", ".");
            return (
                "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
        },
    },
    created() {
        this.getPayments();
        this.moment = moment;
    },
};
</script>
