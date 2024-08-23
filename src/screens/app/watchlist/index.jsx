import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

const FlowerList = () => {
  const navigation = useNavigation();

  const flowers = [
    { 
        id: 1, 
        name: 'Rose', 
        image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Roses are classic symbols of love and beauty, available in various colors and often associated with romance and passion.' 
    },
    // ... more flowers
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('flowerDetails', { flower: item })}>
      <SharedElement id={`image`}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </SharedElement>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flowers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFDAB9',
  },
  item: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlowerList;