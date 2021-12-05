import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostSignle from "../../components/Feed/Post";
import { feedActions, selectFeedList } from "./feedSlice";

interface Props {}

const FeedScreen = (props: Props) => {
  const mediaRefs = useRef<any>([]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFeedList);
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(feedActions.getPostsFeed());
  },[dispatch,isFocused])

  const onViewableItemsChanged = useRef(({ changed }: any) => {
    changed.forEach((element: any) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <PostSignle
          post={item}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        decelerationRate={"normal"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    flex: 1,
  },
  item: {
    height: Dimensions.get("window").height - 21.8,
    flex: 1,
    width: "100%",
  },
});
