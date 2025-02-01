<template>
  <div class="header-container">
    <h1>Vue</h1>
    <img src="../assets/logo.png" alt="Logo" class="logo" />
    <h1>Club</h1>
  </div>
</template>

<script>
export default {
  name: "LogoComponent",
};
</script>
<style scoped>
.header-container {
  display: inline-flex;
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
  font-size: 40px;
}
</style>
