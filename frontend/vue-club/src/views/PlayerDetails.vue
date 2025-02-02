<template>
  <div class="max-w-4xl mx-auto p-8">
    <h2 class="text-3xl font-semibold mb-6">Player Details</h2>
    <div v-if="player">
      <p><strong>Name:</strong> {{ player.name }}</p>
      <p><strong>Age:</strong> {{ player.age }}</p>
      <p><strong>Salary:</strong> {{ player.salary }}</p>
      <button
        class="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
        @click="terminateContract"
      >
        Terminate Contract
      </button>
    </div>
    <div v-else>
      <p>Loading player details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerDetails",
  data() {
    return {
      player: null,
    };
  },
  async mounted() {
    const playerId = this.$route.params.id;
    await this.fetchPlayerDetails(playerId);
  },
  methods: {
    async fetchPlayerDetails(playerId) {
      try {
        const response = await axios.get(`/api/players/${playerId}`);
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    },
    async terminateContract() {
      try {
        await axios.delete(`/api/players/${this.player.id}`);
        alert("Contract terminated successfully.");
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error terminating contract:", error);
      }
    },
  },
};
</script>
