import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Safeview } from "../../components/common";
import SearchItemUser from "../../components/Search/SearchItem/index";
import { searchActions, selectSearchListUser } from "./searchSlice";

interface Props {}

const SearchScreen = (props: Props) => {
  const [text, setText] = React.useState("");
  const listUser = useAppSelector(selectSearchListUser);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(searchActions.getListUser({field: "displayName", value: ""}));
  }, [isFocused])

  const onChangeText = (text: string) => {
    setText(text);
    dispatch(searchActions.getListUser({field: "displayName", value: text}));
  };

  return (
    <Safeview>
      <View style={styles.container}>
        <TextInput
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholder="Search"
        />
        <View style={styles.listContainer}>
          <FlatList
            data={listUser}
            renderItem={({ item }) => <SearchItemUser user={item?.user} />}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Safeview>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    borderColor: "lightgray",
    borderWidth: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
