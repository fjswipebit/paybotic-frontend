<template>
  <Breadcrumbs :pages="pages" />
  <main class="py-10">
    <!-- Page header -->
    <div
      class="
        max-w-3xl
        mx-auto
        px-4
        sm:px-6
        md:flex
        md:items-center
        md:justify-between
        md:space-x-5
        lg:max-w-7xl
        lg:px-8
      "
    >
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              class="h-16 w-16 rounded-full"
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              alt=""
            />
            <span
              class="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ merchant.merchantInformation.name }}
          </h1>
          <p class="text-sm font-medium text-gray-500">
            Member since
            <time datetime="2020-08-25">{{
              moment(merchant.merchantInformation.created_at).format(
                "MM/DD/YYYY"
              )
            }}</time>
          </p>
          <p class="text-sm font-medium text-gray-500">
            KYC Status:
            <a
              :class="[
                this.merchant.merchantInformation.kyc_status === 'verified'
                  ? `text-green-400`
                  : `text-red-600`,
              ]"
              >{{
                this.merchant.merchantInformation.kyc_status === "verified"
                  ? "Verified"
                  : "Not verified"
              }}</a
            >
          </p>
        </div>
      </div>
      <div
        class="
          mt-6
          flex flex-col-reverse
          justify-stretch
          space-y-4 space-y-reverse
          sm:flex-row-reverse
          sm:justify-end
          sm:space-x-reverse sm:space-y-0 sm:space-x-3
          md:mt-0
          md:flex-row
          md:space-x-3
        "
      >
        <button
          @click="handleLinkingBankAccount()"
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
              text-white
              focus:outline-none
            "
          :class="[
            this.merchant.merchantInformation.kyc_status === 'verified'
              ? `bg-blue-700 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`
              : `bg-blue-300`,
          ]"
          :disabled="
            this.merchant.merchantInformation.kyc_status === 'verified'
              ? false
              : true
          "
        >
          Link Bank Account
        </button>
        <button
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            border border-gray-300
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-gray-700
            bg-white
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-gray-100
            focus:ring-blue-500
          "
        >
          <a :href="`/merchants/` + this.merchantId + `/edit`">
            Edit
          </a>
        </button>
      </div>
    </div>

    <div
      class="
        mt-8
        max-w-3xl
        mx-auto
        grid grid-cols-1
        gap-6
        sm:px-6
        lg:max-w-7xl
        lg:grid-flow-col-dense lg:grid-cols-3
      "
    >
      <div class="space-y-6 lg:col-start-1 lg:col-span-2">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Additional Information
              </h2>
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
                          'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm',
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
                  <div class="sm:col-span-2 -mb-10">
                    <h2
                      class="
                        text-gray-800 text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      "
                    >
                      Legal Address
                    </h2>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Street Address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.streetAddress }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.city }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">State</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.state }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Country</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.country }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Zip Code</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.zipCode }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Corporate Phone
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.phoneNumber }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Fax Number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.corporateAddress.faxNumber }}
                    </dd>
                  </div>
                  <div
                    class="sm:col-span-2 border-gray-200 border-t -mx-6"
                  ></div>
                  <div class="sm:col-span-2 -mb-10">
                    <h2
                      class="
                        text-gray-800 text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      "
                    >
                      Physical Address
                    </h2>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Street Address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.streetAddress }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.city }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">State</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.state }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Country</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.country }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Zip Code</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.zipCode }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Corporate Phone
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.phoneNumber }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Fax Number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.physicalAddress.faxNumber }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div v-if="tabs[1].current === true">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Owner 1 Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        merchant.businessInformation.owner1FirstName +
                          " " +
                          merchant.businessInformation.owner1LastName
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Owner 2 Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        merchant.businessInformation.owner2FirstName +
                          " " +
                          merchant.businessInformation.owner2LastName
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Primary Contact Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.primaryContactName }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Business Entity
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ businessEntity }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Job Title</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.title }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Business Formation
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <span
                        >{{
                          moment(
                            merchant.businessInformation.businessFormationDate
                          ).format("MMMM YYYY")
                        }}
                      </span>
                      <span class="text-gray-400"> ({{ dateDiff }})</span>
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Federal Tax ID Number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.idNumber }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Tin Type</dt>
                    <dd class="mt-1 text-sm text-gray-900 uppercase">
                      {{ merchant.businessInformation.tinType }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Number of Locations
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.numberOfLocations }}
                    </dd>
                  </div>
                  <div class="sm:col-span-2 -mb-1">
                    <h2
                      class="
                        text-gray-800 text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      "
                    >
                      State-issued Regulatory or Business License
                    </h2>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">License</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.businessLicense }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">State</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.businessInformation.businessLicenseState }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div v-if="tabs[2].current === true">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Bank Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.merchantInformation.bankName }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Bank Account Type
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.merchantInformation.bankType }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Bank Account Number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ merchant.merchantInformation.bankAccountNumber }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Bank Account Routing Number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        merchant.merchantInformation.bankAccountRountingNumber
                      }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div v-if="tabs[3].current === true">
                <div class="-mt-4 flex flex-shrink-0 justify-end mb-6">
                  <button
                    @click="createApplication"
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
                    Create New Cash Advance Application
                  </button>
                </div>
                <div class="flex flex-col">
                  <div class="-my-2 overflow-x-auto">
                    <div class="align-middle inline-block min-w-full">
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
                                Advance ID
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
                                Status
                              </th>
                              <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                              v-for="cash_advance in cash_advances"
                              :key="cash_advance.id"
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
                                  text-sm text-gray-500 text-right
                                "
                              >
                                {{
                                  formatCurrency(cash_advance.principalAmount)
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
                                {{ repaymentType(cash_advance.repaymentType) }}
                              </td>
                              <td
                                class="
                                  hidden
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-sm text-gray-500
                                  md:block
                                "
                              >
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
                              </td>
                              <td class="pr-6">
                                <router-link
                                  :to="
                                    `/cash-advances/` +
                                      cash_advance.id +
                                      `/show`
                                  "
                                  :class="[
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm',
                                  ]"
                                >
                                  <EyeIcon
                                    class="
                                      mr-3
                                      h-5
                                      w-5
                                      text-gray-400
                                      group-hover:text-gray-500
                                    "
                                    aria-hidden="true"
                                  />
                                </router-link>
                              </td>
                            </tr>
                            <tr v-show="cash_advances.length === 0">
                              <td
                                colspan="5"
                                class="
                                  px-6
                                  py-4
                                  whitespace-nowrap
                                  text-xs
                                  font-medium
                                  text-gray-500 text-center
                                  italic
                                "
                              >
                                This merchant has no cash advance.
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

      <section
        aria-labelledby="timeline-title"
        class="lg:col-start-3 lg:col-span-1"
      >
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              class="text-lg leading-6 font-medium text-gray-900"
            >
              Basic Information
            </h2>
          </div>

          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Legal Name</dt>
                <dd
                  class="
                    mt-1
                    text-sm text-gray-900
                    sm:mt-0
                    sm:col-span-2
                    text-right
                    break-words
                  "
                >
                  {{ merchant.merchantInformation.name }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Business Name (DBA)
                </dt>
                <dd
                  class="
                    mt-1
                    text-sm text-gray-900
                    sm:mt-0
                    sm:col-span-2
                    text-right
                    break-words
                  "
                >
                  {{ merchant.merchantInformation.businessName }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd
                  class="
                    mt-1
                    text-sm text-gray-900
                    sm:mt-0
                    sm:col-span-2
                    text-right
                    break-all
                  "
                >
                  {{ merchant.merchantInformation.email }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Sales Agent 1</dt>
                <dd
                  class="
                    mt-1
                    text-sm text-gray-900
                    sm:mt-0
                    sm:col-span-2
                    text-right
                    break-all
                  "
                >
                  {{ merchant.merchantInformation.salesAgent1 }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Sales Agent 2</dt>
                <dd
                  class="
                    mt-1
                    text-sm text-gray-900
                    sm:mt-0
                    sm:col-span-2
                    text-right
                    break-all
                  "
                >
                  {{ merchant.merchantInformation.salesAgent2 }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment-timezone";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { EyeIcon } from "@heroicons/vue/solid";
import authHeader from "@/services/auth-header";
import SilaMoneyService from "../../services/silamoney.service";

const pages = [
  { name: "List of Merchants", href: "/merchants", current: false },
  { name: "View Merchant Information", href: "#", current: true },
];

const statusStyles = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-gray-100 text-gray-800",
  completed: "bg-blue-100 text-blue-800",
  failed: "bg-red-100 text-red-800",
};

export default {
  components: {
    Breadcrumbs,
    EyeIcon,
  },
  setup() {
    return {
      pages,
      statusStyles,
    };
  },
  data() {
    return {
      cash_advances: "",
      merchant: "",
      tabs: [
        { name: "Address Information", href: "#", current: true },
        { name: "Business Information", href: "#", current: false },
        { name: "Bank Information", href: "#", current: false },
        { name: "Cash Advances", href: "#", current: false },
      ],
    };
  },
  created() {
    this.getMerchantInfo();
    this.getcashAdvances();
    this.moment = moment;
    this.merchantId = this.$route.params.id;
  },
  computed: {
    dateDiff() {
      var date_diff = moment().diff(
        this.merchant.businessInformation.businessFormationDate,
        "years"
      );

      return date_diff + (date_diff > 1 ? " years ago" : " year ago");
    },
    businessEntity() {
      var entity = JSON.parse(this.merchant.merchantInformation.businessEntity);

      return entity.name;
    },
  },
  methods: {
    async getMerchantInfo() {
      await axios
        .get(
          process.env.VUE_APP_API_URL + `/merchants/` + this.$route.params.id,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          this.merchant = response.data.data;
          console.log(this.merchant);
        });
    },
    async getcashAdvances() {
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications?merchantId=` +
            this.$route.params.id,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          this.cash_advances = response.data.data;
          this.cash_advances.sort((a, b) => b.id - a.id);
        });
    },
    createApplication() {
      localStorage.merchantEmail = this.merchant.merchantInformation.email;
      this.$router.push({ name: "Create New Cash Advance Application" });
    },
    selectTab(i, type) {
      var tabIndex = i;
      if (type === "select") tabIndex = event.target.options.selectedIndex;
      this.tabs.forEach((tab, index) => {
        if (index === tabIndex) tab.current = true;
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
    async handleLinkingBankAccount() {
      console.log(this.merchant);

      let merchantData = {
        userHandle: this.merchant.merchantInformation.sila_money_user_handle,
        accountNumber: this.merchant.merchantInformation.bankAccountNumber,
        routingNumber: this.merchant.merchantInformation
          .bankAccountRountingNumber,
        accountType: this.merchant.merchantInformation.bankType,
        accountName: this.merchant.merchantInformation.name + " account",
      };

      try {
        let res = await SilaMoneyService.linkBankAccount(merchantData);
        if (res.data.result.data.success) {
          Swal.fire({
            title: "Congratulations!",
            text: "Bank successfully linked.",
            icon: "success",
          });
        } else {
          console.log(res);
          Swal.fire({
            title: "Oops! Something went wrong.",
            icon: "error",
          });
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
