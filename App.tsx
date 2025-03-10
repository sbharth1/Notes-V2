import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={styles.main}>
      <Text>Hello world</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  main:{
    backgroundColor:'#f9f9f9',
  }
})