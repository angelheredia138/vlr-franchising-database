<template>
  <div class="region-page">
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
      <!-- Navigation Dropdown -->
      <div class="dropdown-container">
        <button @click="toggleDropdown" class="dropdown-button">
          Navigate Regions <span :class="dropdownIconClass">▼</span>
        </button>
        <transition name="dropdown">
          <div v-if="dropdownVisible" class="dropdown-menu">
            <router-link to="/" class="dropdown-item">Home</router-link>
            <router-link to="/region/americas" class="dropdown-item"
              >Americas</router-link
            >
            <router-link to="/region/emea" class="dropdown-item"
              >EMEA</router-link
            >
            <router-link to="/region/china" class="dropdown-item"
              >China</router-link
            >
            <router-link to="/region/pacific" class="dropdown-item"
              >Pacific</router-link
            >
          </div>
        </transition>
      </div>

      <!-- Header Section -->
      <div class="header">
        <div class="back-button-container">
          <button @click="goBack" class="back-button">Back to Home</button>
        </div>
        <img :src="regionLogo" :alt="regionName" class="header-logo" />
        <h1 class="header-title valorant-font">
          VCT {{ regionName.toUpperCase() }}
        </h1>
      </div>

      <!-- Subtitle Section -->
      <p class="subtitle">Welcome to the VCT {{ regionName }} region page!</p>

      <!-- Teams Section -->
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else class="teams-container">
        <router-link
          v-for="team in teams"
          :key="team.id"
          :to="`/team/${team.id}`"
          class="team-card-link"
        >
          <div class="team-card">
            <img :src="team.logoUrl" :alt="team.name" class="team-logo" />
            <h2 class="team-name">{{ team.name }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  name: "RegionPage",
  components: {
    Loading,
  },
  data() {
    return {
      teams: [],
      loading: true,
      error: null,
      regionName: "",
      regionLogo: "",
      dropdownVisible: false,
    };
  },
  computed: {
    dropdownIconClass() {
      return this.dropdownVisible ? "icon-flipped" : "icon-default";
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.setRegionData();
        this.fetchData();
      },
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    setRegionData() {
      const regionMap = {
        americas: {
          name: "Americas",
          logo: "/src/assets/vct-americas-png.png",
        },
        emea: {
          name: "EMEA",
          logo: "/src/assets/vct-emea-png.png",
        },
        china: {
          name: "China",
          logo: "/src/assets/vct-china-png.png",
        },
        pacific: {
          name: "Pacific",
          logo: "/src/assets/vct-pacific-png.png",
        },
      };

      const regionKey = this.$route.params.region;
      const regionData = regionMap[regionKey];

      if (regionData) {
        this.regionName = regionData.name;
        this.regionLogo = regionData.logo;
      } else {
        this.error = "Invalid region.";
        this.loading = false;
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://vlr-franchising-database-backend-a5cgguczc6fna4hj.canadacentral-01.azurewebsites.net/api/Valorant/teams/${this.$route.params.region}`
        );
        this.teams = response.data;
      } catch (err) {
        console.error("API Error:", err);
        this.error = "Failed to load teams. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style scoped>
.region-page {
  text-align: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #f4f4f4;
  min-height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.header-logo {
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 2.5rem;
  color: #ff4655; /* Valorant red */
  text-transform: uppercase;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #e0e0e0;
}

.loading {
  font-size: 1.5rem;
  color: #ffb800;
}

.error {
  font-size: 1.2rem;
  color: #ff4655;
}

.teams-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
}

.team-card {
  background-color: #3a3a4d; /* Lighter dark background */
  padding: 1rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative; /* Needed for overlay */
  overflow: hidden; /* Ensures the overlay doesn’t spill out */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Softer shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.team-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.001) 100%
  );
  z-index: 0; /* Ensure it’s behind the content */
}

.team-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Slightly stronger hover shadow */
  background-color: #4a4a5e; /* Even lighter on hover */
}

.team-card-link {
  text-decoration: none;
  color: inherit; /* Ensure text color remains the same */
  display: inline-block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card-link:hover {
  transform: scale(1.05); /* Subtle zoom effect */
}

.team-logo {
  position: relative; /* Raise above the overlay */
  z-index: 1;
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.team-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
}

/* Valorant font styling */
.valorant-font {
  font-family: "ValorantFont", sans-serif;
  font-weight: bold;
}
.back-button {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ff4655; /* Valorant red */
  color: #ffffff;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
  background-color: #ff6775; /* Slightly lighter red on hover */
  transform: scale(1.05); /* Subtle zoom effect */
}

.dropdown-container {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: fit-content;
  background-color: transparent;
}

.dropdown-button {
  background-color: #ff4655;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dropdown-button:hover {
  background-color: #ff6775;
  transform: scale(1.05);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background-color: #3a3a4d;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 200px;
  text-align: left;
  animation: dropdown-animation 0.3s ease-out;
}

@keyframes dropdown-animation {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #4a4a5e;
}

.dropdown-item:last-child {
  border-bottom: none;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.icon-default {
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.icon-flipped {
  display: inline-block;
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
