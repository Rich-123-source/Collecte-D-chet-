import OptionButton from '@/components/OptionButton';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Profile from './Profile';
 
interface HomeScreenProps{
  onNavigate:(screenKey: string) => void
}

const Home: React.FC = ({onNavigate}:HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l’écran d’accueil !</Text>
      <OptionButton iconLib='Entypo' iconName='home' onPress={()=>onNavigate("home")}/>
      <OptionButton iconLib='FontAwesome5' iconName='map-marked-alt' onPress={()=>onNavigate("map")}/>
      <OptionButton iconLib='FontAwesome5' iconName='truck' onPress={()=>onNavigate("home")}/>
      <OptionButton iconLib='FontAwesome5' iconName='chart-line' onPress={()=>onNavigate("home")}/>
      <OptionButton iconLib='Ionicons' iconName='person-outline' onPress={()=>onNavigate("home")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
