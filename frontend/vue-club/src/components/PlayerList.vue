<template>
  <div class="bg-white overflow-hidden">
    <div class="flex justify-between items-center px-4 py-4">
      <h1 class="text-2xl font-semibold">Players</h1>
      <router-link
        to="/players/sign"
        class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >Add Player</router-link
      >
    </div>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead class="bg-blue-100">
        <tr>
          <th class="border border-gray-300 px-4 py-3 text-left">Photo</th>
          <th class="border border-gray-300 px-4 py-3 text-left">Name</th>
          <th class="border border-gray-300 px-4 py-3 text-left">Age</th>
          <th class="border border-gray-300 px-4 py-3 text-left">Position</th>
          <th class="border border-gray-300 px-4 py-3 text-left">Salary</th>
          <th class="border border-gray-300 px-4 py-3 text-left">
            Matches Played
          </th>
          <th class="border border-gray-300 px-4 py-3 text-left">Goals</th>
          <th class="border border-gray-300 px-4 py-3 text-left">Assists</th>
          <th class="border border-gray-300 px-4 py-3 text-left">
            Yellow Card
          </th>
          <th class="border border-gray-300 px-4 py-3 text-left">Red Cards</th>
          <th class="border border-gray-300 px-4 py-3 text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="player in players"
          :key="player.id"
          class="hover:bg-gray-100"
        >
          <td class="border border-gray-300 px-4 py-3">
            <img
              :src="
                player.profileImage || require('@/assets/stock_avatar.jpeg')
              "
              alt="Player Photo"
              class="w-8 inline"
            />
          </td>
          <td class="border border-gray-300 px-4 py-3">{{ player.name }}</td>
          <td class="border border-gray-300 px-4 py-3">{{ player.age }}</td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.position }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.salary }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.seasonStats["2024-2025"].matchesPlayed }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.seasonStats["2024-2025"].goals }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.seasonStats["2024-2025"].assists }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.yellowCards ? player.yellowCards : "0" }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            {{ player.redCards ? player.redCards : "0" }}
          </td>
          <td class="border border-gray-300 px-4 py-3">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              @click="goToPlayerDetails(player.id)"
            >
              Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerList",
  data() {
    return {
      players: [],
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  methods: {
    async fetchPlayers() {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.get("/api/players", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        this.players = response.data;
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    },
    goToPlayerDetails(playerId) {
      this.$router.push(`/players/${playerId}/details`);
    },
  },
};
</script>

<style scoped>
table {
  font-size: 16px;
}
th {
  font-weight: 600;
  padding: 10px;
}
td {
  padding: 10px;
}
</style>
