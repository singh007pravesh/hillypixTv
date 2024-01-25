import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react';
import DayListItem from '../../component/core/DayListItem';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = (props) => {
  const navigation   = useNavigation();
 
    const days = [ ...Array(24).keys() ].map( i => i+1);
  return (
    <View style={styles.container}> 
      <FlatList
        data={days}
        columnWrapperStyle={styles.column}
        style={styles.contentStyle}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => 
          <DayListItem dayItem ={item.item}/>
        }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      contentStyle: {
        padding: 1,
        // backgroundColor:'green',
      },
      column: {
        // flex:1,
      },
})