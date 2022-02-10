<template>
  <div class="mt-8">
    <div class="align-middle">
      <div class="px-4 sm:px-6 mb-6 lg:px-8 grid grid-cols-12 gap-4">
        <div class="col-span-4">
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

        <div class="col-span-full sm:col-start-13">
          <label for="email" class="sr-only">Search</label>
          <div class="mt-1 flex rounded-md shadow-sm">
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
            <div
              class="relative flex items-stretch flex-grow focus-within:z-10"
            >
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
              @click="getMerchants('', search)"
            >
              <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
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
                      Total MCA
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
                      Total Principal Amount
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
                      Total Payback Amount
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
                      Sales Agent 1
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
                      Sales Agent 2
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="merchant in merchants"
                    :key="merchant.merchantInformation.id"
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
                      {{ merchant.merchantInformation.id }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ merchant.merchantInformation.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ merchant.merchantInformation.businessName }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ merchant.merchantInformation.email }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                    >
                      {{ merchant.merchantInformation.totalMCA ?? 0 }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                    >
                      {{
                        formatCurrency(
                          merchant.merchantInformation.totalPrincipalAmount ??
                            "0.00"
                        )
                      }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                    >
                      {{
                        formatCurrency(
                          merchant.merchantInformation.totalPaybackAmount ??
                            "0.00"
                        )
                      }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                    >
                      {{
                        formatCurrency(
                          merchant.merchantInformation.remainingTotalBalance ??
                            "0.00"
                        )
                      }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ merchant.merchantInformation.salesAgent1 ?? "-" }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ merchant.merchantInformation.salesAgent2 ?? "-" }}
                    </td>
                    <td class="pr-6">
                      <Menu
                        as="div"
                        class="relative flex justify-end items-center"
                      >
                        <MenuButton
                          class="
                            w-8
                            h-8
                            bg-white
                            inline-flex
                            items-center
                            justify-center
                            text-gray-400
                            rounded-full
                            hover:text-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-purple-500
                          "
                        >
                          <span class="sr-only">Open options</span>
                          <DotsVerticalIcon
                            class="w-5 h-5"
                            aria-hidden="true"
                          />
                        </MenuButton>
                        <transition
                          enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95"
                        >
                          <MenuItems
                            class="
                              mx-3
                              origin-top-right
                              absolute
                              right-7
                              top-0
                              w-48
                              mt-1
                              rounded-md
                              shadow-lg
                              z-10
                              bg-white
                              ring-1 ring-black ring-opacity-5
                              divide-y divide-gray-200
                              focus:outline-none
                            "
                          >
                            <div class="py-1">
                              <MenuItem v-slot="{ active }">
                                <a
                                  :class="[
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm',
                                  ]"
                                  :href="
                                    `/merchants/` +
                                      merchant.merchantInformation.id +
                                      `/show`
                                  "
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
                                  View
                                </a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <a
                                  :href="
                                    `/merchants/` +
                                      merchant.merchantInformation.id +
                                      `/edit`
                                  "
                                  :class="[
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm',
                                  ]"
                                >
                                  <PencilAltIcon
                                    class="
                                      mr-3
                                      h-5
                                      w-5
                                      text-gray-400
                                      group-hover:text-gray-500
                                    "
                                    aria-hidden="true"
                                  />
                                  Edit
                                </a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </td>
                  </tr>
                  <tr v-show="merchants.length === 0">
                    <td
                      colspan="11"
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
                      The merchants table is currently empty.
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="11">
                      <Pagination
                        :pagination="pagination"
                        @update="getMerchants"
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
import Pagination from "@/components/Pagination";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import authHeader from "@/services/auth-header";
import {
  SearchIcon,
  FilterIcon,
  DotsVerticalIcon,
  EyeIcon,
  PencilAltIcon,
  DocumentDownloadIcon,
  RefreshIcon,
} from "@heroicons/vue/solid";

export default {
  components: {
    Pagination,
    SearchIcon,
    FilterIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    EyeIcon,
    PencilAltIcon,
    DocumentDownloadIcon,
    RefreshIcon,
  },
  data() {
    return {
      search: "",
      pagination: "",
      merchants: "",
    };
  },
  created() {
    this.getMerchants();
  },
  methods: {
    reset() {
      this.search = null;
      this.getMerchants();
    },
    async getMerchants(page, search) {
      var url =
        process.env.VUE_APP_API_URL +
        `/merchants?order=desc&per_page=10&page=1`;
      if (page)
        url =
          process.env.VUE_APP_API_URL +
          `/merchants?order=desc&per_page=10&page=` +
          page;
      else if (search)
        url =
          process.env.VUE_APP_API_URL +
          `/merchants?order=desc&per_page=10&page=1&search=` +
          search;

      await axios
        .get(url, {
          headers: authHeader(),
        })
        .then((response) => {
          this.merchants = response.data.data.data;
          this.pagination = response.data.data;
        });
    },
    async exportToExcel() {
      await axios
        .post(process.env.VUE_APP_API_URL + `/merchants/export`, "", {
          headers: authHeader(),
        })
        .then((response) => {
          window.location.href = response.data.data;
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
