<template>
  <div class="team-page">
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
      <div class="back-button-container">
        <button @click="goBack" class="back-button">Back to Region</button>
      </div>
      <!-- Team Information Section -->
      <div class="team-info">
        <div class="team-header">
          <img
            v-if="teamCountry"
            :src="`https://flagcdn.com/w40/${teamCountry.toLowerCase()}.png`"
            alt="Team Country"
            class="team-flag"
          />
          <h1 class="team-title">{{ teamName }}'s Roster</h1>
        </div>
        <div class="team-socials">
          <a
            v-for="social in teamSocials"
            :key="social"
            :href="social"
            target="_blank"
            rel="noopener noreferrer"
            class="team-social-link"
          >
            <font-awesome-icon
              v-if="isTwitterLink(social)"
              :icon="['fab', 'twitter']"
            />
            <font-awesome-icon v-else :icon="['fas', 'link']" />
          </a>
        </div>
      </div>

      <p class="subtitle">
        Explore the current roster of players representing their respective
        region. Select a player to view more details about their stats and
        journey.
      </p>

      <!-- Error Message -->
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Players Section -->
      <div class="players-container">
        <router-link
          v-for="player in players"
          :key="player.id"
          :to="{ name: 'player', params: { id: player.id } }"
          class="player-card-link"
        >
          <div class="player-card">
            <!-- Player Profile Image or Placeholder -->
            <div class="player-profile-wrapper">
              <img
                v-if="
                  player.profileImageUrl &&
                  !player.profileImageUrl.endsWith('sil.png')
                "
                :src="player.profileImageUrl"
                :alt="player.name"
                class="player-profile"
              />
              <img
                v-else
                :src="playerPlaceholder"
                alt="Player silhouette"
                class="player-silhouette"
              />
            </div>

            <!-- Player Name and Country -->
            <div class="player-info">
              <img
                v-if="player.country"
                :src="`https://flagcdn.com/w40/${player.country.toLowerCase()}.png`"
                :alt="player.country"
                class="flag-icon"
              />
              <h3 class="player-name">{{ player.name }}</h3>
            </div>

            <!-- Additional Info -->
            <p class="player-realname" v-if="player.realName">
              Real Name: {{ player.realName }}
            </p>
            <p class="player-role" v-if="player.roleDescription">
              Role: {{ player.roleDescription }}
            </p>
            <p class="player-empty-role" v-else>Role: Not Specified</p>
          </div>
        </router-link>
      </div>

      <!-- Disclaimer Section -->
      <p class="smaller-description">
        Note: All data is sourced from <strong>vlr.gg</strong> and is not
        officially affiliated with VALORANT or vlr.gg. If you encounter any
        bugs, please contact the developer through
        <a
          href="https://angel-heredia.com/"
          target="_blank"
          rel="noopener noreferrer"
          >his website</a
        >.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import playerPlaceholder from "@/assets/player-placeholder.png";
import Loading from "@/components/Loading.vue";

export default {
  name: "TeamPage",
  components: {
    Loading,
  },
  props: ["id"], // Team ID passed from the route
  data() {
    return {
      teamName: "",
      teamCountry: null,
      teamSocials: [],
      players: [],
      playerPlaceholder,
      loading: true,
      error: null,
      dropdownVisible: false,
    };
  },
  computed: {
    dropdownIconClass() {
      return this.dropdownVisible ? "icon-flipped" : "icon-default";
    },
  },
  methods: {
    async fetchTeamData() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://vlr-franchising-database-backend-a5cgguczc6fna4hj.canadacentral-01.azurewebsites.net/api/Valorant/players/${this.id}`
        );

        // Ensure response data exists
        if (response.data.length > 0) {
          const firstPlayer = response.data[0];

          // Assign team details from the first player
          this.teamName = firstPlayer.teamName || "Unknown Team";
          this.teamCountry = firstPlayer.teamCountry || null;
          this.teamSocials = firstPlayer.teamSocials || [];
          this.players = response.data;
        } else {
          this.error = "No players found for this team.";
        }
      } catch (error) {
        console.error("API Error:", error);
        this.error = "Failed to load players for the team.";
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.back(); // Navigate back to the previous page
    },
    isTwitterLink(link) {
      return link.includes("twitter.com") || link.includes("x.com");
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
  async created() {
    await this.fetchTeamData();
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

.team-page {
  text-align: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #f4f4f4;
  min-height: 100vh;
}

/* Page Title Styling */
.team-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff4655;
  margin-bottom: 1rem;
}

.valorant-font {
  font-family: "ValorantFont", sans-serif;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #e0e0e0;
}

/* Disclaimer Styling */
.smaller-description {
  font-size: 0.9rem;
  margin-top: 2rem;
  color: #e0e0e0;
}

.smaller-description a {
  color: #ff4655;
  text-decoration: none;
}

.smaller-description a:hover {
  text-decoration: underline;
}

/* Players Container */
.players-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

/* Player Card */
.player-card {
  background-color: #3a3a4d;
  padding: 1rem;
  border-radius: 12px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.player-profile-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #5d6085;
  margin: 0 auto 1rem;
}

.player-profile,
.player-silhouette {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.player-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.flag-icon {
  width: 25px;
  height: 18px;
  border-radius: 2px;
}

.player-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
}

.player-role,
.player-realname {
  font-size: 1rem;
  color: #cccccc;
}

.player-empty-role {
  font-size: 1rem;
  color: #3a3a4d;
}

.player-card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card-link:hover {
  transform: scale(1.05);
}

/* Buttons */
.back-button {
  display: inline-block;
  margin: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  background-color: #ff4655;
  color: #ffffff;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
  background-color: #ff6775;
  transform: scale(1.05);
}

/* Error Message */
.error {
  font-size: 1.2rem;
  color: #ff4655;
}

.team-info {
  margin-bottom: 2rem;
}

.team-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.team-flag {
  width: 40px;
  height: 30px;
}

.team-socials {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.team-social-link {
  font-size: 1.5rem;
  color: #ffffff;
  transition: color 0.3s ease, transform 0.2s ease;
}

.team-social-link:hover {
  color: #ff4655;
  transform: scale(1.1);
}

/* Dropdown Menu */
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
/* Mobile Styles */
@media (max-width: 768px) {
  .player-card:hover {
    transform: scale(0.96);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
  /* Adjust Page Padding */
  .team-page {
    padding: 1rem; /* Reduce padding for smaller screens */
  }

  /* Team Title */
  .team-title {
    font-size: 1rem; /* Reduce font size */
    margin-bottom: 0.5rem;
  }

  /* Subtitle */
  .subtitle {
    font-size: 0.75rem; /* Smaller text for better fit */
    margin-bottom: 1.5rem;
  }

  /* Back Button */
  .back-button {
    font-size: 0.8rem; /* Reduce font size */
    padding: 0.4rem 1rem; /* Adjust padding */
  }

  /* Players Container */
  .players-container {
    display: grid;
    gap: 1rem; /* Reduce gap between cards */
    justify-content: center;
    grid-template-columns: repeat(2, 1fr); /* Two columns for player cards */
  }

  /* Player Card */
  .player-card {
    width: 90px; /* Shrink card width */
    padding: 0.5rem; /* Adjust padding */
    font-size: 0.8rem; /* Adjust font size */
  }

  /* Player Profile Image */
  .player-profile-wrapper {
    width: 80px; /* Shrink profile image size */
    height: 80px;
  }

  .player-profile,
  .player-silhouette {
    width: 100%; /* Ensure images fit the wrapper */
    height: 100%;
  }

  /* Player Name and Info */
  .player-name {
    font-size: 0.75rem; /* Adjust name size */
  }

  .player-role,
  .player-realname,
  .player-empty-role {
    font-size: 0.6rem; /* Adjust additional info size */
  }
  .flag-icon {
    width: 13px;
    height: 9px;
    border-radius: 2px;
  }
  /* Team Social Links */
  .team-socials {
    gap: 0.5rem; /* Reduce spacing between social icons */
  }

  .team-social-link {
    font-size: 1.2rem; /* Reduce icon size */
  }

  /* Dropdown Button */
  .dropdown-button {
    font-size: 0.9rem; /* Adjust font size */
    padding: 0.4rem 0.8rem; /* Adjust padding */
  }

  /* Disclaimer */
  .smaller-description {
    font-size: 0.8rem; /* Smaller disclaimer text */
    margin-top: 1rem; /* Reduce spacing above */
  }
}
</style>
