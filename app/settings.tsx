import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [unit, setUnit] = useState("Celsius");
  const [textSize, setTextSize] = useState("Normal");
  const [soundEffects, setSoundEffects] = useState(true);
  const [brightness, setBrightness] = useState(1); // Default brightness (1 = 100%)

  useEffect(() => {
    loadSettings();
  }, []);

  // Load settings from AsyncStorage
  const loadSettings = async () => {
    try {
      const storedUnit = await AsyncStorage.getItem("unit");
      const storedTextSize = await AsyncStorage.getItem("textSize");
      const storedSound = await AsyncStorage.getItem("soundEffects");
      const storedBrightness = await AsyncStorage.getItem("brightness");

      if (storedUnit) setUnit(storedUnit);
      if (storedTextSize) setTextSize(storedTextSize);
      if (storedSound !== null) setSoundEffects(JSON.parse(storedSound));
      if (storedBrightness) setBrightness(parseFloat(storedBrightness));
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  };

  // Save settings to AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem("unit", unit);
      await AsyncStorage.setItem("textSize", textSize);
      await AsyncStorage.setItem("soundEffects", JSON.stringify(soundEffects));
      await AsyncStorage.setItem("brightness", brightness.toString());
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  // Reset settings to default values
  const resetSettings = async () => {
    setUnit("Celsius");
    setTextSize("Normal");
    setSoundEffects(true);
    setBrightness(1);
    await AsyncStorage.clear();
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Settings
      </Text>

      {/* Temperature Unit Selection */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Temperature Unit:
      </Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setUnit("Celsius")}
          style={{
            padding: 10,
            backgroundColor: unit === "Celsius" ? "blue" : "gray",
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Celsius</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUnit("Fahrenheit")}
          style={{
            padding: 10,
            backgroundColor: unit === "Fahrenheit" ? "blue" : "gray",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Fahrenheit</Text>
        </TouchableOpacity>
      </View>

      {/* Text Size Selection */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Text Size:</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {["Normal", "Large", "Extra-Large"].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => setTextSize(size)}
            style={{
              padding: 10,
              backgroundColor: textSize === size ? "blue" : "gray",
              marginRight: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sound Effects Toggle */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sound Effects:</Text>
      <Switch
        value={soundEffects}
        onValueChange={(value) => setSoundEffects(value)}
      />

      {/* Brightness Adjustment */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Brightness:
      </Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0.1}
        maximumValue={1}
        value={brightness}
        onValueChange={(value) => setBrightness(value)}
      />
      <Text>{Math.round(brightness * 100)}%</Text>

      {/* About Section */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Weather App</Text>
        <Text>© 2024 Weather Inc.</Text>
        <Text>Version: 1.0</Text>
        <Text>Last Update: {new Date().toLocaleDateString()}</Text>
        <Text>Build Date: {new Date().toLocaleDateString()}</Text>
        <Text>Developer: [Your Name]</Text>
        <Text>Student Number: [Your Student Number]</Text>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        {/* Reset Defaults Button */}
        <TouchableOpacity
          onPress={resetSettings}
          style={{
            backgroundColor: "red",
            padding: 15,
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <Link href="/" asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              padding: 15,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Back</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
