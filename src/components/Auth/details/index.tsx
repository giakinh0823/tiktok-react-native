import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectAuthUser } from "../../../screens/Auth/authSlice";

interface Props {
  authPage: Number;
  setDetailsPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthDetail = ({ authPage, setDetailsPage }: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (Boolean(user?.uid)) {
      navigation.navigate("feed" as never);
    }
  }, [dispatch, user]);


  const handleLogin = () => {
    dispatch(authActions.login({ email, password }));
  };

  const handleRegister = () => {
    dispatch(authActions.register({ email, password }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => (authPage === 0 ? handleLogin() : handleRegister())}
        >
          <Text style={styles.textButton}>
            {authPage === 0 ? "Sign in" : "Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  textInput: {
    borderColor: "lightgray",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
  },
  button: {
    borderColor: "lightgray",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#EA4359",
    marginTop: 20,
  },
  textButton: {
    color: "white",
  },
});
