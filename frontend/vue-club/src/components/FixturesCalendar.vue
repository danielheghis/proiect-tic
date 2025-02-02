<template>
  <div class="max-w-4xl mx-auto p-8">
    <h2 class="text-3xl font-semibold mb-6 text-center">Match Schedule</h2>

    <div>
      <h3 class="text-2xl font-semibold mb-4">Upcoming Matches</h3>
      <div v-if="scheduledMatches.length" class="space-y-4">
        <div
          v-for="match in scheduledMatches"
          :key="match.id"
          class="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <p class="text-lg font-medium">
            {{ ourTeam }} - {{ match.opponentTeam }} ({{
              formatDate(match.date)
            }})
          </p>
          <router-link
            :to="`/matches/scheduled/details/${match.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Details
          </router-link>
        </div>
      </div>
      <p v-else class="text-gray-500">No upcoming matches available.</p>
    </div>

    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-4">Results</h3>
      <div v-if="finishedMatches.length" class="space-y-4">
        <div
          v-for="match in finishedMatches"
          :key="match.id"
          class="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <p class="text-lg font-medium">
            {{ ourTeam }} {{ match.goals_own_team }} -
            {{ match.goals_opponent_team }} {{ match.opponentTeam.name }} ({{
              formatDate(match.date)
            }})
          </p>
          <router-link
            :to="`/matches/finished/details/${match.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Details
          </router-link>
        </div>
      </div>
      <p v-else class="text-gray-500">No finished matches available.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FixturesCalendar",
  data() {
    return {
      ourTeam: "Farul Constanta",
      finishedMatches: [],
      scheduledMatches: [],
    };
  },
  async mounted() {
    await this.fetchMatches();
  },
  methods: {
    async fetchMatches() {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.get("/api/matches", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const matches = response.data;
        this.finishedMatches = matches.filter(
          (match) => match.status === "finished"
        );
        this.scheduledMatches = matches.filter(
          (match) => match.status === "scheduled"
        );
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
h2,
h3 {
  color: #1f2937;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
