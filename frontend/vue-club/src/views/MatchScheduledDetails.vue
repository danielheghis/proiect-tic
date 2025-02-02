<template>
  <NavigationMenu />
  <div class="max-w-4xl mx-auto p-8">
    <div v-if="match">
      <h2 class="text-3xl font-semibold text-center mb-6">
        Upcoming Match Details
      </h2>

      <div class="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h3 class="text-xl font-semibold mb-3">Match Info</h3>
        <p><strong>Date:</strong> {{ formatDate(match.date) }}</p>
        <p>
          <strong>Teams:</strong> {{ match.ownTeam }} vs
          {{ match.opponentTeam.name }}
        </p>
      </div>

      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3">Choose Starting Lineup</h3>
        <ul>
          <li v-for="player in eligiblePlayers" :key="player.id" class="mb-2">
            <label>
              <input
                type="checkbox"
                v-model="selectedPlayers"
                :value="player"
              />
              {{ player.name }} ({{ player.position }})
            </label>
          </li>
        </ul>
      </div>

      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        @click="confirmLineup"
      >
        Confirm Lineup
      </button>
    </div>
    <div v-else>
      <p>Loading match details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  name: "MatchDetailsScheduled",
  components: { NavigationMenu },
  data() {
    return {
      match: null,
      eligiblePlayers: [],
      selectedPlayers: [],
    };
  },
  async mounted() {
    const matchId = this.$route.params.id;
    await this.fetchMatchDetails(matchId);
    await this.fetchEligiblePlayers();
  },
  methods: {
    async fetchMatchDetails(matchId) {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.get(`/api/matches/${matchId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        this.match = response.data;
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    },
    async fetchEligiblePlayers() {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.get("/api/players/eligible-players", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        this.eligiblePlayers = response.data;
      } catch (error) {
        console.error("Error fetching eligible players:", error);
      }
    },
    async confirmLineup() {
      try {
        const idToken = localStorage.getItem("idToken");
        await axios.put(
          `/api/matches/${this.match.id}/lineup`,
          {
            selectedPlayers: this.selectedPlayers,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        alert("Lineup confirmed!");
      } catch (error) {
        console.error("Error confirming lineup:", error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
h2 {
  color: #1f2937;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
