import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    const videoUrl  = {
        url:"https://hillypix-media-bucket.s3.ap-south-1.amazonaws.com/movie-trailer/wangangdaba.mp4",
    }
  return (
    <View style={styles.main}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#fff'
    }
})