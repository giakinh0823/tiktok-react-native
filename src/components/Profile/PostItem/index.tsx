import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  post: any;
}

const PostItemProfile = ({ post }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: post && post?.media[1] }} style={styles.image} />
    </View>
  );
};

export default PostItemProfile;

const styles = StyleSheet.create({
  container: {
    width: (1/3) * 100 + "%",
    height: 200,
    borderWidth: 1,
    borderColor: "white",
  },
  comments: {
    color: "#000",
  },
  image: {
    width:"100%",
    height: "100%",
  },
});
