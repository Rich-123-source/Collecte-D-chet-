import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Stack>{children}</Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});

export default Layout;