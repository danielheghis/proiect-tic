<template>
  <NavigationMenu />
  <div class="max-w-4xl mx-auto p-8">
    <h2 class="text-3xl font-semibold text-center mb-6">Match Details</h2>

    <div v-if="match">
      <div class="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h3 class="text-xl font-semibold mb-3">Match Summary</h3>
        <p><strong>Date:</strong> {{ formatDate(match.date) }}</p>
        <p>
          <strong>Score:</strong>
          {{ match.ownTeam }} {{ match.goals_own_team }} -
          {{ match.goals_opponent_team }} {{ match.opponentTeam.name }}
        </p>
      </div>

      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3">Players</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-blue-100 p-4 rounded-lg">
            <h4 class="font-bold mb-2">{{ match.ownTeam }} Players</h4>
            <ul>
              <li
                v-for="player in match.ownTeamPlayers.first_eleven"
                :key="player.name"
              >
                {{ player.name }} ({{ player.position }})
              </li>
            </ul>
          </div>
          <div class="bg-red-100 p-4 rounded-lg">
            <h4 class="font-bold mb-2">
              {{ match.opponentTeam.name }} Players
            </h4>
            <ul>
              <li
                v-for="player in match.opponentTeam.first_eleven"
                :key="player.name"
              >
                {{ player.name }} ({{ player.position }})
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-3">Match Events</h3>
        <ul>
          <li v-for="event in match.events" :key="event.minute" class="mb-2">
            <span class="font-semibold">{{ event.minute }}</span> -
            <span>{{ getEventDescription(event) }}</span>
          </li>
        </ul>
      </div>
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
  name: "MatchDetailsFinished",
  components: { NavigationMenu },
  data() {
    return {
      match: null,
    };
  },
  async mounted() {
    const matchId = this.$route.params.id;
    await this.fetchMatchDetails(matchId);
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
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    getEventDescription(event) {
      if (event.type === "goal") {
        return `${event.team === "own" ? "Goal by" : "Goal against"} ${
          event.playerName
        } ${event.assistBy ? `(assist by ${event.assistBy})` : ""}`;
      } else if (event.type === "yellow_card") {
        return `${event.playerName} received a yellow card`;
      } else if (event.type === "substitution") {
        return `Substitution: ${event.playerNameIn} in, ${event.playerNameOut} out`;
      }
      return event.type;
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
