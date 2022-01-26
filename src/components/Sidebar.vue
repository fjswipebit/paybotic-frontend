<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed inset-0 flex z-40 lg:hidden"
      @close="$emit('closeSidebar')"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
        >
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="$emit('closeSidebar')"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="flex-shrink-0 flex items-center px-4">
            <img class="h-8 w-auto" src="/assets/PAYBOTIC.png" />
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2">
              <div class="space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.name === routeName
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                    'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                  ]"
                  :aria-current="item.name === routeName  ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.name === routeName
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div
      class="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100"
    >
      <div class="flex items-center flex-shrink-0 px-6 justify-center">
        <img class="h-8 w-auto" src="/assets/PAYBOTIC.png" alt="Workflow" />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="h-0 flex-1 flex flex-col overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="px-3 mt-6 relative inline-block text-left">
          <div>
            <MenuButton
              class="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
            >
              <span class="flex w-full justify-between items-center">
                <span
                  class="flex min-w-0 items-center justify-between space-x-3"
                >
                  <img
                    class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                    src="data:image/png;base64,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"
                  />
                  <span class="flex-1 flex flex-col min-w-0">
                    <span class="text-gray-900 text-sm font-medium truncate"
                      >{{current_user.name}}</span
                    >
                    <span class="text-gray-500 text-sm truncate"
                      >{{current_user.role}}</span
                    >
                  </span>
                </span>
                <SelectorIcon
                  class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="/profile"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >View profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="/change-password"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Change password</a
                  >
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    @click.prevent="logout"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Logout</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <!-- Navigation -->
        <nav class="px-3 mt-6">
          <div class="space-y-1">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                item.name === routeName
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                item.hidden == true ? 'hidden' : 'block'
              ]"
              :aria-current="item.name === routeName  ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.name === routeName
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { MenuAlt1Icon, XIcon } from "@heroicons/vue/outline";
import { SearchIcon, SelectorIcon } from "@heroicons/vue/solid";

import {
  DocumentTextIcon,
  HomeIcon,
  OfficeBuildingIcon,
  CashIcon,
  CurrencyDollarIcon,
  UserIcon,
  BookOpenIcon,
  IdentificationIcon
} from "@heroicons/vue/outline";
import authService from '../services/auth.service';

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  {
    name: "Merchants",
    href: "/merchants",
    icon: OfficeBuildingIcon,
    current: false,
    hidden: false
  },
  {
    name: "Cash Advance Applications",
    href: "/cash-advance-applications",
    icon: DocumentTextIcon,
    current: false,
    hidden: false
  },
  {
    name: "Cash Advances",
    href: "/cash-advances",
    icon: CashIcon,
    current: false,
    hidden: false
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CurrencyDollarIcon,
    current: false,
    hidden: false
  },
  {
    name: "Users",
    href: "/users",
    icon: UserIcon,
    current: false,
    hidden: localStorage.getItem('user_role') == 'superadmin' ? false : true
  },
  {
    name: "Roles",
    href: "/roles",
    icon: IdentificationIcon,
    current: false,
    hidden: localStorage.getItem('user_role') == 'superadmin' ? false : true
  },
  // {
  //   name: "Abilities",
  //   href: "/abilities",
  //   icon: BookOpenIcon,
  //   current: false,
  // },
];
export default {
  name: "Sidebar",
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    MenuAlt1Icon,
    SearchIcon,
    SelectorIcon,
    XIcon,
    UserIcon,
    BookOpenIcon,
    IdentificationIcon
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  created(){
    this.current_user = JSON.parse(localStorage.getItem('user'),true)
    console.log(localStorage.getItem('user_role'))
  },
  emits: ["closeSidebar"],
  data() {
    return {
      sidebarOpen: this.open,
      current_user: null,
    };
  },
  setup() {
    return {
      navigation,
    };
  },
  computed: {
    routeName() {
      if(this.$route.matched[0]) return this.$route.matched[0].name
      else return this.$route.name
    },
  },
  methods: {
    logout(){
      authService.logout();
      window.location.href = '/login'
    }
  }
};
</script>