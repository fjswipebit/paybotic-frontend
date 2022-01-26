<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>