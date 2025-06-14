import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

interface OptionButtonProps {
  iconLib: "Ionicons" | "FontAwesome5" | "MaterialCommunityIcons" | "Entypo";
  buttonTitle: string;
  iconName: string;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ iconLib, iconName, buttonTitle, onPress }) => {
  const renderIcon = (lib: string, name: string, color: string, size: number) => {
    switch (lib) {
      case "Ionicons":
        return <Ionicons name={name as any} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={name as any} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
      case "Entypo":
        return <Entypo name={name as any} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topSection}>
        <View style={styles.iconWrapper}>
          <View style={styles.iconContainer}>
            {renderIcon(iconLib, iconName, "#ffffff", 30)}
          </View>
          <View style={styles.dot}></View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
     height: 180,
    width: 160,
    backgroundColor: "#9DC0AB",
    borderRadius: 20, // Plus arrondi comme sur la maquette
    alignItems: 'center',
    justifyContent: 'space-evenly', // Mieux pour l'espacement vertical
    padding: 10,
    position: 'relative', // IMPORTANT: pour que le point soit bien positionné
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: "relative",
    marginTop: 40,
  },
  iconContainer: {
    height: 70,
    width: 70,
    backgroundColor: "#379F67",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Ombre pour Android
    elevation: 5,
  },
  dot: {
    position: "absolute",
    top: -35,
    right: -35,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#379F67",
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  textContainer: {

  },
  text: {
    fontFamily: "Arial",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: 15,
  },
});

export default OptionButton;
