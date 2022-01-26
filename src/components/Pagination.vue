<template>
  <div
    class="
      bg-white
      px-4
      py-3
      flex
      items-center
      justify-between
      border-gray-200
      sm:px-6
    "
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="previous"
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          bg-white
          focus:outline-none
          focus:ring focus:ring-indigo-500
          focus:z-10
        "
        :class="
          isFirstPage()
            ? 'text-gray-400 cursor-default'
            : 'text-gray-700 hover:text-gray-500 cursor-pointer'
        "
        :disabled="isFirstPage()"
      >
        Previous
      </button>

      <button
        @click="next"
        class="
          ml-3
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          bg-white
          focus:outline-none
          focus:ring focus:ring-indigo-500
          focus:z-10
        "
        :class="
          isLastPage()
            ? 'text-gray-200 cursor-default'
            : 'text-gray-700 hover:text-gray-500 cursor-pointer'
        "
        :disabled="isLastPage()"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">{{ meta.from }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ meta.to ? meta.to : meta.from }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ meta.total }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            @click="previous"
            class="
              bg-white
              border border-gray-300
              font-medium
              inline-flex
              items-center
              px-2
              py-2
              relative
              rounded-l-md
              text-sm
              focus:outline-none
              focus:ring focus:ring-indigo-500
              focus:z-10
            "
            :class="
              isFirstPage()
                ? 'text-gray-200 cursor-default'
                : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
            "
            :disabled="isFirstPage()"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>

          <div v-if="meta.last_page <= 6">
            <button
              v-for="page in meta.last_page"
              :key="page"
              @click="goTo(page)"
              class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                border
                bg-white
                text-sm
                font-medium
                focus:outline-none
              "
              :class="
                isCurrentPage(page)
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              "
            >
              {{ page }}
            </button>
          </div>

          <div v-else>
            <button
              v-for="page in 3"
              :key="page"
              @click="goTo(page)"
              class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                border
                bg-white
                text-sm
                font-medium
                focus:outline-none
                focus:ring focus:ring-indigo-500
                focus:z-10
              "
              :class="
                isCurrentPage(page)
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              "
            >
              {{ page }}
            </button>

            <Popover class="relative inline-flex items-center">
              <PopoverButton
                class="
                  bg-white
                  border border-gray-300
                  focus:outline-none
                  focus:ring focus:ring-indigo-500
                  focus:z-10
                  font-medium
                  px-4
                  py-2
                  text-gray-700 text-sm
                "
              >
                <span>...</span>
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="
                    -translate-x-1/2
                    absolute
                    left-1/2
                    max-w-max
                    mt-3
                    px-2
                    sm:px-0
                    transform
                    w-screen
                    z-10
                    -translate-y-3/4
                  "
                >
                  <div
                    class="
                      rounded-lg
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                      overflow-hidden
                    "
                  >
                    <div
                      class="bg-white gap-6 grid grid-cols-3 px-5 py-6 relative"
                    >
                      <button
                        v-for="page in meta.last_page - 6"
                        :key="page"
                        @click="goTo(page + 3)"
                        class="
                          -m-3
                          p-3
                          rounded-lg
                          hover:bg-gray-50
                          transition
                          ease-in-out
                          duration-150
                          focus:outline-none
                          focus:ring focus:ring-indigo-500
                          focus:z-10
                        "
                      >
                        <div class="">
                          <p class="text-base font-medium text-gray-900">
                            {{ page + 3 }}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <button
              v-for="page in 3"
              :key="page"
              @click="goTo(meta.last_page - 3 + page)"
              class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                border
                bg-white
                text-sm
                font-medium
                focus:outline-none
                focus:ring focus:ring-indigo-500
                focus:z-10
              "
              :class="
                isCurrentPage(meta.last_page - 3 + page)
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              "
            >
              {{ meta.last_page - 3 + page }}
            </button>
          </div>

          <button
            @click="next"
            class="
              bg-white
              border border-gray-300
              font-medium
              inline-flex
              items-center
              px-2
              py-2
              relative
              rounded-r-md
              text-gray-200 text-sm
              focus:outline-none
              focus:ring focus:ring-indigo-500
              focus:z-10
            "
            :class="
              isLastPage()
                ? 'text-gray-200 cursor-default'
                : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
            "
            :disabled="isLastPage()"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    Popover,
    PopoverButton,
    PopoverPanel,
  },

  data() {
    return {
      page: this.$route.query.page,
    };
  },

  computed: {
    meta() {
      return this.pagination.meta;
    },
    firstIndex() {
      return this.meta.per_page * this.meta.current_page - this.meta.per_page;
    },
  },

  watch: {
    "$route.query.page"(page) {
      this.page = page;
    },
  },

  methods: {
    goTo(page) {
      this.$emit("update", page);
    },
    previous() {
      this.$emit("update", this.meta.current_page - 1);
    },
    next() {
      this.$emit("update", this.meta.current_page + 1);
    },
    isLastPage() {
      return this.meta.current_page === this.meta.last_page;
    },
    isFirstPage() {
      return this.meta.current_page === 1;
    },
    isCurrentPage(page) {
      return this.meta.current_page === page;
    },
  },
};
</script>
