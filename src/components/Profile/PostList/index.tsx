import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PostItemProfile from "../PostItem";

interface Props {
  posts: any;
}

const PostListProfile = ({ posts }: Props) => {
  return (
    <View style={styles.container}>
      {posts.map((post: any) => (
        <PostItemProfile key={post.id} post={post} />
      ))}
    </View>
  );
};

export default PostListProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "#fff",
  },
});
