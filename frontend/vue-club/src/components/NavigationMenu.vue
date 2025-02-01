<template>
  <nav class="bg-emerald-600 text-white shadow-lg">
    <div class="flex justify-between max-w-7xl mx-auto px-4">
      <ul class="inline-flex items-center justify-start space-x-8 py-4 mb-4">
        <li>
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/schedule" class="nav-link">Schedule</router-link>
        </li>
        <li>
          <router-link to="/stats" class="nav-link">Stats</router-link>
        </li>
      </ul>
      <LogoComponent class="ml-5" />
    </div>
  </nav>
</template>

<script>
import LogoComponent from "./LogoComponent.vue";
export default {
  name: "NavigationMenu",
  components: { LogoComponent },
};
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 10px 14px;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #f0f0f0;
  border-radius: 8px;
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
}
</style>
