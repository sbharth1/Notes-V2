import {  StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Navbar = ({navigation}:any) => {
  return (
    <View>
      <View style={styles.navbar}>
         <Text>navbar</Text>

      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

});
