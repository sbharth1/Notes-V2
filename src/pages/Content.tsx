import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Card} from 'react-native-paper';

const Content = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.card}>
        <Card.Title
          style={styles.maincard}
          title="Card Title"
          subtitle="Card Subtitle"
        />
      </View>
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 20, 
  },
  card: {
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 20,
  },
  maincard: {
    width: '80%',
    backgroundColor: 'red',
  },
});
