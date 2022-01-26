<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
// import Base from "@/layouts/Base.vue";
import Default from "@/layouts/Default.vue";
import Blank from "@/layouts/Blank.vue";


const default_layout = "default";

export default {
  components: {
    // "base-layout": Base,
    "default-layout": Default,
    "blank-layout": Blank,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
