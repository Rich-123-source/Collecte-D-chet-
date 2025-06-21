import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const markers = [
    { id: 1, latitude: 6.1642, longitude: 1.2314, image: require("../../assets/images/poubelle1.jpg"), address: "Adidogomé, Rue Palace", type: "urgent" },
    { id: 2, latitude: 6.1650, longitude: 1.2320, image: require("../../assets/images/poubelle2.jpg"), address: "Tokoin, Marché central", type: "non-collecté" },
  ];

  const filteredMarkers = markers.filter(marker => filter === "all" || marker.type === filter);

  return (
    <View style={styles.container}>
      {/* Carte plein écran */}
      <MapView
        style={styles.map}
        initialRegion={{ latitude: 6.1642, longitude: 1.2314, latitudeDelta: 0.015, longitudeDelta: 0.015 }}
      >
        {filteredMarkers.map(marker => (
          <Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
            <Callout>
              <View style={styles.callout}>
                <Image source={marker.image} style={styles.image} />
                <Text style={styles.calloutAddress}>{marker.address}</Text>
                <TouchableOpacity style={styles.seeMore}>
                  <Text style={styles.seeMoreText}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Options flottantes */}
      <View style={styles.overlay}>
        <TextInput
          placeholder="Rechercher un signalement..."
          style={styles.searchBar}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("urgent")}>
            <Icon name="exclamation-circle" size={20} color="#fff" />
            <Text style={styles.filterText}>Urgent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("non-collecté")}>
            <Icon name="trash" size={20} color="#fff" />
            <Text style={styles.filterText}>Non collectés</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilter("all")}>
            <Icon name="list" size={20} color="#fff" />
            <Text style={styles.filterText}>Tous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }, // La carte prend toute la hauteur dispo
  overlay: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  searchBar: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#fff" },
  filters: { flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 10 },
  filterButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#379F67", padding: 10, borderRadius: 8, gap: 6 },
  filterText: { color: "#fff", fontWeight: "bold" },
  callout: { width: 200, padding: 8 },
  image: { width: "100%", height: 90, borderRadius: 8, marginBottom: 6 },
  calloutAddress: { fontWeight: "bold", marginBottom: 6 },
  seeMore: { alignSelf: "flex-start", backgroundColor: "#379F67", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  seeMoreText: { color: "#fff", fontWeight: "bold" },
});

export default MapScreen;