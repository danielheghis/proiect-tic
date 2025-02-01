<template>
  <div>
    <NavigationMenu />
    <p class="p-4">This is the stats page.</p>
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  name: "StatsView",
  components: {
    NavigationMenu,
  },
};
</script>
