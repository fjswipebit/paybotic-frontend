<template>
  <Breadcrumbs :pages="pages" />

  <main>
    <div class="gap-0 grid grid-cols-1 mt-8 sm:px-6">
      <div class="space-y-6">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <div
                class="
                  -ml-4
                  -mt-4
                  flex
                  justify-between
                  items-center
                  flex-wrap
                  sm:flex-nowrap
                "
              >
                <div class="ml-4 mt-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Cash Advance Information
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Cash advance information and all about its payments.
                  </p>
                </div>
                <div class="ml-4 mt-4 flex-shrink-0">
                  <a
                    v-show="
                      cash_advance.status == 'pending' &&
                        cash_advance.merchantInformation.email == user_email
                    "
                    :href="
                      `/cash-advance-applications/` + cash_advance.id + `/edit`
                    "
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                  >
                    Edit
                  </a>
                  <a
                    :href="`/merchants/` + merchant.id + `/show`"
                    class="
                      relative
                      inline-flex
                      items-center
                      px-4
                      py-2
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-indigo-600
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    "
                  >
                    View Merchant Information
                  </a>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
              <!-- tabs -->
              <div class="mb-8">
                <div class="sm:hidden">
                  <label for="tabs" class="sr-only">Select a tab</label>
                  <select
                    id="tabs"
                    name="tabs"
                    class="
                      block
                      w-full
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      border-gray-300
                      rounded-md
                    "
                    @change="selectTab($event, 'select')"
                  >
                    <option
                      v-for="(tab, index) in tabs"
                      :key="tab.name"
                      :selected="tab.current"
                      :value="index"
                    >
                      {{ tab.name }}
                    </option>
                  </select>
                </div>
                <div class="hidden sm:block">
                  <div class="border-b border-gray-200">
                    <nav class="-mb-px flex" aria-label="Tabs">
                      <a
                        v-for="(tab, index) in tabs"
                        :key="tab.name"
                        href="#"
                        :class="[
                          tab.current
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm',
                        ]"
                        :aria-current="tab.current ? 'page' : undefined"
                        @click="selectTab(index)"
                      >
                        {{ tab.name }}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              <!-- contents -->
              <div v-if="tabs[0].current === true">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Merchant ID
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.id }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Business Name (DBA)
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessName }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Repayment Type
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ repayment_type }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Legal Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.name }}
                    </dd>
                  </div>
                  <div
                    class="sm:col-span-1"
                    :class="{
                      hidden: cash_advance.repaymentType != 'daily_witholding',
                    }"
                  >
                    <dt class="text-sm font-medium text-gray-500">
                      Withholding Percentage
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        (cash_advance.witholdingPercentage * 100).toFixed(2) +
                          "%" ?? "-"
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <span
                        :class="[
                          statusStyles[cash_advance.status],
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                        ]"
                      >
                        {{
                          cash_advance.status === "approved"
                            ? "Active"
                            : cash_advance.status
                        }}
                      </span>
                      <span
                        class="text-xs ml-2"
                        v-if="cash_advance.status === 'approved'"
                      >
                        <a
                          href="#"
                          @click="changeStatus('default')"
                          class="
                            whitespace-nowrap
                            font-medium
                            text-blue-700
                            hover:text-blue-600
                          "
                          >Change to default
                        </a>
                      </span>
                      <span
                        class="text-xs ml-2"
                        v-if="cash_advance.status === 'default'"
                      >
                        <a
                          href="#"
                          @click="changeStatus('approved')"
                          class="
                            whitespace-nowrap
                            font-medium
                            text-blue-700
                            hover:text-blue-600
                          "
                          >Change to active
                        </a>
                      </span>
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Date of Duration
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <span
                        >{{
                          moment(cash_advance.startDate).format("MM/DD/YYYY")
                        }}
                        to
                        {{ moment(cash_advance.endDate).format("MM/DD/YYYY") }}
                      </span>
                      <span class="text-gray-400"> ({{ dateDiff }} days)</span>
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Payment Frequency
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 capitalize">
                      {{ cash_advance.paymentFrequency }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Cash Advance Amount (Purchase Price)
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ formatCurrency(cash_advance.principalAmount) }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Payback Amount
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ formatCurrency(payback_amount) }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Factor Rate
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ cash_advance.factorRate }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Origination Fee
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ cash_advance.originationFee }}%
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Disbursed Amount
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ formatCurrency(disbursed_amount) ?? "-" }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Origination Fee Amount
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        formatCurrency(
                          cash_advance.principalAmount *
                            (cash_advance.originationFee / 100)
                        ) ?? "-"
                      }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div v-if="tabs[1].current === true">
                <div class="flex flex-shrink-0 justify-end my-4">
                  <button
                    @click="exportToExcel"
                    class="
                      relative
                      inline-flex
                      items-center
                      px-4
                      py-2
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-indigo-600
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    "
                  >
                    Export to Excel
                  </button>
                </div>
                <div class="flex flex-col">
                  <div
                    class="-my-2 overflow-x-auto max-h-128 sm:-mx-6 lg:-mx-4"
                  >
                    <div
                      class="
                        py-2
                        align-middle
                        inline-block
                        min-w-full
                        sm:px-6
                        lg:px-4
                      "
                    >
                      <div
                        class="
                          shadow
                          overflow-hidden
                          border-b border-gray-200
                          sm:rounded-lg
                        "
                      >
                        <table
                          class="
                            min-w-full
                            divide-y divide-gray-200
                            border border-collapse
                          "
                        >
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                colspan="6"
                                scope="colgroup"
                                class="
                                  border-r border-b
                                  font-medium
                                  px-6
                                  py-3
                                  text-center text-gray-500 text-xs
                                  tracking-wider
                                  uppercase
                                "
                              >
                                FORECAST
                              </th>
                              <th
                                colspan="6"
                                scope="colgroup"
                                class="
                                  border-r border-b
                                  font-medium
                                  px-6
                                  py-3
                                  text-center text-gray-500 text-xs
                                  tracking-wider
                                  uppercase
                                "
                              >
                                ACTUAL
                              </th>
                              <th
                                scope="col"
                                rowspan="2"
                                class="
                                  border-r
                                  font-medium
                                  px-6
                                  py-3
                                  text-center text-gray-500 text-xs
                                  tracking-wider
                                  uppercase
                                "
                              >
                                Due Date
                              </th>
                              <th
                                scope="col"
                                rowspan="2"
                                class="
                                  border-r
                                  font-medium
                                  px-6
                                  py-3
                                  text-center text-gray-500 text-xs
                                  tracking-wider
                                  uppercase
                                "
                              >
                                Date Paid
                              </th>
                              <th
                                scope="col"
                                rowspan="2"
                                class="
                                  font-medium
                                  px-6
                                  py-3
                                  text-center text-gray-500 text-xs
                                  tracking-wider
                                  uppercase
                                "
                              >
                                Status
                              </th>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                class="
                                  border-b
                                  px-6
                                  py-3
                                  text-left text-xs
                                  font-medium
                                  text-gray-500
                                  uppercase
                                  tracking-wider
                                "
                              >
                                Day
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
                                Principal Amount
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
                                  px-6
                                  py-3
                                  text-left text-xs
                                  font-medium
                                  text-gray-500
                                  uppercase
                                  tracking-wider
                                "
                              >
                                Total Daily Repayment
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
                                Remaining Principal Amount
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
                                  border-r
                                "
                              >
                                Remaining Total Balance
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
                                Daily Sales Reciepts
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
                                Withholding %
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
                                Principal Amount
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
                                  px-6
                                  py-3
                                  text-left text-xs
                                  font-medium
                                  text-gray-500
                                  uppercase
                                  tracking-wider
                                "
                              >
                                Remaining Principal Amount
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
                                  border-r
                                "
                              >
                                Remaining Total Balance
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                              v-for="(period, index) in amortization_sched"
                              :key="index"
                            >
                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm
                                  font-medium
                                  text-gray-900
                                "
                              >
                                {{ index + 1 }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(period.principalAmount) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(period.factoringFees) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(period.totalDailyRepayment) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(period.remainingPrincipal) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                  border-r
                                "
                              >
                                {{
                                  formatCurrency(period.remainingTotalBalance)
                                }}
                              </td>

                              <!-- actual -->
                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(period.payments.dailySales) }}
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
                                    period.payments.withHoldingAmount
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
                                    period.payments.principalAmount
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
                                  formatCurrency(period.payments.factoringFees)
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
                                    period.payments.remainingPrincipal
                                  )
                                }}
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{
                                  formatCurrency(
                                    period.payments.remainingTotalBalance
                                  )
                                }}
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{
                                  moment(period.settlementDate).format(
                                    "MM/DD/YYYY"
                                  )
                                }}
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{
                                  moment(period.payments.date).format(
                                    "MM/DD/YYYY"
                                  )
                                }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500
                                "
                              >
                                <span
                                  :class="[
                                    paymentStatusStyles[period.status],
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                                  ]"
                                >
                                  {{ period.status }}
                                </span>
                              </td>
                            </tr>
                            <tr
                              v-for="(payment, index) in separate_payments"
                              :key="index"
                            >
                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm
                                  font-medium
                                  text-gray-900
                                "
                              >
                                {{ amortization_scheds?.length + (index + 1) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(0) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(0) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(0) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(0) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                  border-r
                                "
                              >
                                {{ formatCurrency(0) }}
                              </td>

                              <!-- actual -->
                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(payment.dailySales) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(payment.withHoldingAmount) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(payment.principalAmount) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(payment.factoringFees) }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ formatCurrency(payment.remainingPrincipal) }}
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{
                                  formatCurrency(payment.remainingTotalBalance)
                                }}
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                -
                              </td>

                              <td
                                class="
                                  border-r
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{ moment(payment.date).format("MM/DD/YYYY") }}
                              </td>

                              <td
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500
                                "
                              >
                                <span
                                  :class="[
                                    paymentStatusStyles[period.status],
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                                  ]"
                                >
                                  {{ payment.status }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import moment from "moment-timezone";
import Breadcrumbs from "@/components/Breadcrumbs";
import authHeader from "@/services/auth-header";

const pages = [
  { name: "List of Cash Advance", href: "/cash-advance", current: false },
  { name: "View Cash Advance Information", href: "#", current: true },
];

const statusStyles = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  default: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800",
};

const paymentStatusStyles = {
  partial: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  missed: "bg-red-100 text-red-800",
};

export default {
  components: {},
  setup() {
    return {
      Breadcrumbs,
      statusStyles,
      paymentStatusStyles,
      pages,
    };
  },
  data() {
    return {
      amortization_sched: "",
      separate_payments: [],
      cash_advance: "",
      user_email: "",
      merchant: "",
      tabs: [
        { name: "Basic Information", href: "#", current: true },
        { name: "Amortization Schedule", href: "#", current: false },
      ],
    };
  },
  created() {
    this.getCashAdvanceInfo();
    this.getAmortizationSched();
    this.getPayments();
    this.moment = moment;
    this.user_email = localStorage.getItem("user_email");
  },
  mounted() {
    if (this.$route.query.amortsched === "true") this.selectTab(1);
  },
  computed: {
    repayment_type() {
      if (this.cash_advance.repaymentType === "daily_witholding")
        return "Daily Withholding Percentage";
      else if (this.cash_advance.repaymentType === "daily_fixed_amount")
        return "Daily Fixed Amount";
      else return "";
    },
    dateDiff() {
      return moment(this.cash_advance.endDate)
        .add(1, "days")
        .diff(moment(this.cash_advance.startDate), "days");
    },
    payback_amount() {
      var payback_amount =
        this.cash_advance.principalAmount * this.cash_advance.factorRate;
      return payback_amount.toFixed(2);
    },
    disbursed_amount() {
      var disbursed_amount =
        this.cash_advance.principalAmount -
        this.cash_advance.principalAmount *
          (this.cash_advance.originationFee / 100);
      return disbursed_amount.toFixed(2);
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
          console.log(response);
          this.cash_advance = response.data.data;
          this.merchant = response.data.data.merchantInformation;
        });
    },
    async getPayments() {
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            `/cash-advance-payments?cash_advance_application_id=` +
            this.$route.params.id,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          var payments = response.data.data;

          payments.forEach((payment) => {
            var count = 0;
            this.amortization_sched.forEach((sched) => {
              if (payment.id === sched.payments.id) count++;
            });

            if (count === 0) this.separate_payments.push(payment);
          });
        });
    },
    async getAmortizationSched() {
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            `/amortization-schedules?cash_advance_application_id=` +
            this.$route.params.id,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          this.amortization_sched = response.data.data;
        });
    },
    async changeStatus(status) {
      await axios
        .put(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications/` +
            this.$route.params.id,
          {
            status: status,
          },
          {
            headers: authHeader(),
          }
        )
        .then(() => {
          window.location.href =
            "/cash-advances/" + this.$route.params.id + "/show";
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    },
    async exportToExcel() {
      await axios
        .post(
          process.env.VUE_APP_API_URL +
            `/amortization-schedules/` +
            this.$route.params.id,
          "",
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          window.location.href = response.data.data;
        });
    },
    selectTab(i, type) {
      // if(this.$route.fullPath.includes("false") ){

      // }
      var tabIndex = i;
      if (type === "select") tabIndex = event.target.options.selectedIndex;
      this.tabs.forEach((tab, index) => {
        if (index === tabIndex) tab.current = true;
        else tab.current = false;
        console.log(index === tabIndex, index, tabIndex);
      });
    },
    formatCurrency(value) {
      if (!value) {
        return "$ 0.00";
      }
      const number = (value / 1).toFixed(2).replace(",", ".");
      return "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
