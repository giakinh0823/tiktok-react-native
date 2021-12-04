import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Safeview } from "../../components/common";
import ProfileHeader from "../../components/Profile/Header";
import ProfileNavBar from "../../components/Profile/ProfileNavBar";
import { authActions, selectAuthUser } from "../Auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postActions, selectPostList } from "../SavePost/postSlice";
import PostListProfile from "../../components/Profile/PostList/index";
import { useIsFocused } from "@react-navigation/native";

interface Props {}

const ProfileScreen = (props: Props) => {
  // AsyncStorage.clear();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const posts = useAppSelector(selectPostList);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(postActions.getPosts());
  }, [dispatch, isFocused]);

  return (
    <ScrollView  nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <ProfileNavBar user={user?.user} />
        <ProfileHeader user={user?.user} />
        <PostListProfile posts={posts} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
});
