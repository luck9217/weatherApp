import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import citiesDataRaw from "./cities.json";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import icons

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

export default function AddCityScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCities = search
    ? citiesData.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
      )
    : citiesData;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Search Bar with Cancel Button */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <TextInput
          style={{
            flex: 1, // Takes available space
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            marginRight: 10, // Spacing from cancel button
          }}
          placeholder="Search city..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => router.push("/")} // Navigate back to Home
          style={{
            backgroundColor: "red",
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* List of Cities */}
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: "/", params: { cityName: item.name } })
            }
            style={{ paddingVertical: 8 }}
          >
            <Text style={{ fontSize: 18 }}>
              {item.name}, {item.country}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
