import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Safeview } from "../../../components/common";
import NavbarGeneral from "../../../components/General/Navbar/index";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { authActions, selectAuthUser } from '../../Auth/authSlice';
import { useIsFocused } from "@react-navigation/native";

interface Props {}

const EditProfile = (props: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser)
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(authActions.getUser())
  }, [dispatch, isFocused])

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if(!result.cancelled){
      dispatch(authActions.changeImage(result.uri));
    }
  }

  return (
    <Safeview>
      <View style={styles.container}>
        <NavbarGeneral title={"Gia Kinh"} />
        <View style={styles.imageViewContentainer}>
          <TouchableOpacity style={styles.imageViewContent} activeOpacity={0.8} onPress={() => chooseImage()}>
            <Image
              style={styles.image}
              source={{
                uri: user?.user?.providerData[0]?.photoURL,
              }}
            />
            <View style={styles.imageOverlay}/>
            <Feather
              name="camera"
              size={24}
              color="white"
              style={styles.camera}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Safeview>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  imageViewContentainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContent: {
    backgroundColor: "#fff",
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    
  },
});
