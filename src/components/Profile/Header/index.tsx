import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import ButtonStyle from "../../../ui/ButtonStyle";

interface Props {
  user: any;
}

const ProfileHeader = ({ user }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.providerData[0]?.photoURL }}
        style={styles.image}
      />
      <Text style={styles.text}>
        @{user?.providerData[0]?.email.replace(/(@.*)/gi, "")}
      </Text>
      <View style={styles.couterContainer}>
        <View style={styles.couterItemContainer}>
          <Text style={styles.couterTextLeft}>0</Text>
          <Text style={styles.couterTextRight}>Following</Text>
        </View>
        <View style={styles.couterItemContainer}>
          <Text style={styles.couterTextLeft}>0</Text>
          <Text style={styles.couterTextRight}>Followers</Text>
        </View>
        <View style={styles.couterItemContainer}>
          <Text style={styles.couterTextLeft}>0</Text>
          <Text style={styles.couterTextRight}>Likes</Text>
        </View>
      </View>
      <View style={styles.button}>
        <ButtonStyle
          bgColor="#fff"
          textColor="black"
          label={"Edit Profile"}
          onPress={() => {navigation.navigate("EditProfile" as never)}}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
    borderBottomWidth: 0.6,
    borderColor: "lightgray",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },
  couterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 25,
    marginRight: 20,
  },
  couterItemContainer: {
    alignItems: "center",
    marginHorizontal: 30,
  },
  couterTextLeft: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  couterTextRight: {
    fontSize: 11,
    color: "grey",
    textAlign: "center",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
