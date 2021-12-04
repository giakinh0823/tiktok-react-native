import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  bgColor: string;
  textColor: string;
  icon?: any;
  fontSize?: any,
  label: string;
  onPress: () => void;
}

const ButtonStyle = ({ onPress, bgColor, textColor, icon, label, fontSize }: Props) => {
  const styles = CustomStyles(bgColor, textColor, icon, fontSize);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
        {icon && icon}
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
  );
};

export default ButtonStyle;

const CustomStyles = (bgColor: string, textColor: string, icon?: any, fontSize?: any) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      borderColor: "lightgrey",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 8,
      justifyContent: "center",
    },
    buttonRight: {
      backgroundColor: bgColor,
    },
    buttonText: {
      fontSize: fontSize ? fontSize :  12,
      marginLeft: icon ? 10 : 0 ,
      color: textColor,
    },
  });
