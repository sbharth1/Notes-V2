import { Image, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const Navbar = () => {

  return (
    <View>
      <View style={styles.navbar}>
        <View>
        <Image source={{uri:'https://imgs.search.brave.com/GLkAP6cP1uGrlZyJLPZT03ULZRXPu1rdCaDdwLu9F0g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvd2hp/dGUtbm90ZS1wYXBl/ci1wbmctNDYtM3dh/eWFna2V1Z2VxZ2hq/cC5wbmc'}} style={{height:100,width:100}}  />
        </View>
        <View style={styles.searchbar}>
          <TextInput
            placeholder='search...'
            style={styles.mainsearchbar}
            underlineColor='transparent'
            mode="flat" 
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
    height: 60,
    display:"flex",
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:"row",
    paddingHorizontal: 10,
  },
  searchbar: {
    width: "60%",
  },
  mainsearchbar: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',

  },
});
