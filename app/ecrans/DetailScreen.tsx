import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";

type MarkerData = {
  image: any;
  address: string;
  type: "urgent" | "non-collecté";
  latitude: number;
  longitude: number;
};

type DetailScreenProps = {
  marker: MarkerData | null;
  onBack?: () => void;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ marker, onBack }) => {
  const [collected, setCollected] = useState(false);

  if (!marker) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aucun signalement sélectionné</Text>
      </View>
    );
  }

  const openInGoogleMaps = () => {
    const { latitude, longitude } = marker;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Retour à la carte</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Détail du signalement</Text>
      </View>

      <Image source={marker.image} style={styles.image} />

      <View style={styles.infoRow}>
        <Icon name="map-marker-alt" size={18} color="#444" style={styles.icon} />
        <Text style={styles.label}>{marker.address}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="exclamation-triangle" size={18} color="#444" style={styles.icon} />
        <Text style={[styles.label, marker.type === "urgent" ? styles.urgent : styles.nonCollecte]}>
          {marker.type === "urgent" ? "Urgent" : "Non collecté"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="calendar-alt" size={18} color="#444" style={styles.icon} />
        <Text style={styles.label}>21 juin 2025</Text>
      </View>

      <Text style={styles.sectionTitle}>🗺️ Localisation :</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} />
      </MapView>

      <TouchableOpacity
        style={[styles.button, collected && styles.buttonToggled]}
        onPress={() => setCollected(!collected)}
      >
        <Text style={[styles.buttonText, collected && styles.buttonTextToggled]}>
          ✅ Marquer comme collecté
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#379F67", marginTop: 12 }]}
        onPress={openInGoogleMaps}
      >
        <Text style={styles.buttonText}>🧭 Itinéraire Google Maps</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#333", marginVertical: 20 },
  header: { marginBottom: 20 },
  backText: { color: "#3498DB", fontSize: 16, marginBottom: 6 },
  headerText: { color: "#222", fontSize: 20, fontWeight: "bold", textAlign: "center" },
  image: { width: "100%", height: 220, borderRadius: 10, marginBottom: 20 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  icon: { marginRight: 8 },
  label: { fontSize: 16, color: "#333", fontWeight: "600" },
  urgent: { color: "#E74C3C" },
  nonCollecte: { color: "#F39C12" },
  sectionTitle: { marginTop: 24, fontWeight: "bold", fontSize: 16, color: "#444", marginBottom: 6 },
  map: { width: "100%", height: 160, borderRadius: 12, marginBottom: 20 },
  button: { backgroundColor: "#379F67", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonToggled: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#379F67" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  buttonTextToggled: { color: "#379F67" },
});

export default DetailScreen;