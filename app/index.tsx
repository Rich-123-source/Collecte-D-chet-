import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomNavBar from "../components/CustomNavBar";

import Home from "./ecrans/Home";
import Map from "./ecrans/MapScreen";
import Tours from "./ecrans/Tours";
import Stats from "./ecrans/StatsScreen";
import Profile from "./ecrans/Profile";
import DetailScreen from "./ecrans/DetailScreen";

type MarkerData = {
  image: any;
  address: string;
  type: "urgent" | "non-collecté";
  latitude: number;
  longitude: number;
};

const Index = () => {
  const [active, setActive] = useState("home");
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const renderContent = () => {
    switch (active) {
      case "home":
        return <Home onNavigate={(screen: string) => setActive(screen)} username="kernard TOFA" />;
      case "map":
        return (
          <Map
            onVoirPlus={() => setActive("detail")}
            setSelectedMarker={setSelectedMarker}
          />
        );
      case "tours":
        return <Tours />;
      case "stats":
        return <Stats />;
      case "profile":
        return <Profile />;
      case "detail":
        return <DetailScreen marker={selectedMarker} onBack={() => setActive("map")} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <CustomNavBar
        focusedKey={active}
        tabs={[
          { key: "home", iconLib: "Entypo", iconName: "home", onPress: () => setActive("home") },
          { key: "map", iconLib: "FontAwesome5", iconName: "map-marked-alt", onPress: () => setActive("map") },
          { key: "tours", iconLib: "FontAwesome5", iconName: "truck", onPress: () => setActive("tours") },
          { key: "stats", iconLib: "FontAwesome5", iconName: "chart-line", onPress: () => setActive("stats") },
          { key: "profile", iconLib: "Ionicons", iconName: "person-outline", onPress: () => setActive("profile") },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Index;