//  primary: string;
//     background: string;
//     card: string;
//     text: string;
//     border: string;
//     notification: string;

import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const VideoDetail = () => {
  const { colors } = useTheme();
  const scheme = useTheme();
  // console.log(scheme);
  return (
    <TouchableOpacity
      style={{ backgroundColor: colors.card }}
      onPress={() => {
        Alert.alert("Waring message", "you are using your app in dard mode");
      }}
    >
      <Text style={{ color: colors.text }}>Button!</Text>
    </TouchableOpacity>
  );
};

export default VideoDetail;

const styles = StyleSheet.create({});
