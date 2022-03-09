<template>
  <div>
    <div class="px-4 mt-6 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <div class="flex justify-start">
          <a
            href="/cash-advance-applications/create"
            class="
              inline-flex
              items-center
              px-3
              py-2
              border border-transparent
              shadow-sm
              text-sm
              leading-4
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
            <PlusIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Create New Application
          </a>
          <form enctype="multipart/form-data">
            <input
              type="file"
              @change="onFilePicked"
              ref="fileInput"
              style="display: none"
            />
            <a
              href="#"
              @click="onPickFile"
              class="
                mx-2
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-blue-600
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              <UploadIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Import MCA
            </a>
          </form>
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
          <div class="max-w-sm w-full">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  pr-3
                  flex
                  items-center
                "
              >
                <SearchIcon
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                v-model="search"
                class="
                  block
                  w-96
                  bg-white
                  border border-gray-300
                  rounded-md
                  py-2
                  px-3
                  text-sm
                  placeholder-gray-500
                  focus:outline-none
                  focus:text-gray-900
                  focus:placeholder-gray-400
                  focus:ring-1 focus:ring-gray-900
                  focus:border-gray-900
                  sm:text-sm
                "
                placeholder="Search business name or creator name"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

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
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Date Applied
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
                        Principal Amount
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
                        Factor Rate
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
                        Origination Fee
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
                        Date of Duration
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
                        Reason for Rejecting
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
                        Rejected By
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
                        Date Rejected
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
                        Created By
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(application, index) in filteredMca"
                      :key="application.id"
                    >
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500
                        "
                      >
                        {{
                          moment(application.createdAt).format(
                            "MM/DD/YYYY h:mm a"
                          )
                        }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-blue-500
                          font-bold
                        "
                      >
                        <a
                          :href="
                            '/merchants/' +
                              application.merchantInformation.id +
                              '/show'
                          "
                          >{{ application.merchantInformation.businessName }}</a
                        >
                      </td>

                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ formatCurrency(application.principalAmount) }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ application.factorRate }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ application.originationFee }} %
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ repaymentType(application.repaymentType) }}
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
                            'bg-yellow-100 text-yellow-800':
                              application.status == 'pending',
                            'bg-green-100 text-green-800':
                              application.status == 'approved',
                            'bg-red-100 text-red-800':
                              application.status != 'pending' &&
                              application.status != 'approved',
                          }"
                        >
                          {{ application.status }}
                        </span>
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ moment(application.startDate).format("MM/DD/YYYY") }}
                        -
                        {{ moment(application.endDate).format("MM/DD/YYYY") }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-sm text-gray-500 text-right
                        "
                      >
                        {{ application.rejectReason ?? "-" }}
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
                          application.updatedBy
                            ? application.updatedBy.name
                            : "-"
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
                          application.updatedAt &&
                          application.status == "rejected"
                            ? moment(application.updatedAt).format("MM/DD/YYYY")
                            : "-"
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
                          application.createdBy
                            ? application.createdBy.name
                            : "-"
                        }}
                      </td>
                      <td
                        class="
                          px-6
                          py-4
                          whitespace-nowrap
                          text-right text-sm
                          font-medium
                          relative
                        "
                      >
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
                              :class="{
                                'bottom-0':
                                  index == cash_advance_application.length - 1,
                                'top-0':
                                  index != cash_advance_application.length - 1,
                              }"
                              class="
                                mx-3
                                origin-top-right
                                absolute
                                right-7
                                mt-1
                                rounded-md
                                shadow-lg
                                z-10
                                bg-white
                                ring-1 ring-black ring-opacity-5
                                focus:outline-none
                              "
                            >
                              <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                  <router-link
                                    :to="
                                      `/cash-advance-applications/` +
                                        application.id +
                                        `/show`
                                    "
                                    :class="[
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm w-full',
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
                                    View Information
                                  </router-link>
                                </MenuItem>
                                <MenuItem
                                  v-show="
                                    (application.status == 'pending' &&
                                    application.createdBy
                                      ? application.createdBy.email
                                      : null == user_email) ||
                                      user_role != 'employee'
                                  "
                                >
                                  <router-link
                                    :to="
                                      `/cash-advance-applications/` +
                                        application.id +
                                        `/edit`
                                    "
                                    :class="[
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm w-full',
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
                                  </router-link>
                                </MenuItem>
                                <MenuItem
                                  v-if="user_role != 'employee'"
                                  v-slot="{ active }"
                                  v-show="application.status == 'pending'"
                                >
                                  <button
                                    type="button"
                                    @click="
                                      changeStatusTo(
                                        'approved',
                                        application.id,
                                        application.merchantInformation
                                          .is_bank_linked,
                                        application.merchantInformation.id
                                      )
                                    "
                                    :class="[
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm w-full',
                                    ]"
                                  >
                                    <CheckIcon
                                      class="
                                        mr-3
                                        h-5
                                        w-5
                                        text-gray-400
                                        group-hover:text-gray-500
                                      "
                                      aria-hidden="true"
                                    />
                                    Approved
                                  </button>
                                </MenuItem>
                                <MenuItem
                                  v-if="user_role != 'employee'"
                                  v-slot="{ active }"
                                  v-show="application.status == 'pending'"
                                >
                                  <button
                                    type="button"
                                    @click="
                                      changeStatusTo('rejected', application.id)
                                    "
                                    :class="[
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm w-full',
                                    ]"
                                  >
                                    <TrashIcon
                                      class="
                                        mr-3
                                        h-5
                                        w-5
                                        text-gray-400
                                        group-hover:text-gray-500
                                      "
                                      aria-hidden="true"
                                    />
                                    Reject
                                  </button>
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </transition>
                        </Menu>
                      </td>
                    </tr>
                    <tr v-show="cash_advance_application.length === 0">
                      <td
                        colspan="13"
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
                        The cash advance application table is currently empty.
                      </td>
                    </tr>
                  </tbody>
                  <!-- <tfoot>
                  <tr>
                    <td colspan="6">
                      <Pagination
                        :pagination="pagination"
                        @update="getCashAdvanceApplications"
                      />
                    </td>
                  </tr>
                </tfoot> -->
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import authHeader from "@/services/auth-header";

// import Pagination from "@/components/Pagination";
import moment from "moment-timezone";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  SearchIcon,
  PlusIcon,
  EyeIcon,
  CheckIcon,
  TrashIcon,
  UploadIcon,
  DocumentDownloadIcon,
  PencilAltIcon,
} from "@heroicons/vue/solid";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    SearchIcon,
    PlusIcon,
    EyeIcon,
    CheckIcon,
    TrashIcon,
    UploadIcon,
    DocumentDownloadIcon,
    PencilAltIcon,
    // Pagination
  },
  data() {
    return {
      search: "",
      pagination: "",
      user_role: "",
      user_email: "",
      cash_advance_application: "",
    };
  },
  mounted() {
    this.getCashAdvanceApplications();
    this.moment = moment;
    this.user_role = localStorage.getItem("user_role");
    this.user_email = localStorage.getItem("user_email");
  },
  methods: {
    formatCurrency(value) {
      if (!value) {
        return "$ 0.00";
      }
      const number = (value / 1).toFixed(2).replace(",", ".");
      return "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    repaymentType(type) {
      if (type === "daily_witholding") return "Daily Withholding Percentage";
      else if (type === "daily_fixed_amount") return "Daily Fixed Amount";
      else return "";
    },
    async getCashAdvanceApplications(page, search) {
      var url =
        process.env.VUE_APP_API_URL +
        `/cash-advance-applications?order=desc&page=1`;
      if (page)
        url =
          process.env.VUE_APP_API_URL +
          `/cash-advance-applications?order=desc&page=` +
          page;
      else if (search)
        url =
          process.env.VUE_APP_API_URL +
          `/cash-advance-applications?order=desc&page=1&search=` +
          search;

      axios
        .get(url, {
          params: {
            status: ["pending", "rejected", "default"],
          },
          headers: authHeader(),
        })
        .then((response) => {
          this.cash_advance_application = response.data.data;
          console.log(response.data.data, url);
          this.cash_advance_application.sort((a, b) => b.id - a.id);
          this.pagination = response.data.data;
          console.log(this.cash_advance_application, this.pagination);
        });
    },
    async changeStatusTo(currentStatus, id, bankLinked, merchantId) {
      let reason = null;
      if (currentStatus == "rejected") {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Why do you want to reject this MCA?",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Type your reason here",
          },
          showCancelButton: true,
        });
        reason = text;
        axios
          .put(
            process.env.VUE_APP_API_URL + `/cash-advance-applications/` + id,
            {
              status: currentStatus,
              rejectReason: reason,
            },
            { headers: authHeader() }
          )
          .then((response) => {
            console.log(response);
            Swal.fire({
              title: "Well done!",
              text:
                "You have successfuly " +
                currentStatus +
                " the cash advance application",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/cash-advance-applications";
              }
            });
          })
          .catch(function(error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              Swal.fire({
                title: "Oops! Something went wrong.",
                text: error.response.data.message,
                icon: "error",
              });
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
        return;
      }
      console.log(reason, currentStatus, merchantId, bankLinked);

      if ((reason || currentStatus == "approved") && bankLinked === 1) {
        Swal.fire({
          title: "Approving MCA Application",
          text: "Please wait.",
          icon: "info",
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            Swal.getHtmlContainer().querySelector("b");
          },
        });
        axios
          .put(
            process.env.VUE_APP_API_URL + `/cash-advance-applications/` + id,
            {
              status: currentStatus,
              rejectReason: reason,
            },
            { headers: authHeader() }
          )
          .then((response) => {
            console.log(response);
            Swal.fire({
              title: "Well done!",
              text:
                "You have successfuly " +
                currentStatus +
                " the cash advance application",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/cash-advance-applications";
              }
            });
          })
          .catch(function(error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              Swal.fire({
                title: "Oops! Something went wrong.",
                text: error.response.data.message,
                icon: "error",
              });
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      } else {
        Swal.fire({
          title: "Merchant's bank account not linked yet.",
          text: "Please link bank account to approve application.",
          icon: "error",
          confirmButtonText: `Go to merchant`,
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/merchants/${merchantId}/show`;
          }
        });
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      var formData = new FormData();
      formData.append("mca", event.target.files[0]);

      axios
        .post(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications/import/file`,
          formData,
          { headers: authHeader() }
        )
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Congratulations!",
            text: "You have successfully imported MCAs",
            icon: "success",
          });
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response);
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: error.response.data.errors
                ? error.response.data.errors[0]
                : error.response.data.message,
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
            console.log("Error", error);
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: error,
              icon: "error",
            });
          }
        });
    },
    async exportToExcel() {
      await axios
        .post(
          process.env.VUE_APP_API_URL +
            `/cash-advance-applications/export?status[]=pending&status[]=rejected&status[]=default`,
          "",
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          window.location.href = response.data.data;
        });
    },
  },
  computed: {
    filteredMca() {
      if (this.search) {
        return this.cash_advance_application.filter((row) => {
          const merchantName = row.merchantId.merchantInformation.businessName.toLowerCase();
          const creator = row.createdBy ? row.createdBy.name.toLowerCase() : "";
          const searchTerm = this.search.toLowerCase();

          return (
            merchantName.includes(searchTerm) || creator.includes(searchTerm)
          );
        });
      } else {
        return this.cash_advance_application;
      }
    },
  },
};
</script>
