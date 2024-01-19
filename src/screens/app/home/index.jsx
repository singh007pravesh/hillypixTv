import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react';
import DayListItem from '../../component/core/DayListItem';

const HomeScreen = () => {

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