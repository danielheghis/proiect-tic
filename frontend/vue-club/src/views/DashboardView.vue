<template>
  <div>
    <NavigationMenu />
    <div class="py-5 px-14">
      <PlayerList />
    </div>
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import PlayerList from "@/components/PlayerList.vue";

export default {
  name: "DashboardView",
  components: {
    NavigationMenu,
    PlayerList,
  },
};
</script>
