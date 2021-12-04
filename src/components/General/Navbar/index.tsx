import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

interface Props {
    leftButton?:boolean;
    title?: string; 
}

const NavbarGeneral = ({leftButton = false, title}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Feather name="arrow-left" size={24} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Feather name="arrow-left" size={24} style={styles.icon} color={leftButton ? 'black': 'white'}/>
      </TouchableOpacity>
    </View>
  );
};

export default NavbarGeneral;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {},
});
