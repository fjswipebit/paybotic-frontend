<template>
  <div class="px-4 mt-6 sm:px-6 lg:px-8">
    <div class="flex justify-between">
      <div class="flex justify-start">
        <a
          href="/abilities/create"
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
          Create New Ability
        </a>
      </div>
      <div class="flex justify-end">
        <div class="max-w-xs w-full">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                pl-3
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
                w-full
                bg-white
                border border-gray-300
                rounded-md
                py-2
                pl-10
                pr-3
                text-sm
                placeholder-gray-500
                focus:outline-none
                focus:text-gray-900
                focus:placeholder-gray-400
                focus:ring-1 focus:ring-gray-900
                focus:border-gray-900
                sm:text-sm
              "
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <!-- <button @click="getCashAdvanceApplications('', search)" class="inline-flex items-center ml-2 p-2 border border-gray-300 rounded shadow-sm text-white bg-transparent hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FilterIcon  class="h-4 w-4 text-gray-400 hover:text-gray-600" aria-hidden="true" />
            </button> -->
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
          @click="getCashAdvanceApplications('', search)"
        >
          <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  </div>
  <div class="mt-8">
    <div class="align-middle">
      <!-- <div class="px-4 sm:px-6 mb-6 lg:px-8 grid grid-cols-12 gap-4">
        <div class="col-span-full sm:col-start-13">
          <label for="email" class="sr-only">Search</label>
          <div class="mt-1 flex rounded-md shadow-sm">
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
              @click="getabilities('', search)"
            >
              <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div> -->
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
                      Ability Name
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
                      Created At
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
                      Updated At 
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="ability in abilities" :key="ability.id">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ ability.name }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm
                        font-medium
                      "
                    >
                      {{ 
                        ability.created_at ? moment(ability.created_at).format(
                            "MM/DD/YYYY"
                          ) : '-'
                      }}
                    </td>
                    <td
                      class="
                        px-6
                        py-4
                        whitespace-nowrap
                        text-sm
                        font-medium
                      "
                    >
                      {{  
                        ability.updated_at ? moment(ability.updated_at).format(
                            "MM/DD/YYYY h:mm a"
                          ) : '-'
                      }}
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
                              <!-- <MenuItem v-slot="{ active }">
                                <router-link
                                  :to="`/abilities/` + ability.id + `/edit`"
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
                                </router-link>
                              </MenuItem> -->
                              <MenuItem v-slot="{ active }">
                                <router-link
                                  to="#"
                                  @click="confirmDelete(ability.id)"
                                  :class="[
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm',
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
                                  Delete
                                </router-link>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </td>
                  </tr>
                  <tr v-show="abilities.length === 0">
                    <td
                      colspan="3"
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
                      The abilities table is currently empty.
                    </td>
                  </tr>
                </tbody>
                <!-- <tfoot>
                  <tr>
                    <td colspan="6">
                      <Pagination
                        :pagination="pagination"
                        @update="getabilities"
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
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import moment from "moment-timezone";
// import Pagination from "@/components/Pagination";
import authHeader from "@/services/auth-header";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  SearchIcon,
  FilterIcon,
  DotsVerticalIcon,
  // PencilAltIcon,
  PlusIcon,
  TrashIcon

} from "@heroicons/vue/solid";

export default {
  components: {
    // Pagination,
    SearchIcon,
    FilterIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    // PencilAltIcon,
    PlusIcon,
    TrashIcon
  },
  data() {
    return {
      search: "",
      pagination: "",
      abilities: "",
    };
  },
  created() {
    this.getabilities();
    this.moment = moment;
  },
  methods: {
    async getabilities() {
      var url =
        process.env.VUE_APP_API_URL +
        `/role-permission/get-permissions`;

      await axios.get(url, { headers: authHeader() }).then((response) => {
        this.abilities = response.data.data;
        this.pagination = response.data.data;
        console.log(this.abilities)

      });
    },
    confirmDelete(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(process.env.VUE_APP_API_URL+`/role-permission/delete-permission/`+ id,
                { headers: authHeader() })
            .then((response) => {
                this.current_user = response.data.data;
                Swal.fire(
                  'Deleted!',
                  'Ability has been deleted.',
                  'success'
                )
                window.location.reload();
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.data.errors);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    let listOfObjects = Object.keys(error.response.data.errors).map((key) => {
                        return error.response.data.errors[key]
                    })
                    console.log('haha',listOfObjects)
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   listOfObjects[0],
                        icon: 'error'
                    }); 
                } else if (error.request) {
                    console.log(error.request);
                     Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   error.request,
                        icon: 'error'
                    }); 
                } else {
                    console.log('Error', error);
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   error,
                        icon: 'error'
                    }); 
                }
            });
        }
      })
    }
  },
};
</script>