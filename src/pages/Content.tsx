import {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Card} from 'react-native-paper';

const Content = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const setData = async () => {
      fetch('https://67c937330acf98d0708941b3.mockapi.io/demo/fakedata')
        .then(res => res.json())
        .then(res => setCardData(res));
    };
    setData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {cardData.map((val, i) => (
            <Card.Title
              key={i}
              style={styles.maincard}
              title={val.title}  
              subtitle={val.text}  
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => Alert.alert('Add Button Pressed!')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  maincard: {
    width: '80%',
    backgroundColor: 'red',
    margin: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
