import {Text,StyleSheet, View, ScrollView} from 'react-native';

const Content = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>hello content</Text>
      </View>
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    height:"100%",
    width:"100%",
    backgroundColor:"#fff"
  },
});
