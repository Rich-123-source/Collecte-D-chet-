import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Stats: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l’écran stats !</Text>
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

export default Stats;
