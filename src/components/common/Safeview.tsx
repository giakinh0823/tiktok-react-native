import React from "react";
import { StyleSheet, Platform, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: any;
}

export const Safeview = ({ children }: Props) => {
  return (
    <>
      {Platform.OS == "ios" && (
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      )}
      {Platform.OS == "android" && (
        <View
          style={[styles.container, { paddingTop: 35 }]}
        >
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
  },
});
