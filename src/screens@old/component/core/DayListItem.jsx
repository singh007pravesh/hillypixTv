import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";



const DayListItem = ({ dayItem }) => {
  const navigation = useNavigation();
  
  const navigateSpecify = () =>{
    if(dayItem == 1){
      navigation.navigate('videoDownloader');
    }
    if(dayItem == 2){
      navigation.navigate('testVideo');
    }
    if(dayItem == 3){
      navigation.navigate('mycomponent');
    }
  }
  return (
   <>
      <TouchableOpacity style={styles.card} onPress={()=>{
        navigateSpecify();
      }}>
        <Text style={styles.text}> {dayItem}</Text>
      </TouchableOpacity>
    </>
  );
};

export default DayListItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#F9EDE3",
    borderColor: "#9b4521",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  text: {
    color: "#9b4521",
    fontSize: 75,
    fontFamily: "Amatic",
  },
});
