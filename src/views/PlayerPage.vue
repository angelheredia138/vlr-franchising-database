<template>
  <div class="player-page">
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
        <button @click="goBack" class="back-button">Back to Team Roster</button>
      </div>

      <!-- Player Overview Section -->
      <div class="player-overview">
        <div class="player-image-wrapper">
          <img
            v-if="
              playerData.playerImage &&
              !playerData.playerImage.endsWith('sil.png')
            "
            :src="playerData.playerImage"
            :alt="playerData.playerRealName"
            class="player-profile"
          />
          <img
            v-else
            src="../assets/player-placeholder.png"
            alt="Player silhouette"
            class="player-profile"
          />
        </div>
        <div class="player-details">
          <h1 class="player-username">{{ playerData.username }}</h1>
          <p class="player-realname">{{ playerData.playerRealName }}</p>
          <div class="player-country-social">
            <p v-if="playerData.country" class="player-country">
              <img
                :src="`https://flagcdn.com/w40/${playerData.country.toLowerCase()}.png`"
                :alt="playerData.country"
                class="country-flag"
              />
            </p>
            <div class="social-media-links">
              <a
                v-for="handle in getSocialMediaLinks(
                  playerData.socialMediaHandles
                )"
                :key="handle.platform"
                :href="handle.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-media-link"
              >
                <font-awesome-icon
                  :icon="[handle.iconPrefix, handle.iconName]"
                />
              </a>
            </div>
          </div>
          <div v-if="playerData.currentTeam" class="current-team">
            <div class="team-logo-wrapper">
              <img
                v-if="playerData.currentTeamImage"
                :src="playerData.currentTeamImage"
                alt="Current Team Logo"
                class="team-logo"
              />
            </div>
            <span>Current Team: {{ playerData.currentTeam }}</span>
          </div>
        </div>
      </div>

      <!-- Past Teams Section -->
      <div
        class="details-card"
        v-if="playerData.pastTeams && playerData.pastTeams.length"
      >
        <h3>Past Teams</h3>
        <div class="teams-container">
          <div
            class="team-card"
            v-for="(team, index) in playerData.pastTeams"
            :key="index"
          >
            <div class="team-logo-wrapper">
              <img
                v-if="
                  playerData.pastTeamImages[index] &&
                  !playerData.pastTeamImages[index].endsWith('vlr.png')
                "
                :src="playerData.pastTeamImages[index]"
                alt="Past Team Logo"
                class="past-teams-logo"
              />
              <p v-else class="team-name-placeholder"></p>
            </div>
            <div class="team-details">
              <p class="team-name">{{ team }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Last Matches Section -->
      <div
        class="details-card"
        v-if="playerData.lastMatches && playerData.lastMatches.length"
      >
        <h3>Last Matches</h3>
        <div class="matches-container">
          <div
            class="match-card"
            v-for="(match, index) in playerData.lastMatches"
            :key="index"
          >
            <div class="match-team">
              <img
                v-if="match.teamImage"
                :src="match.teamImage"
                alt="Team Image"
                class="team-logo"
              />
              <p class="team-name">{{ decodeHtmlEntities(match.teamName) }}</p>
            </div>
            <p class="vs-text">vs</p>
            <div class="match-opponent">
              <img
                v-if="match.opponentImage"
                :src="match.opponentImage"
                alt="Opponent Image"
                class="team-logo"
              />
              <p class="team-name">{{ decodeHtmlEntities(match.opponent) }}</p>
            </div>
            <div class="match-details">
              <p class="event-name">
                {{ decodeHtmlEntities(match.eventName) }}
              </p>
              <p class="match-result">
                <strong>Result:</strong> {{ decodeHtmlEntities(match.result) }}
              </p>
              <p class="match-date">
                <strong>Date:</strong> {{ match.date.trim() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Agents Section -->
      <div
        class="details-card"
        v-if="playerData.topAgents && playerData.topAgents.length"
      >
        <h3>Top Agents (last 90 days)</h3>
        <div class="agents-container">
          <div
            class="agent-card"
            v-for="(agent, index) in playerData.topAgents"
            :key="index"
          >
            <div class="agent-info">
              <img
                v-if="agent.agentImage"
                :src="agent.agentImage"
                alt="Agent Image"
                class="agent-image"
              />
              <div class="agent-details">
                <p>
                  <strong>{{ agent.agentName }}</strong>
                </p>
              </div>
            </div>
            <div class="agent-stats">
              <p>
                <strong>Rounds Played:</strong> {{ agent.roundsPlayed }} |
                <strong>Rating:</strong> {{ agent.rating }} |
                <strong>ACS:</strong> {{ agent.acs }} | <strong>KD:</strong>
                {{ agent.kd }} | <strong>ADR:</strong> {{ agent.adr }} |
                <strong>KAST:</strong> {{ agent.kast }} | <strong>KPR:</strong>
                {{ agent.kpr }} | <strong>APR:</strong> {{ agent.apr }} |
                <strong>FKPR:</strong> {{ agent.fkpr }} | <strong>FDPR:</strong>
                {{ agent.fdpr }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Winnings Section -->
      <div class="details-card winnings-card">
        <h3 class="winnings-title">Total Winnings</h3>
        <div class="winnings-amount">
          <span>{{ playerData.totalWinnings }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  name: "PlayerPage",
  components: {
    Loading,
  },
  data() {
    return {
      playerData: {
        socialMediaHandles: [],
      },
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
    goBack() {
      this.$router.back();
    },
    decodeHtmlEntities(text) {
      const textArea = document.createElement("textarea");
      textArea.innerHTML = text;
      return textArea.value;
    },
    getSocialMediaLinks(handles) {
      const socialMediaMap = {
        twitter: { iconPrefix: "fab", iconName: "twitter" },
        twitch: { iconPrefix: "fab", iconName: "twitch" },
      };

      return handles
        .filter(
          (handle) =>
            handle.includes("twitter.com") ||
            handle.includes("x.com") ||
            handle.includes("twitch.tv")
        )
        .map((handle) => {
          let platform;
          if (handle.includes("twitter.com") || handle.includes("x.com")) {
            platform = "twitter";
          } else if (handle.includes("twitch.tv")) {
            platform = "twitch";
          }
          return {
            platform,
            url: handle,
            iconPrefix: socialMediaMap[platform].iconPrefix,
            iconName: socialMediaMap[platform].iconName,
          };
        });
    },
    async fetchPlayerData(playerId) {
      try {
        const response = await axios.get(
          `https://vlr-franchising-database-backend-a5cgguczc6fna4hj.canadacentral-01.azurewebsites.net/api/Valorant/player-stats/${playerId}`
        );
        this.playerData = response.data;
      } catch (error) {
        console.error("API Error:", error);
        this.error = "Failed to load player details.";
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
  async created() {
    const playerId = this.$route.params.id;
    this.loading = true;
    await this.fetchPlayerData(playerId);
  },
};
</script>

<style scoped>
.player-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #f4f4f4;
  text-align: left; /* Ensures all content is left-aligned */
}

.back-button {
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ff4655;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.back-button:hover {
  background-color: #ff6775;
  transform: scale(1.05);
}
.back-button-container {
  text-align: center; /* Center the button horizontally */
  margin-bottom: 2rem; /* Add space below the button */
}

.back-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ff4655;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.back-button:hover {
  background-color: #ff6775;
  transform: scale(1.05);
}

.player-overview {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.player-image-wrapper {
  flex-shrink: 0;
}

.player-profile {
  width: 150px;
  height: 150px;
  background-color: #5d6085;
  border-radius: 50%;
}

.player-username {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.player-realname {
  font-size: 1.2rem;
  color: #cccccc;
}

.player-country {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.country-flag {
  width: 30px;
  height: 20px;
}

.current-team {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.teams-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.team-logo-wrapper {
  background-color: #5d6085;
  padding: 5px;
  display: inline-block;
  border-radius: 8px;
}

.team-card {
  display: flex;
  align-items: center;
  background-color: #5d6085;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.team-logo {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.past-teams-logo {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 1rem;
}
.team-details {
  display: flex;
  flex-direction: column;
}

.team-name {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  text-transform: capitalize;
}

.vs-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff4655;
  margin: 0 1rem;
}

.match-details {
  flex-grow: 1;
  text-align: right;
}
.event-name {
  font-size: 1rem;
  font-weight: bold;
  color: #111823;
}

.match-result,
.match-date {
  font-size: 0.9rem;
  color: #e0e0e0;
}

.details-card {
  background-color: #3a3a4d;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: left;
}
.matches-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.match-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #5d6085;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.match-team,
.match-opponent {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.details-card h3 {
  color: #ff4655;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 0.5rem;
}

.match-logo,
.agent-image {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.agents-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.agent-card {
  justify-content: space-between;
  align-items: center;
  background-color: #5d6085;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.agent-image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.agent-details p {
  font-size: 1rem;
  color: #ffffff;
  text-transform: capitalize;
}

.agent-stats {
  text-align: right;
  font-size: 0.9rem;
  color: #e0e0e0;
  flex-grow: 1;
}

.agent-stats p {
  margin: 0.2rem 0;
}
.player-country-social {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-media-links {
  display: flex;
  gap: 1rem;
}

.social-media-link {
  color: #ffffff; /* Default icon color */
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.2s ease;
}

.social-media-link:hover {
  color: #ff4655; /* Hover effect for icons */
  transform: scale(1.2);
}
.winnings-card {
  background-color: #5d6085; /* Same as other card sections */
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center; /* Center content for this section */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.winnings-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff4655; /* Highlighted title color */
  margin-bottom: 1rem;
}

.winnings-amount {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff; /* Standout text color */
  background: linear-gradient(
    90deg,
    #ff4655,
    #7b5cff
  ); /* Eye-catching gradient */
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 8px;
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
