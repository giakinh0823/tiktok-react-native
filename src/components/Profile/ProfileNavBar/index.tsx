import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

interface Props {
  user: any;
}

const ProfileNavBar = ({ user }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Discover" as never)}>
        <Feather name="search" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.label}>{user?.providerData[0].displayName}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  label: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
