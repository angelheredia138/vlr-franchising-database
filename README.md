# Valorant Franchising Database Frontend

This is the frontend for the **Valorant Franchising Database**, a web application that showcases information about franchised Valorant teams, their players, and related statistics. The frontend is built using **Vue 3** with modern tooling such as **Vite** for fast development and deployment.

## Features

- Dynamic navigation across regions, teams, and players using Vue Router.
- Interactive dropdown navigation with region-based filtering.
- Responsive UI to display teams, players, and detailed statistics.
- Integration with the custom **Valorant Franchising API** to fetch real-time data.

## Technology Stack

- **Vue 3**: Frontend framework for building user interfaces.
- **Vite**: Build tool for fast development and production builds.
- **Vue Router**: For managing routes and navigation.
- **Font Awesome**: Icons for social media links and other UI elements.
- **Axios**: For making API requests to the backend.

## Deployment

The frontend is deployed using **GitHub Pages**. To build and deploy:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

The project is accessible at: [https://angel-heredia.com/vlr-franchising-database](https://angel-heredia.com/vlr-franchising-database)

## Valorant Franchising API

This frontend fetches data from the **Valorant Franchising API**, a custom backend designed specifically for this project. The API provides endpoints for fetching data about:

- Regions
- Teams
- Players
- Player statistics

The API is deployed on Azure and serves as the data backbone for the application.

---

**Developer:** [Angel Heredia](https://angel-heredia.com)
