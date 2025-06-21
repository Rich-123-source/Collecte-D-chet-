import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const Tours = () => {
  const [activeTour, setActiveTour] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState([]);
  const [tours, setTours] = useState([
    { id: "1", name: "Epicerie Bernard", status: "Pas collecté", latitude: 6.1700, longitude: 1.2300 },
    { id: "2", name: "Marché Central", status: "Pas collecté", latitude: 6.1720, longitude: 1.2320 },
    { id: "3", name: "Quartier Résidentiel", status: "Pas collecté", latitude: 6.1740, longitude: 1.2340 },
    { id: "4", name: "Zone Industrielle", status: "Pas collecté", latitude: 6.1760, longitude: 1.2360 },
  ]);

  const startTour = () => {
    setActiveTour(true);
    setVisitedLocations(tours.map(t => ({ latitude: t.latitude, longitude: t.longitude })));
  };

  const toggleCollectStatus = (id) => {
    setTours(prevTours =>
      prevTours.map(t =>
        t.id === id ? { ...t, status: t.status === "Collecté" ? "Pas collecté" : "Collecté" } : t
      )
    );
    const newTour = tours.find(t => t.id === id);
    if (newTour?.status === "Collecté") {
      setVisitedLocations(prev => [...prev, { latitude: newTour.latitude, longitude: newTour.longitude }]);
    }
  };

  const collectedCount = tours.filter(t => t.status === "Collecté").length;

  return (
    <View style={styles.container}>
      {/* Suivi de progression */}
      <Text style={styles.title}> Suivi de tournée</Text>
      <Text style={styles.progress}>Progression : {collectedCount}/{tours.length} POINTS</Text>

      {/* Liste des points */}
      <FlatList
        data={tours}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tourItem} onPress={() => toggleCollectStatus(item.id)}>
            <Text style={styles.tourName}>{item.name}</Text>
            <Text style={item.status === "Collecté" ? styles.collectedStatus : styles.notCollectedStatus}>
              {item.status === "Collecté" ? "✓" : "!"} {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Carte affichant les trajets */}
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 6.1700, longitude: 1.2300, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
      >
        {tours.map((tour) => (
          <Marker key={tour.id} coordinate={{ latitude: tour.latitude, longitude: tour.longitude }} />
        ))}
        {activeTour && (
          <Polyline coordinates={visitedLocations} strokeWidth={4} strokeColor="#379F67" />
        )}
      </MapView>

      {/* Boutons d’action */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, activeTour && styles.activeButton]} onPress={startTour}>
          <Text style={[styles.buttonText, activeTour && styles.activeButtonText]}>Débuter tournée</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, collectedCount === tours.length && styles.activeButton]}>
          <Text style={[styles.buttonText, collectedCount === tours.length && styles.activeButtonText]}>Terminer tournée</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  progress: { fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#666", marginBottom: 10 },
  tourItem: { flexDirection: "row", justifyContent: "space-between", padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  tourName: { fontSize: 18, fontWeight: "bold" },
  collectedStatus: { fontSize: 16, color: "green", fontWeight: "bold" },
  notCollectedStatus: { fontSize: 16, color: "red", fontWeight: "bold" },
  map: { height: 350, marginTop: 10, borderRadius: 10 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginHorizontal: 5, alignItems: "center", borderWidth: 2, borderColor: "#379F67" },
  activeButton: { backgroundColor: "#379F67" },
  buttonText: { color: "#379F67", fontWeight: "bold", fontSize: 16 },
  activeButtonText: { color: "#fff" },
});

export default Tours;