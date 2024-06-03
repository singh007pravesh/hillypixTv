import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

const FlowerList = (props) => {
  // Sample data for flowers with publicly available image URLs
  const flowers = [
    { 
        id: 1, 
        name: 'Rose', 
        image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Roses are classic symbols of love and beauty, available in various colors and often associated with romance and passion.' 
    },
    { 
        id: 2, 
        name: 'Tulip', 
        image: 'https://source.unsplash.com/400x300/?tulip',
        description: 'Tulips are elegant flowers known for their vibrant colors and graceful petals, symbolizing perfect love and springtime.' 
    },
    { 
        id: 3, 
        name: 'Sunflower', 
        image: 'https://source.unsplash.com/400x300/?sunflower',
        description: 'Sunflowers are tall, bright flowers that follow the sun, representing adoration, loyalty, and longevity.' 
    },
    { 
        id: 4, 
        name: 'Daisy', 
        image: 'https://source.unsplash.com/400x300/?daisy',
        description: 'Daisies are cheerful flowers with delicate white petals surrounding a sunny yellow center, symbolizing innocence and purity.' 
    },
    { 
        id: 5, 
        name: 'Lily', 
        image: 'https://source.unsplash.com/400x300/?lily',
        description: 'Lilies are elegant and fragrant flowers, known for their graceful appearance and association with purity, renewal, and motherhood.' 
    },
    { 
        id: 6, 
        name: 'Orchid', 
        image: 'https://source.unsplash.com/400x300/?orchid',
        description: 'Orchids are exotic and sophisticated flowers, symbolizing love, luxury, beauty, and strength in various cultures.' 
    },
    { 
        id: 7, 
        name: 'Poppy', 
        image: 'https://source.unsplash.com/400x300/?poppy',
        description: 'Poppies are vibrant, wildflowers with bold colors and delicate petals, often representing remembrance, peace, and resilience.' 
    },
    { 
        id: 8, 
        name: 'Carnation', 
        image: 'https://source.unsplash.com/400x300/?carnation',
        description: 'Carnations are versatile flowers with ruffled petals, available in a wide range of colors and symbolizing love, admiration, and fascination.' 
    },
    { 
        id: 9, 
        name: 'Peony', 
        image: 'https://source.unsplash.com/400x300/?peony',
        description: 'Peonies are luxurious and fragrant flowers, known for their lush blooms and association with romance, prosperity, and good fortune.' 
    },
    { 
        id: 10, 
        name: 'Hydrangea', 
        image: 'https://source.unsplash.com/400x300/?hydrangea',
        description: 'Hydrangeas are stunning flowers with large, colorful clusters of blooms, symbolizing gratitude, understanding, and heartfelt emotions.' 
    }
    // Add more flower data as needed
];



  // Render item function for the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>{
      props.navigation.navigate('flowerDetails',{flower:item})
    }}>
       <Animated.Image
        sharedTransitionTag={`image-${item.id}`}
        style={styles.image}
        source={{ uri: item.image }}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator = {false}
        data={flowers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Render 2 columns
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
    flexDirection: 'column',
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
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
