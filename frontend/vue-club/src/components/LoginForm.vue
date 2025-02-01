<template>
  <div class="login-container">
    <div class="login-box">
      <LogoComponent class="mb-4 font-bold" />
      <h2 class="font-bold text-2xl mb-3">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
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
import LogoComponent from "./LogoComponent.vue";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.username === "admin" && this.password === "password") {
        alert("Login successful!");
        this.$router.push("/dashboard");
      } else {
        alert("Invalid username or password");
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

.header-container {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.logo {
  width: 50px;
  height: auto;
}

h1 {
  margin: 0;
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

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
