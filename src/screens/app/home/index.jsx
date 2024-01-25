import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React,{useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';

const Home = props => {
  const videoDetails = [
    {
      name: 'Nagaland Special : North-East Album ',
      videoUrl:
        'https://hillypix-media-bucket.s3.ap-south-1.amazonaws.com/movie-trailer/wangangdaba.mp4',
      imageUrl:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/11/dunki-teaser-1-1698904247.jpg',
    },
    {
      name: 'Pahle bhi mai : Animal',
      videoUrl: 'https://hdvideo9.com/files/download/type/mp4/id/9680',
      imageUrl:
        'https://wallpaperbuzz.net/wp-content/uploads/2023/11/Animal-HD-WAllpaper-5.jpg',
    },
    {
      name: 'Sari duniya jala denge : Animal',
      videoUrl: 'https://hdvideo9.com/files/download/type/mp4/id/9681',
      imageUrl:
        'https://stat5.bollywoodhungama.in/wp-content/uploads/2019/09/Animal-4.jpg',
    },
    {
      name: 'Chal we watna : Dunki',
      videoUrl: 'https://hdvideo9.com/files/download/type/mp4/id/9684',
      imageUrl:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/10/dunki-1-1697892091.jpg',
    },
    {
      name: 'Ishq Jaisa Kuch : Fighter',
      videoUrl: 'https://hdvideo9.com/files/download/type/HD_720p/id/9682',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZjkwN2Q5Y2QtMmE2MC00NzlkLTg2NzQtYjVjYjVmNjE2ZTNiXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg',
    },
    {
      name: 'Mai Tera Rasta Dekhunga : Dunki',
      videoUrl: 'https://hdvideo9.com/files/download/type/HD_720p/id/9683',
      imageUrl:
        'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2023/12/23/dunki_poster_1_0.jpg',
    },
    {
      name: 'Tera Rang Mahbob Da : Fighter',
      videoUrl: 'https://hdvideo9.com/files/download/type/HD_720p/id/9687',
      imageUrl:
        'https://pragativadi.com/wp-content/uploads/2023/12/GCLIaLeaoAA63J6.jpg',
    },
  ];
  useEffect(()=>{
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setTimeout(() => {
        Orientation.lockToPortrait();
      }, 1000);
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    
  },[])

  
  return (
    <View style={styles.pageContainer}>
      {/* <Text>Home Screen </Text> */}

      <FlatList
        data={videoDetails}
        keyExtractor={item => Math.random()*3}
        renderItem={({item}) => {
          // console.log(item);
          return (
            <TouchableOpacity style={styles.cardItem} onPress={()=>props.navigation.navigate('VideoDetail', {videoUrl : item.videoUrl})}>
              <Image 
                style={styles.cardImg}
                source={{uri: item.imageUrl}} />
              <Text style={styles.cardTxt}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor:'#000',
    
  },
  cardItem: {
    backgroundColor: '#000',
    padding:5,
    borderRadius:10,
    borderColor:'#fff',
    // borderWidth:StyleSheet.hairlineWidth,
    marginVertical:5
    
  },
  cardImg:{
    width: "100%",
    height: 200,
    resizeMode: 'cover',
    borderRadius:10
  },
  cardTxt:{
    color: '#fff',
    fontSize:16,
    padding:5,
    textAlign:'justify',
    letterSpacing:1,
    textTransform:'capitalize'

  }
});
