# Weather Analytics

Lightweight React app that shows current weather and simple trends (temperature, precipitation, wind) using OpenWeatherMap and Firebase auth.

- Live demo: https://submission-for-tap-talent-ai.vercel.app/

## Features

- Search for cities and view detailed weather cards
- Hourly and daily charts for temperature, precipitation and wind
- Favorites (persisted via local storage)
- Google sign-in (Firebase)
- Unit toggle (°C / °F)

## Quick start

1. Clone the repo
   git clone https://github.com/tanishenigma/Submission-for-TapTalent.ai
2. Install
   npm install
3. Add a `.env` file at the project root with these variables:

```env
VITE_API_KEY=your_openweathermap_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

The `.env` file is ignored by git.

4. Run dev server
   npm run dev

Build for production:
   npm run build

Lint:
   npm run lint

## Project structure (important files)

- App entry: [`src/main.jsx`](src/main.jsx) and [`src/App.jsx`](src/App.jsx)
- Pages: [`Home`](src/Home.jsx), [`Login`](src/pages/Login.jsx), [`CityWeather`](src/pages/CityWeather.jsx)
- Top-level UI: [`Navbar`](src/Navbar.jsx)
- Components:
  - City detail card: [`CityCard`](src/components/CityCard.jsx)
  - City list card: [`Card`](src/components/Card.jsx)
  - Search: [`Search`](src/components/Searchbar.jsx)
  - Unit toggle: [`ToggleTemp`](src/components/ToggleTemp.jsx)
  - Protected route wrapper: [`ProtectedRoute`](src/components/ProtectedRoute.jsx)
- Charts:
  - Temperature: [`TimeChart`](src/components/Charts/TimeChart.jsx)
  - Precipitation: [`PrecipitationChart`](src/components/Charts/PrecipitationChart.jsx)
  - Wind: [`WindChart`](src/components/Charts/WindChart.jsx)
- Hooks / state:
  - Temperature helpers: [`useTemperature`](src/hooks/useTemperature.jsx)
  - Global unit store: [`useStore`](src/store/useStore.js)
  - Favorites store: [`useFavoritesStore`](src/store/useFavoritesStore.js)
  - User store: [`useUserStore`](src/store/useUserStore.js)
- API helpers:
  - Current weather: [`fetchData`](src/api/fetchCurrent.js)
  - City geocoding + id: [`fetchCitySearch`](src/api/fetchCitySearch.js)
  - Hourly/daily trends: [`fetchWeatherTrends`](src/api/fetchHourlyWeekly.js)
  - Precipitation: [`fetchPrecipitationTrends`](src/api/fetchPrecipitation.js)
  - Wind: [`fetchWindTrends`](src/api/fetchWind.js)

Config / scripts:

- Vite config: [`vite.config.js`](vite.config.js)
- npm scripts & deps: [`package.json`](package.json)

## Notes

- The app uses OpenWeatherMap APIs — an API key is required (`VITE_API_KEY`).
- Firebase is only used for Google sign-in; set the Firebase env vars listed above.
- Favorites and unit selection are persisted using [`zustand` persist middleware] (see [`src/store/useFavoritesStore.js`](src/store/useFavoritesStore.js) and [`src/store/useStore.js`](src/store/useStore.js)).
- Search uses the OpenWeatherMap geocoding endpoint and then fetches current weather to get a city ID (see [`src/api/fetchCitySearch.js`](src/api/fetchCitySearch.js)).

## Troubleshooting

- If charts show "No data", confirm the OpenWeatherMap key is valid and not rate-limited.
- If auth fails, verify Firebase config and OAuth redirect settings in your Firebase console.
