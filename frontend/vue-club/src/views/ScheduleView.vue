<template>
  <div>
    <NavigationMenu />
    <FixturesCalendar />
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import FixturesCalendar from "@/components/FixturesCalendar.vue";

export default {
  name: "ScheduleView",
  components: {
    NavigationMenu,
    FixturesCalendar,
  },
};
</script>
