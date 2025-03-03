import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import citiesDataRaw from "./cities.json"; // Import raw JSON data

// Define the City type
type City = {
  id: number;
  name: string;
  state?: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
};

// Ensure TypeScript recognizes it as an array of cities
const citiesData: City[] = citiesDataRaw as City[];

const API_KEY = "6a72339e05f76418141a3712e054964a";

type CityWeather = {
  id: number;
  name: string;
  country: string;
  date: string;
  time: string;
  temp: number;
  icon: string;
  description: string;
};

export default function MainScreen() {
  const [selectedCities, setSelectedCities] = useState<CityWeather[]>([]);
  const params = useLocalSearchParams();

  useEffect(() => {
    loadStoredCities();
  }, []);

  useEffect(() => {
    if (params.cityName && typeof params.cityName === "string") {
      const city = Array.isArray(citiesData)
        ? citiesData.find((c) => c.name === params.cityName)
        : undefined;

      if (city) {
        fetchWeather(city);
      }
    }
  }, [params.cityName]);

  // Load stored cities from AsyncStorage
  const loadStoredCities = async () => {
    try {
      const storedCities = await AsyncStorage.getItem("selectedCities");
      if (storedCities) {
        setSelectedCities(JSON.parse(storedCities));
      }
    } catch (error) {
      console.error("Failed to load stored cities", error);
    }
  };

  // Save cities to AsyncStorage
  const saveCities = async (cities: CityWeather[]) => {
    try {
      await AsyncStorage.setItem("selectedCities", JSON.stringify(cities));
    } catch (error) {
      console.error("Failed to save cities", error);
    }
  };

  // Fetch weather data for selected city
  const fetchWeather = async (city: City) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await response.json();

      if (weatherData.cod !== 200) {
        alert("Weather data not found!");
        return;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const newCity: CityWeather = {
        id: weatherData.id,
        name: city.name,
        country: city.country,
        date: formattedDate,
        time: formattedTime,
        temp: Math.round(weatherData.main.temp),
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        description: weatherData.weather[0].description,
      };

      // Prevent duplicate cities from being added
      setSelectedCities((prevCities) => {
        if (!prevCities.some((c) => c.id === newCity.id)) {
          const updatedCities = [...prevCities, newCity]; // Append instead of replacing
          saveCities(updatedCities); // Save to AsyncStorage
          return updatedCities;
        }
        return prevCities;
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Remove city when swiped
  const deleteCity = async (id: number) => {
    const updatedCities = selectedCities.filter((city) => city.id !== id);
    setSelectedCities(updatedCities);
    await saveCities(updatedCities);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, padding: 20 }}>
      {/* HEADER SECTION */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/add-city" asChild>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={40} color="blue" />
          </TouchableOpacity>
        </Link>
        <Link href="/settings" asChild>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={40} color="blue" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* MAIN SECTION */}
      {selectedCities.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Welcome to Weather App!
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
            Press{" "}
            <Link href="/add-city" asChild>
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={20} color="blue" />
              </TouchableOpacity>
            </Link>{" "}
            to add cities from around the world to view their date, time, and
            weather.
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
            Press{" "}
            <Link href="/settings" asChild>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={20} color="blue" />
              </TouchableOpacity>
            </Link>{" "}
            for settings. Settings allow the user to select the unit of
            temperature, text size, sound effects, and brightness.
          </Text>
        </View>
      ) : (
        <FlatList
          data={selectedCities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 80,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  onPress={() => deleteCity(item.id)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  marginVertical: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {item.name}, {item.country}
                </Text>
                <Text style={{ fontSize: 14, color: "#555" }}>{item.date}</Text>
                <Text style={{ fontSize: 14, color: "#777" }}>{item.time}</Text>
                <Text
                  style={{ fontSize: 30, color: "#007bff", fontWeight: "bold" }}
                >
                  {item.temp}°C
                </Text>
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 50, height: 50 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    textTransform: "capitalize",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </Swipeable>
          )}
        />
      )}
    </GestureHandlerRootView>
  );
}
