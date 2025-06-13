import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Map: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l’écran de map !</Text>
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

export default Map;
