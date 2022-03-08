<template>
  <div class="px-4 mt-6 sm:px-6 lg:px-8">
    <div class="md:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{
          tab.name
        }}</option>
      </select>
    </div>
    <div class="hidden md:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="(tab, index) in tabs"
            :key="tab.name"
            href="#"
            @click="selectTab(index)"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
              'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
            <span
              v-if="tab.count"
              :class="[
                tab.current
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-900',
                'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
              ]"
              >{{ tab.count }}</span
            >
          </a>
        </nav>
      </div>
    </div>
  </div>
  <!-- Projects table (small breakpoint and up) -->
  <div class="mt-8">
    <div class="align-middle" v-show="tabs[0].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Cash Advance ID
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
                      Factor Rate
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
                      Date Applied
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="pending_ca in pending_cas" :key="pending_ca.uuid">
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
                      {{ pending_ca.id }}
                    </td>
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
                      {{ pending_ca.merchantInformation.businessName }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                    >
                      {{ formatCurrency(pending_ca.principalAmount) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ pending_ca.factorRate }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ moment(pending_ca.createdAt).format("MMM DD, YYYY") }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="`/cash-advance-applications/`"
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="pending_cas.length === 0">
                    <td
                      colspan="5"
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
                      There is no pending cash advance for approval today.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-middle" v-show="tabs[1].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Merchant ID
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
                      Legal Name
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
                      Email
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="new_merchant in new_merchants"
                    :key="new_merchant.uuid"
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
                      {{ new_merchant.merchantInformation.id }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ new_merchant.merchantInformation.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ new_merchant.merchantInformation.businessName }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ new_merchant.merchantInformation.email }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="
                          `/merchants/` +
                            new_merchant.merchantInformation.id +
                            `/show`
                        "
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="new_merchants.length === 0">
                    <td
                      colspan="5"
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
                      There is no new merchant today.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-middle" v-show="tabs[2].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Cash Advance ID
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
                      Factor Rate
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
                      Approved By
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="cash_advance in cash_advances"
                    :key="cash_advance.uuid"
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
                      {{ cash_advance.id }}
                    </td>
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
                      {{ cash_advance.merchantInformation.businessName }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                    >
                      {{ formatCurrency(cash_advance.principalAmount) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ cash_advance.factorRate }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ cash_advance.updatedBy.name }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="`/cash-advance-applications/`"
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="cash_advances.length === 0">
                    <td
                      colspan="5"
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
                      There is no new cash advance today.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-middle" v-show="tabs[3].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Cash Advance ID
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
                      Repayment Type
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
                      Remaining Principal
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
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="due in payments_today" :key="due.id">
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
                      {{ due.cashAdvanceApplicationId }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ due.merchantInformation.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ repaymentType(due.repaymentType) }}
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
                          due?.amortizationScheduleId?.total_daily_repayment
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
                          due?.amortizationScheduleId?.actual_amount_paid
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
                          due?.amortizationScheduleId?.remaining_principal
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
                          due?.amortizationScheduleId?.remaining_total_balance
                        )
                      }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <span
                        :class="[
                          paymentStatusStyles[due.status],
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                        ]"
                      >
                        {{ due.status }}
                      </span>
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="`/cash-advances/` + due.cash_advance_id + `/show`"
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="payments_today.length === 0">
                    <td
                      colspan="9"
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
                      There is no payment made today.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-middle" v-show="tabs[4].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Cash Advance ID
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
                      Factor Rate
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
                      Approved By
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="top_ca in top_mcas" :key="top_ca.uuid">
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
                      {{ top_ca.id }}
                    </td>
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
                      {{ top_ca.merchantInformation.businessName }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm text-gray-500 text-right
                      "
                    >
                      {{ formatCurrency(top_ca.principalAmount) }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_ca.factorRate }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_ca.updatedBy.name }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="`/cash-advance-applications/`"
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="top_mcas.length === 0">
                    <td
                      colspan="5"
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
                      There is no existing cash advance.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-middle" v-show="tabs[5].current">
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
                        text-left text-xs
                        font-medium
                        text-gray-500
                        uppercase
                        tracking-wider
                      "
                    >
                      Merchant ID
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
                      Legal Name
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
                      Email
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
                      Number of MCAs
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="top_merchant in top_merchants"
                    :key="top_merchant.uuid"
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
                      {{ top_merchant.merchantInformation.id }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_merchant.merchantInformation.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_merchant.merchantInformation.businessName }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_merchant.merchantInformation.email }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ top_merchant.merchantInformation.totalMCA }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-right text-sm
                        font-medium
                      "
                    >
                      <router-link
                        :to="
                          `/merchants/` +
                            top_merchant.merchantInformation.id +
                            `/show`
                        "
                        class="text-indigo-600 hover:text-indigo-900"
                        >View</router-link
                      >
                    </td>
                  </tr>
                  <tr v-show="top_merchants.length === 0">
                    <td
                      colspan="5"
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
                      There is no merchant listed.
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
</template>

<script>
import axios from "axios";
import moment from "moment-timezone";
import authHeader from "../services/auth-header";

const paymentStatusStyles = {
  partial: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  missed: "bg-red-100 text-red-800",
};

const tabs = [
  { name: "Pending MCAs", href: "#", count: "0", current: true },
  { name: "New Merchants", href: "#", count: "0", current: false },
  { name: "New Cash Advances", href: "#", count: "0", current: false },
  { name: "New Payments", href: "#", count: "0", current: false },
  { name: "Top 10 Cash Advance", href: "#", current: false },
  { name: "Top 10 Merchants", href: "#", current: false },
];

export default {
  setup() {
    return {
      paymentStatusStyles,
      tabs,
    };
  },
  data() {
    return {
      dues: [],
      new_merchants: [],
      pending_cas: [],
      cash_advances: [],
      payments_today: [],
      top_mcas: [],
      top_merchants: [],
    };
  },
  created() {
    this.moment = moment;
    this.getNewMerchants();
    this.getPendingCashAdvance();
    this.getPayments();
    this.getCashAdvance();
  },
  methods: {
    async getNewMerchants() {
      await axios
        .get(process.env.VUE_APP_API_URL + `/merchants`, {
          headers: authHeader(),
        })
        .then((response) => {
          var merchants = response.data.data;
          var count = 0;

          merchants.map((merchant) => {
            this.top_merchants.push(merchant);
            this.top_merchants
              .sort(
                (a, b) =>
                  b.merchantInformation.totalMCA -
                  a.merchantInformation.totalMCA
              )
              .splice(10);

            if (
              moment(merchant.merchantInformation.createdAt).format(
                "YYYY-MM-DD"
              ) === moment().format("YYYY-MM-DD")
            ) {
              this.new_merchants.push(merchant);
              this.new_merchants.sort(
                (a, b) => b.merchantInformation.id - a.merchantInformation.id
              );
              return count++;
            }
          });
          console.log(this.top_merchants);

          tabs[1].count = count !== 0 ? count : "0";
        });
    },
    async getPendingCashAdvance() {
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications?status=pending`,
          { headers: authHeader() }
        )
        .then((response) => {
          this.pending_cas = response.data.data;
          this.pending_cas.sort((a, b) => b.id - a.id);
          tabs[0].count =
            this.pending_cas.length > 0 ? this.pending_cas.length : "0";
        });
    },
    async getCashAdvance() {
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications?status=approved`,
          { headers: authHeader() }
        )
        .then((response) => {
          var cas = response.data.data;
          var count = 0;
          cas.map((ca) => {
            this.top_mcas.push(ca);
            this.top_mcas
              .sort((a, b) => b.principalAmount - a.principalAmount)
              .splice(10);

            if (
              moment(ca.updatedAt).format("YYYY-MM-DD") ===
              moment().format("YYYY-MM-DD")
            ) {
              this.cash_advances.push(ca);
              this.cash_advances.sort((a, b) => b.id - a.id);
              return count++;
            }
          });
          tabs[2].count = count !== 0 ? count : "0";
        });
    },
    async getPayments() {
      await axios
        .get(process.env.VUE_APP_API_URL + `/cash-advance-payments`, {
          headers: authHeader(),
        })
        .then((response) => {
          var payments = response.data.data;

          var count = 0;
          payments.map((payment) => {
            if (
              moment(payment.dateSettled).format("YYYY-MM-DD") ===
              moment().format("YYYY-MM-DD")
            ) {
              this.payments_today.push(payment);
              this.payments_today.sort((a, b) => b.id - a.id);
              return count++;
            }
          });
          tabs[3].count = count !== 0 ? count : "0";
        });
    },
    selectTab(i) {
      tabs.forEach((tab, index) => {
        if (i === index) tab.current = true;
        else tab.current = false;
      });
    },
    repaymentType(type) {
      if (type === "daily_witholding") return "Daily Withholding Percentage";
      else if (type === "daily_fixed_amount") return "Daily Fixed Amount";
      else return "";
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
