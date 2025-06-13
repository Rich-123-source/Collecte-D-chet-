import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

const Profile: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de profil</Text>

      <View style={styles.avatarPlaceholder} />

      <Text style={styles.name}>Bernard TOFA</Text>
      <Text style={styles.code}>AG -1256</Text>

      <Text style={styles.sectionTitle}>Informations personnelles</Text>
      <InfoRow icon="id-badge" label="Poste" value="Agent de collecte" />
      <InfoRow icon="map-marker-alt" label="Zone assignée" value="Lomé Est" />
      <InfoRow icon="calendar" label="Date d’embauche" value="12 Mars 2023" />
      <InfoRow icon="truck" label="Tournées effectuées" value="45" />
      <InfoRow icon="chart-bar" label="Moyenne des points collectés" value="12 par tournée" />

      <Text style={styles.sectionTitle}>Préférences</Text>
      <ToggleRow label="Notifications" value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      <InfoRow icon="language" label="Langues" value="Français" />
      <ToggleRow label="Mode sombre" value={darkModeEnabled} onValueChange={setDarkModeEnabled} />

      <Text style={styles.sectionTitle}>Actions</Text>
      <ActionRow icon="file-document-outline" label="Mes rapports" />
      <ActionRow icon="lock-reset" label="Changer mon mot de passe" />
    </View>
  );
};

const InfoRow = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <FontAwesome5 name={icon} size={16} color="#1c9e61" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ToggleRow = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (val: boolean) => void }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} thumbColor="#fff" trackColor={{ true: '#1c9e61', false: '#ccc' }} />
  </View>
);

const ActionRow = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.actionRow}>
    <MaterialIcons name={icon} size={20} color="#1c9e61" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  avatarPlaceholder: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#1c9e61',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  code: {
    fontSize: 14,
    color: '#888',
    alignSelf: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 5,
    color: '#444',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  icon: {
    marginRight: 8,
    width: 20,
  },
  label: {
    flex: 1,
    color: '#333',
  },
  value: {
    color: '#777',
    fontStyle: 'italic',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
});

export default Profile;