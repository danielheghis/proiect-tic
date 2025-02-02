<template>
  <nav class="bg-emerald-600 text-white shadow-lg">
    <div class="flex justify-between mx-8 px-4">
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
        <li>
          <button @click="confirmLogout" class="nav-link">Logout</button>
        </li>
      </ul>
      <LogoComponent class="ml-5" />
    </div>
  </nav>
</template>

<script>
import LogoComponent from "./LogoComponent.vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavigationMenu",
  components: { LogoComponent },
  methods: {
    async confirmLogout() {
      const isConfirmed = window.confirm("Are you sure you want to log out?");

      if (isConfirmed) {
        await this.logout();
      }
    },
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);

        localStorage.removeItem("idToken");

        this.$router.push("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
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
