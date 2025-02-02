<template>
  <div class="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md">
    <div class="relative mt-3 mb-8">
      <router-link
        to="/dashboard"
        class="absolute left-0 px-4 py-2 hover:text-blue-500"
      >
        Back
      </router-link>
      <h2 class="text-3xl font-semibold text-center">Player Details</h2>
    </div>

    <div v-if="player">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <img
            :src="player.profileImage || require('@/assets/stock_avatar.jpeg')"
            alt="Player Photo"
            class="mb-4 mx-auto"
          />
          <p><strong>Name:</strong> {{ player.name }}</p>
          <p><strong>Age:</strong> {{ player.age }}</p>
          <p><strong>Position:</strong> {{ player.position }}</p>
          <p><strong>Salary:</strong> {{ formattedSalary }}</p>
        </div>

        <div>
          <h3 class="mt-4 text-xl font-semibold">Season Stats</h3>
          <div
            v-for="(stats, season) in player.seasonStats"
            :key="season"
            class="mb-4"
          >
            <h4 class="font-semibold text-lg text-blue-600">{{ season }}</h4>
            <p><strong>Matches Played:</strong> {{ stats.matchesPlayed }}</p>
            <p><strong>Goals:</strong> {{ stats.goals }}</p>
            <p><strong>Assists:</strong> {{ stats.assists }}</p>
          </div>

          <h3 class="mt-4 text-xl font-semibold">Injury Details</h3>
          <p>
            <strong>Status:</strong>
            {{ player.isInjured.injuryDetails.status ? "Injured" : "Healthy" }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-around">
        <button
          class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          @click="toggleEditSalary"
        >
          Update Salary
        </button>

        <button
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          @click="confirmTerminateContract"
        >
          Terminate Contract
        </button>
      </div>

      <div v-if="showSalaryForm" class="mt-4">
        <label for="new-salary" class="block text-gray-700 font-medium">
          Enter new salary:
        </label>
        <input
          type="number"
          id="new-salary"
          v-model="newSalary"
          @input="formatNewSalary"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <button
          class="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
          @click="updateSalary"
        >
          Confirm Update
        </button>
        <p class="text-gray-500 mt-3 mb-2 text-left">
          Formatted: {{ formattedNewSalary }}
        </p>
      </div>
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
      showSalaryForm: false,
      newSalary: 0,
      formattedNewSalary: "",
    };
  },
  computed: {
    formattedSalary() {
      return this.player
        ? new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(this.player.salary)
        : "";
    },
  },
  async mounted() {
    const playerId = this.$route.params.id;
    await this.fetchPlayerDetails(playerId);
  },
  methods: {
    async fetchPlayerDetails(playerId) {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.get(`/api/players/${playerId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    },
    toggleEditSalary() {
      this.showSalaryForm = !this.showSalaryForm;
      this.newSalary = this.player.salary;
    },
    formatNewSalary() {
      this.formattedNewSalary = this.formatNumber(this.newSalary);
    },
    formatNumber(value) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
    async updateSalary() {
      try {
        const idToken = localStorage.getItem("idToken");
        await axios.put(
          `/api/players/${this.player.id}`,
          { salary: this.newSalary },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Salary updated successfully.");
        this.player.salary = this.newSalary;
        this.showSalaryForm = false;
      } catch (error) {
        console.error("Error updating salary:", error);
      }
    },
    async confirmTerminateContract() {
      const isConfirmed = window.confirm(
        "Are you sure you want to terminate the contract?"
      );

      if (isConfirmed) {
        await this.terminateContract();
      }
    },
    async terminateContract() {
      try {
        const idToken = localStorage.getItem("idToken");
        await axios.delete(`/api/players/deletePlayer/${this.player.id}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        alert("Contract terminated successfully.");
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error terminating contract:", error);
      }
    },
  },
};
</script>
