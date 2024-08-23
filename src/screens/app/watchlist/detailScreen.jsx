import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const FlowerDetailsScreen = ({ route }) => {
  const { flower } = route.params;

  return (
    <View style={styles.container}>
      <SharedElement id={`image`}>
        <Image source={{ uri: flower.image }} style={styles.image} />
      </SharedElement>
      <Text style={styles.name}>{flower.name}</Text>
      <Text style={styles.details}>{flower.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default FlowerDetailsScreen;
