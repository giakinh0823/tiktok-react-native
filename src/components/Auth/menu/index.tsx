import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface Props {
  authPage: number;
  setAuthPage: React.Dispatch<React.SetStateAction<0 | 1>>;
  setDetailsPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthMenu = ({ authPage, setAuthPage, setDetailsPage }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>
          {authPage === 0 ? "Sign in" : "Sign up"}
        </Text>
        <TouchableOpacity style={styles.providerButton} onPress={() => setDetailsPage(true)}>
          <Feather name="user" size={20} />
          <Text style={styles.buttonText}>Use Email</Text>
          <View />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.containerBottom}
        onPress={() => (authPage === 0 ? setAuthPage(1) : setAuthPage(0))}
      >
        {authPage === 0 ? (
          <Text>
            Don't have an account? <Text style={styles.sigin}>Sign up</Text>
          </Text>
        ) : (
          <Text>
            Already have an account <Text style={styles.sigin}>Sign in</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AuthMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    padding: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  providerButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
  },
  buttonText: {
    fontSize: 14,
    marginRight: 10,
  },
  containerBottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  sigin: {
    color: "#EA4359",
    fontWeight: "bold",
  },
});
