<template>
  <div>
    <NavigationMenu />
    <p class="p-4">This is the dashboard page.</p>
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  name: "DashboardView",
  components: {
    NavigationMenu,
  },
};
</script>
