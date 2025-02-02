<template>
  <NavigationMenu />
  <div class="max-w-4xl mx-auto p-8">
    <h2 class="text-3xl font-semibold mb-6">Sign New Player</h2>
    <form @submit.prevent="signPlayer">
      <div class="mb-4 text-left">
        <label for="photo" class="block text-gray-700 font-medium"
          >Player Photo</label
        >
        <input
          type="file"
          id="photo"
          @change="handleFileChange"
          accept="image/*"
        />
      </div>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          id="name"
          v-model="player.name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        />
      </div>

      <div class="mb-4">
        <label for="age" class="block text-gray-700 font-medium">Age</label>
        <input
          type="number"
          id="age"
          v-model="player.age"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        />
      </div>

      <div class="mb-4">
        <label for="position" class="block text-gray-700 font-medium"
          >Position</label
        >
        <select
          id="position"
          v-model="player.position"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        >
          <option value="">Select a position</option>
          <option value="Goalkeeper">Goalkeeper</option>
          <option value="Defender">Defender</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Forward">Forward</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="salary" class="block text-gray-700 font-medium"
          >Salary (per month, in EUR)</label
        >
        <input
          type="number"
          id="salary"
          v-model="player.salary"
          @input="formatSalary"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          required
        />
        <p class="text-gray-500 mt-3 mb-2 text-left">
          Formatted: {{ formattedSalary }}
        </p>
      </div>

      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Sign Player
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NavigationMenu from "@/components/NavigationMenu.vue";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export default {
  name: "AddPlayerPage",
  components: { NavigationMenu },
  data() {
    return {
      player: {
        name: "",
        age: 0,
        position: "",
        salary: 10000,
      },
      photoFile: null,
      formattedSalary: "",
    };
  },
  methods: {
    async signPlayer() {
      try {
        const currentYear = new Date().getFullYear();

        let photoUrl = "";
        if (this.photoFile) {
          photoUrl = await this.uploadPhoto(this.player.name);
        }

        const newPlayer = {
          ...this.player,
          profileImage: photoUrl,
          isInjured: {
            injuryDetails: { status: false, type: "", estimatedUntil: "" },
          },
          yellowCards: 0,
          redCards: 0,
          joiningYear: currentYear,
          seasonStats: {
            "2024-2025": { matchesPlayed: 0, goals: 0, assists: 0 },
          },
        };

        console.log("Sending request to sign player:", newPlayer);

        const response = await axios.post("/api/players/signPlayer", newPlayer);

        console.log("Response received:", response.data);

        alert("Player signed successfully!");
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error signing player:", error);
        alert("Failed to sign player. Please try again.");
      }
    },
    handleFileChange(event) {
      this.photoFile = event.target.files[0];
    },
    async uploadPhoto(playerName) {
      const storageRef = ref(storage, `players/${playerName}_profile.jpg`);
      await uploadBytes(storageRef, this.photoFile);
      return await getDownloadURL(storageRef);
    },
    formatSalary() {
      this.formattedSalary = this.formatNumber(this.player.salary);
    },
    formatNumber(value) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
  },
};
</script>

<style scoped>
label {
  text-align: left;
  line-height: 2rem;
}
</style>
