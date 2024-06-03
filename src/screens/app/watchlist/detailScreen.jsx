import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const FlowerDetailsScreen = (props) => {
  // Rose flower details
  console.log('==========', props.route.params)

  const flower = props.route.params.flower;

  return (
    <View style={styles.container}>
      <Animated.Image source={{ uri: flower.image }} style={styles.image} sharedTransitionTag={`image${flower.id}`}/>
      <Text style={styles.name}>{flower.name}</Text>
      <Text style={styles.details}>{flower.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '20%',
    backgroundColor: 'gainsboro',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FlowerDetailsScreen;
