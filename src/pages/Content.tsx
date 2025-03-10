import {Text,StyleSheet, View, ScrollView} from 'react-native';

const Content = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>hello content page</Text>
      </View>
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
  },
});
