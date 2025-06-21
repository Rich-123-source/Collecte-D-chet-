import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome5";

const StatsScreen = () => {
  const [satisfaction, setSatisfaction] = useState(1);
  const satisfactionAnim = useRef(new Animated.Value(satisfaction)).current;
  const [note, setNote] = useState("");
  const [comment, setComment] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleSliderChange = (value: number) => {
    Animated.timing(satisfactionAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSatisfaction(value);
  };

  const handleReportSubmit = () => {
    if (!note || !comment) {
      alert("Merci de remplir tous les champs !");
      return;
    }
    setReportGenerated(true);
  };

  const pastTours = [
    { date: "14 juin", distance: "17,5 km", duration: "1h 5 min" },
    { date: "13 juin", distance: "19 km", duration: "1h 20 min" },
    { date: "12 juin", distance: "18,8 km", duration: "1h 15 min" },
  ];

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Statistiques quotidiennes</Text>

      {/* Signalements */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Icon name="exclamation-triangle" size={20} color="#E74C3C" />
          <Text style={styles.label}>24 Signalements aujourd’hui</Text>
        </View>
      </View>

      {/* Distance et durée */}
      <View style={styles.section}>
        <Text style={styles.value}>18,2 km</Text>
        <Text style={styles.label}>Distance totale parcourue</Text>
        <Text style={styles.value}>1 h 10 min</Text>
        <Text style={styles.label}>Durée de tournée</Text>
      </View>

      {/* Temps restant */}
      <View style={styles.section}>
        <Text style={styles.value}>1 h</Text>
        <Text style={styles.label}>Temps estimé restant</Text>
      </View>

      {/* Historique des tournées */}
      <View style={styles.historyContainer}>
        <View style={styles.row}>
          <Icon name="history" size={20} color="#379F67" />
          <Text style={styles.historyTitle}>Historique des tournées</Text>
        </View>
        {pastTours.map((tour, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyDate}>{tour.date}</Text>
            <Text style={styles.historyText}>{tour.distance} • {tour.duration}</Text>
          </View>
        ))}
      </View>

      {/* Évaluation tournée */}
      <View style={styles.section}>
        <Text style={styles.label}>Comment s’est passée votre tournée ?</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={2}
          step={1}
          value={satisfaction}
          onValueChange={handleSliderChange}
        />
        <Animated.Text style={[styles.sliderText, { opacity: satisfactionAnim }]}>
          {satisfaction === 0 ? "Faible" : satisfaction === 1 ? "Modéré" : "Élevé"}
        </Animated.Text>
      </View>

      {/* Formulaire de rapport journalier */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>📝 Générer un rapport journalier</Text>
        <TextInput
          style={styles.input}
          placeholder="Donnez une note (1 à 5)"
          keyboardType="numeric"
          maxLength={1}
          value={note}
          onChangeText={setNote}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ajoutez un commentaire..."
          multiline
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleReportSubmit}>
          <Text style={styles.submitText}>Envoyer le rapport </Text>
        </TouchableOpacity>
      </View>

      {/* Rapport journalier affiché après soumission */}
      {reportGenerated && (
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>
            <Icon name="calendar-alt" size={20} color="#379F67" /> Rapport du {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.reportText}>
            <Icon name="truck" size={20} color="#FFA500" /> Tournée : 18,2 km en 1h10 min
          </Text>
          <Text style={styles.reportText}>
            <Icon name="trash" size={20} color="#E74C3C" /> Signalements traités : 24
          </Text>
          <Text style={styles.reportText}>
            <Icon name="star" size={20} color="#FFD700" /> Évaluation : {satisfaction === 0 ? "Faible" : satisfaction === 1 ? "Modéré" : "Élevé"}
          </Text>
          <Text style={styles.reportText}>
            <Icon name="comment" size={20} color="#3498DB" /> Commentaire : "{comment}"
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  content: { paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  section: { backgroundColor: "#fff", padding: 10, borderRadius: 8, elevation: 3, marginVertical: 6 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { fontSize: 14 },
  value: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5 },
  historyContainer: { backgroundColor: "#fff", padding: 10, borderRadius: 8, elevation: 2, marginVertical: 6 },
  historyTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  historyItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  historyDate: { fontWeight: "bold", color: "#379F67" },
  historyText: { color: "#333" },
  slider: { width: "100%", height: 40 },
  sliderText: { textAlign: "center", marginTop: 6, fontSize: 16 },
  formContainer: { backgroundColor: "#E6F9EE", padding: 10, borderRadius: 8, elevation: 3, marginTop: 8 },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, height: 38, marginBottom: 6 },
  textArea: { height: 70 },
  submitButton: { backgroundColor: "#379F67", padding: 10, borderRadius: 6, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "bold" },
  reportContainer: { backgroundColor: "#fff", padding: 12, borderRadius: 8, elevation: 3, marginTop: 12 },
  reportTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  reportText: { fontSize: 16, marginBottom: 4, color: "#333" },
});

export default StatsScreen;
