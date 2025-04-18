import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View>
      <View style={styles.navbar}>
        <View>
          <Text style={styles.navtext}>Notes</Text>
        </View>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="search..."
            style={styles.mainsearchbar}
            underlineColor="transparent"
            mode="flat"
            textColor="white"
          />
        </View>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Icon
            name={darkMode ? 'weather-night' : 'weather-sunny'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 60,
    display: 'flex',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchbar: {
    width: '60%',
  },
  mainsearchbar: {
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  navtext: {
    fontSize: 25,
    fontWeight: '900',
    color: 'white',
  },
});
