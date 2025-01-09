<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-text">Loading...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  mounted() {
    // Add class to disable scrolling when this page is mounted
    document.body.classList.add("disable-scroll");
  },
  unmounted() {
    // Remove class to re-enable scrolling when leaving this page
    document.body.classList.remove("disable-scroll");
  },
};
</script>

<style scoped>
.loading-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #cccccc;
  border-top: 5px solid #ff4655; /* Highlight color for the spinner */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
