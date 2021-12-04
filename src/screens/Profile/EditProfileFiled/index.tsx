import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Safeview } from "../../../components/common";
import NavbarGeneral from "../../../components/General/Navbar";
import { Divider } from "react-native-paper";

interface Props {
  route: any;
}

const EditProfileField = ({ route }: Props) => {
  const { title, field, value } = route.params;
  const onSave = () => {};
  return (
    <Safeview>
      <View style={styles.container}>
        <NavbarGeneral
          title={title}
          leftButton={{ display: true, name: "save", action: onSave }}
        />
        <Divider />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{title}</Text>
          <TextInput style={styles.textInput}/>
        </View>
      </View>
    </Safeview>
  );
};

export default EditProfileField;

const styles = StyleSheet.create({
  container: { 
      flex: 1,
      backgroundColor: "#fff",
  },
  mainContainer: {
      padding: 20,
      color: "gray",
  },
  title: {
      fontWeight: "bold",
  },
  textInput: {
      borderColor: "lightgray",
      borderBottomWidth: 1,
      borderStyle: "solid",
      paddingVertical: 6,
  },
});
