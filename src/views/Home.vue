<template>
  <div class="home-container">
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
    <h1 class="title">
      Welcome to the <em>unofficial </em>
      <span class="valorant-font">VALORANT</span> Franchising Player Database!
    </h1>
    <p class="subtitle">
      This database compiles information about franchised players, teams, and
      their matches across all VALORANT regions. Dive in to explore team
      rosters, match histories, and more.
    </p>
    <p class="description">
      Select a region below to start exploring! Each region showcases its teams
      and players, offering detailed insights into the VALORANT competitive
      scene.
    </p>

    <div class="region-icons">
      <router-link to="/region/americas" class="region">
        <img :src="vctAmericas" alt="Americas" class="region-icon" />
        <p class="region-label">AMERICAS</p>
      </router-link>

      <router-link to="/region/emea" class="region">
        <img :src="vctEmea" alt="EMEA" class="region-icon" />
        <p class="region-label">EMEA</p>
      </router-link>

      <router-link to="/region/china" class="region">
        <img :src="vctChina" alt="China" class="region-icon" />
        <p class="region-label">CHINA</p>
      </router-link>

      <router-link to="/region/pacific" class="region">
        <img :src="vctPacific" alt="Pacific" class="region-icon" />
        <p class="region-label">PACIFIC</p>
      </router-link>
    </div>

    <p class="smallest-description">
      note: all data is received from vlr.gg and is not associated with vlr.gg
      nor VALORANT. all of the teams' info were received from each region's
      respective 2025 KICKOFF tournament. if you encounter any bugs, contact the
      developer at
      <a
        href="https://angel-heredia.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        his website</a
      >.
    </p>
  </div>
</template>

<script>
import vctAmericas from "@/assets/vct-americas-png.png";
import vctEmea from "@/assets/vct-emea-png.png";
import vctChina from "@/assets/vct-china-png.png";
import vctPacific from "@/assets/vct-pacific-png.png";

export default {
  name: "Home",

  data() {
    return {
      dropdownVisible: false,
      // Image references imported above
      vctAmericas,
      vctEmea,
      vctChina,
      vctPacific,
    };
  },
  computed: {
    dropdownIconClass() {
      return this.dropdownVisible ? "icon-flipped" : "icon-default";
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "ValorantFont";
  src: url("@/assets/Valorant Font.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* Container styling */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  font-family: "Arial", sans-serif;
  color: #f4f4f4;
  min-height: 100vh;
}

/* Title styling */
.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ff4655; /* Valorant red */
}

.title em {
  font-style: italic;
  color: #ffb800; /* Gold for emphasis */
}

/* Apply Valorant font specifically to the word VALORANT */
.valorant-font {
  font-family: "ValorantFont", sans-serif;
  font-size: 3.5rem;
  font-weight: bold;
  color: #ff4655; /* Valorant red */
}

/* Subtitle styling */
.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e0e0e0; /* Lighter gray for subtitle */
}

/* Description styling */
.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #cccccc; /* Slightly muted text */
  max-width: 600px;
  line-height: 1.6;
}
.smallest-description,
.smaller-description {
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #cccccc; /* Slightly muted text */
  max-width: 600px;
  line-height: 1.6;
}

/* Region icons container */
.region-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
}

/* Individual region styling */
.region {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.region:hover {
  transform: scale(1.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

/* Region icon styling */
.region-icon {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #2c2c3c; /* Placeholder color for missing images */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.region-icon:hover {
  transform: scale(1.1);
}

/* Region label styling */
.region-label {
  margin-top: 0.75rem;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: bold;
  font-family: "ValorantFont", sans-serif;
  text-transform: uppercase;
}

/* Dropdown Container */
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
/* Media Query for Mobile Screens */
@media (max-width: 768px) {
  /* Container styling */
  .home-container {
    padding: 0rem;
  }
  /* Make all text smaller */
  .title {
    font-size: 1.25rem;
  }
  .valorant-font {
    font-size: 1.25rem;
  }
  .subtitle {
    font-size: 0.75rem;
    margin-bottom: 0rem;
  }

  .description,
  .smaller-description {
    font-size: 0.65rem;
    margin-bottom: 0rem;
  }
  .smallest-description {
    font-size: 0.6rem;
    margin-bottom: 0rem;
  }
  .region-label {
    font-size: 1rem;
  }

  .dropdown-button {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .dropdown-item {
    font-size: 0.9rem;
  }

  /* Adjust region buttons to a 2x2 grid */
  .region-icons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem;
    justify-items: center; /* Center icons horizontally */
    align-items: center; /* Center icons vertically */
  }

  /* Make region buttons smaller */
  .region {
    transform: scale(0.8);
  }

  .region-icon {
    width: 75px;
    height: 75px;
  }
}
</style>
