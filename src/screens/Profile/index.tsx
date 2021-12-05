import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProfileHeader from "../../components/Profile/Header";
import PostListProfile from "../../components/Profile/PostList/index";
import ProfileNavBar from "../../components/Profile/ProfileNavBar";
import { selectAuthUser } from "../Auth/authSlice";
import { postActions, selectPostList } from "../SavePost/postSlice";

interface Props {}

const ProfileScreen = (props: Props) => {
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

export default React.memo(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
});
