import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

type Point = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: "à collecter" | "collecté";
};

const initialPoints: Point[] = [
  { id: 1, name: "Adidogomé", latitude: 6.1642, longitude: 1.2314, status: "à collecter" },
  { id: 2, name: "Tokoin", latitude: 6.165, longitude: 1.232, status: "à collecter" },
  { id: 3, name: "Agoè", latitude: 6.162, longitude: 1.228, status: "à collecter" },
  { id: 4, name: "Bè Kpota", latitude: 6.168, longitude: 1.230, status: "à collecter" },
];

const Tours = () => {
  const [points, setPoints] = useState<Point[]>(initialPoints);
  const [tourStarted, setTourStarted] = useState(false);

  const collectedCount = points.filter((p) => p.status === "collecté").length;

  const toggleStatus = (id: number) => {
    setPoints((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "collecté" ? "à collecter" : "collecté" }
          : p
      )
    );
  };

  const startTour = () => {
    const waypoints = points.map((p) => `${p.latitude},${p.longitude}`).join("|");
    const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&waypoints=${waypoints}`;
    setTourStarted(true);
    Linking.openURL(url);
  };

  const endTour = () => {
    setTourStarted(false);
    alert("✅ Tournée terminée");
  };

  const renderPoint = ({ item }: { item: Point }) => (
    <View style={styles.card}>
      <Text style={styles.pointText}>
        {item.name} —{" "}
        <Text style={item.status === "collecté" ? styles.greenText : styles.redText}>
          {item.status}
        </Text>
      </Text>
      <TouchableOpacity
        style={[styles.smallButton, item.status === "collecté" && styles.buttonDone]}
        onPress={() => toggleStatus(item.id)}
      >
        <Text
          style={[styles.smallButtonText, item.status === "collecté" && styles.buttonTextDone]}
        >
          {item.status === "collecté" ? "✔️ Collecté" : "Collecter"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧭 Tournée de collecte</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.1642,
          longitude: 1.2314,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            pinColor={point.status === "collecté" ? "green" : "#E74C3C"}
          />
        ))}
      </MapView>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {collectedCount}/{points.length} collectés
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(collectedCount / points.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <FlatList
        data={points}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPoint}
        contentContainerStyle={styles.list}
      />

      <View style={styles.actions}>
        {!tourStarted ? (
          <TouchableOpacity
            style={[styles.button, styles.toggledButton, { borderColor: "#379F67" }]}
            onPress={startTour}
          >
            <Text style={[styles.buttonText, styles.toggledTextGreen]}>
              ▶️ Démarrer la tournée
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.toggledButton, { borderColor: "#379F67" }]}
            onPress={endTour}
          >
            <Text style={[styles.buttonText, styles.toggledTextGreen]}>
              🛑 Terminer
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 14,
    color: "#222",
  },
  map: {
    height: 260,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  progressContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#D0E8DA",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: 10,
    backgroundColor: "#379F67",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  pointText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  greenText: { color: "#379F67", fontWeight: "bold" },
  redText: { color: "#E74C3C", fontWeight: "bold" },
  smallButton: {
    backgroundColor: "#379F67",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttonDone: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#379F67",
  },
  smallButtonText: { color: "#fff", fontWeight: "bold" },
  buttonTextDone: { color: "#379F67" },
  actions: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  toggledButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  toggledTextGreen: {
    color: "#379F67",
  },
});

export default Tours;