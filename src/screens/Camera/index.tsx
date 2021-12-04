import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Safeview } from "../../components/common";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import * as VideoThumbnails from "expo-video-thumbnails";

interface Props {}

const CameraScreen = (props: Props) => {
  const [camera, setCamera] = useState(false); // camera
  const [audio, setAudio] = useState(false); // audio
  const [gallery, setGallery] = useState(false); // thư viên ảnh
  const [galaryList, setGalaryList] = useState<any[]>([]); // danh sách ảnh

  const [cameraRef, setCameraRef] = useState<any>(null);
  const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState<any>(
    Camera.Constants.FlashMode.off
  );
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraState = await Camera.requestCameraPermissionsAsync(); // xin phép cấp quyền truy cập camera permission
      setCamera(cameraState.status === "granted"); // check camera có được cấp quyền truy cập không
      const audioState = await Audio.requestPermissionsAsync(); // xin phép cấp quyền truy cập audio permission
      setAudio(audioState.status === "granted"); // check audio có được cấp quyền truy cập không
      const galleryState =
        await ImagePicker.requestMediaLibraryPermissionsAsync(); // xin phép cấp quyền truy cập thư viện ảnh permission
      setGallery(galleryState.status === "granted"); // check thư viện ảnh có được cấp quyền truy cập không

      if (galleryState.status === "granted") {
        const userGalaryMedia: any = await MediaLibrary.getAssetsAsync({
          sortBy: MediaLibrary.SortBy.creationTime,
          mediaType: MediaLibrary.MediaType.video,
        });
        setGalaryList(userGalaryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quantity: Camera.Constants.VideoQuality["720"],
        };
        const video = await cameraRef.recordAsync(options);
        if (video) {
          const data = await video;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate(
            "SavePost" as never,
            {
              source: source as String,
              sourceThumb: sourceThumb,
            } as never
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      try {
        await cameraRef.stopRecording();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickFromGallery = async () => {
    if (gallery) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 9],
          quantity: 1,
        });
        if (!result.cancelled) {
          let sourceThumb = await generateThumbnail(result.uri);
          navigation.navigate(
            "SavePost" as never,
            {
              source: result.uri as String,
              sourceThumb: sourceThumb,
            } as never
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const generateThumbnail = async (source: any) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 1000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  if (!camera || !audio || !gallery) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View style={[styles.sidebarContainer]}>
        <TouchableOpacity
          style={[styles.buttonSideBar]}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name="refresh-ccw" size={20} color="white" />
          <Text style={[styles.refresh]}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonSideBar]}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name="zap" size={20} color="white" />
          <Text style={[styles.refresh]}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.galleyButton}
            onPress={() => pickFromGallery()}
          >
            {galaryList[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galaryList[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bottomButtonContainer: {
    flex: 1,
    marginHorizontal: 70,
  },
  recordButton: {
    borderWidth: 8,
    borderColor: "#ff404087",
    backgroundColor: "#ff4040",
    borderRadius: 100,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  galleyButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: 50,
    height: 50,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  sidebarContainer: {
    top: 40,
    right: 0,
    marginHorizontal: 20,
    position: "absolute",
  },
  buttonSideBar: {
    alignItems: "center",
    marginBottom: 25,
  },
  refresh: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});
