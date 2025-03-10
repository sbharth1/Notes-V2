import { useState } from 'react';
import {  StyleSheet, Text, View} from 'react-native';
import { Searchbar } from 'react-native-paper';


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.searchbar}>
      <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    </View>
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
searchbar:{
  width:"50%",
}
});
