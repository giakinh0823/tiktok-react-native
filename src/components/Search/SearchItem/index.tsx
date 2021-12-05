import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

interface Props {
  user: any;
}

const SearchItemUser = ({ user }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{user?.providerData[0]?.displayName}</Text>
        <Image
          source={{ uri: user?.providerData[0]?.photoURL }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchItemUser;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
