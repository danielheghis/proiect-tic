<template>
  <div class="login-container">
    <div class="login-box">
      <LogoComponent class="mb-4 font-bold" />
      <h2 class="font-bold text-2xl mb-3">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LogoComponent from "./LogoComponent.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const idToken = await userCredential.user.getIdToken();

        localStorage.setItem("idToken", idToken);
        alert("Login successful!");
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid email or password");
      }
    },
  },
  components: { LogoComponent },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #369f6e;
}
</style>
