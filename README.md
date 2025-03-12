# Weather App

## Overview
This is a **React Native** weather application built using **Expo**, which allows users to search for cities and view their current weather conditions. The app includes features such as:
- **Adding/Removing cities**
- **Fetching real-time weather data** from OpenWeatherMap API
- **Customizable settings** for temperature units (Celsius/Fahrenheit), text size, and sound effects
- **Offline storage** using AsyncStorage
- **Interactive UI** with swipe-to-delete functionality

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **Expo CLI** (`npm install -g expo-cli`)
- **React Native**

### Clone the Repository
```sh
git clone https://github.com/your-repository/weather-app.git
cd weather-app
```

### Install Dependencies
```sh
npm install
```

### Run the App
```sh
expo start
```

## Using the App
### Mobile App Experience
This app is designed for **mobile usage**. If running on a web browser:
- Open **Developer Tools** (F12 or right-click → Inspect)
- **Switch to Developer Mode**
- Select **iPhone Mode** in the responsive settings

For the best experience, scan the **Expo QR Code** in the terminal using your phone.

### Features
- **Search & Add Cities**: Tap the **`+`** icon to add a city.
- **View Weather Details**: Displays temperature, time, date, and weather conditions.
- **Swipe to Delete**: Remove a city by swiping left.
- **Settings**: Customize text size, sound effects, and temperature units.

## API & Dependencies
- **Weather API**: OpenWeatherMap API (Replace API key in `API_KEY` variable)
- **Dependencies**:
  - `react-native`
  - `expo-router`
  - `react-native-gesture-handler`
  - `async-storage`
  - `expo-av` (for sound effects)

## Troubleshooting
- **Weather Not Loading?**
  - Check if the **API key** is correct (`API_KEY` in `MainScreen.tsx`).
  - Ensure internet connectivity.
- **No Sound Effects?**
  - Verify that sound effects are **enabled in settings**.
  - Restart the app to apply changes.

## License
MIT License. Feel free to modify and enhance the project.

---
For any issues, please open a GitHub **issue** or reach out to the developer. Happy coding! 🚀

