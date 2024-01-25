import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const AccountScreen = (props) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#000'}}>
      <TouchableOpacity
      style={styles.navBtn}
        onPress={()=>{
          props.navigation.navigate('Login');
        }}
      >
        <Text style={styles.btnTxt}>Login Screen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  navBtn:{
    backgroundColor:'#fff',
    padding:10,
    borderRadius:5,

  },
  btnTxt:{
    color:'#000'
  }
})