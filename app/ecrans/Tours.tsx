import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tours: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l’écran  tours</Text>
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

export default Tours;
