import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator, Image,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity, View
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Safeview } from "../../components/common";
import { selectAuthUser } from "../Auth/authSlice";
import { postActions, selectPostLoading } from "./postSlice";

interface Props {
  route: any;
}

const SavePostScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const source = route.params.source;
  const sourceThumb = route.params.sourceThumb;
  const [description, setDescription] = React.useState("");
  const loading = useAppSelector(selectPostLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const handleSavePost = () => {
    if (user){
      dispatch(postActions.savePost({ source: source, sourceThumb: sourceThumb,description: description, userId: user?.user?.uid }));
    }
  };

  if (loading) {
    return <Safeview>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator  size="large" color="red" />
      </View>
    </Safeview>;
  }

  return (
    <Safeview>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            multiline
            style={styles.textInput}
            maxLength={150}
            placeholder="Describe your videos"
            onChangeText={(text) => setDescription(text)}
          />
          <Image style={styles.mediaPreview} source={{ uri: source }} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button]}
          >
            <Feather name="x" size={24} color="black" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={[styles.button, styles.buttonRight]}
          >
            <Feather name="corner-left-up" size={20} color="white" />
            <Text style={[styles.buttonText, styles.buttonTextRight]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Safeview>
  );
};

export default SavePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  textInput: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    backgroundColor: "#000",
    width: 60,
    height: 90,
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    borderColor: "lightgrey",
    flexDirection: "row",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  buttonRight: {
    backgroundColor: "#ff4040",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
  },
  buttonTextRight: {
    color: "#fff",
  },
});
