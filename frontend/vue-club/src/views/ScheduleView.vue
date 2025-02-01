<template>
  <div>
    <NavigationMenu />
    <p class="p-4">This is the schedule page.</p>
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  name: "ScheduleView",
  components: {
    NavigationMenu,
  },
};
</script>
