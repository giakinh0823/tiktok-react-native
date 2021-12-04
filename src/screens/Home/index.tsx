import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeNavigation from "../../navigation/home";
import { Safeview } from '../../components/common/Safeview';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

const HomeScreen = (props: Props) => {
  // AsyncStorage.clear();
  return (
    <Safeview>
      <HomeNavigation />
    </Safeview>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
