import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Content from './Content'

const Navbar = ({navigation}:any) => {
  return (
    <View>
      <View style={styles.navbar}>
        <View style={{width: '50%'}}>
          <Image
            style={{height: 70, width: 70}}
            source={{
              uri: 'https://imgs.search.brave.com/o5vK1fntnjHG9m7jBIWQ7ubP6reNQEbf1-Ky-uVKlwg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/NTg1Nzk2L3ZlY3Rv/ci9oYW5kLWhvbGRp/bmctdG9yY2guanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU9o/Rl85c3hUYkxhZWFG/YUhrS3FjYXNjN21z/R2E4Y19FYkhzZWlR/X3p1UzQ9',
            }}
          />  
        </View>

        <View style={{width: '50%'}}>
          <View style={styles.navbutton}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={({pressed}) => ({
                padding: 8,
                borderWidth: 1,
                marginRight: 10,
                borderRadius: 6,
                backgroundColor: pressed ? 'black' : 'royalblue',
              })}>
              <Text style={{color: 'white', fontWeight: '800'}}>Login</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Signup')}
              style={({pressed}) => ({
                padding: 8,
                borderWidth: 1,
                borderRadius: 6,
                marginRight: 10,
                backgroundColor: pressed ? 'black' : 'royalblue',
              })}>
              <Text style={{color: 'white', fontWeight: '800'}}>SignUp</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.showdata}>
        {/* <Content /> */}
        <h1>data show</h1>
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
  navbutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  showdata: {
    height: '100%',
    width: '100%',
  },
});
