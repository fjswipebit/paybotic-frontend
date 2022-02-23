<template>
  <div class="mx-auto px-4 sm:px-6 border-b border-gray-200">
    <div class="py-3">
      <nav class="flex" aria-label="Breadcrumb">
        <div class="flex sm:hidden">
          <router-link
            :to="pages[0].href"
            class="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowNarrowLeftIcon
              class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
              aria-hidden="true"
            />
            <span>Back to {{ pages[0].name }}</span>
          </router-link>
        </div>
        <div class="hidden sm:block">
          <ol class="flex items-center space-x-4">
            <li>
              <div>
                <router-link to="/" class="text-gray-400 hover:text-gray-500">
                  <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span class="sr-only">Home</span>
                </router-link>
              </div>
            </li>
            <li v-for="page in pages" :key="page.name">
              <div class="flex items-center">
                <ChevronRightIcon
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <a
                  :href="page.href"
                  class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  :aria-current="page.current ? 'page' : undefined"
                  >{{ page.name }}</a
                >
              </div>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {
  ArrowNarrowLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/vue/solid";

export default {
  components: {
    ArrowNarrowLeftIcon,
    ChevronRightIcon,
    HomeIcon,
  },
  props: ["pages"],
};
</script>
