import {useEffect, useState} from 'react';

import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, IconButton,Menu} from 'react-native-paper';
import ViewModal from '../modal/Modal';

interface CardData {
  name: string;
  description: string;
}

const Content = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const res = await fetch(
          'https://67c937330acf98d0708941b3.mockapi.io/demo/fakeusers',
        );
        const data = await res.json();
        console.log('Fetched Data:', data);
        setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Modal  */}
    <ViewModal/>

      {/* Content  */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {cardData?.map((val, i) => (
            <Card.Title
              key={i}
              style={styles.maincard}
              title={val.name}
              subtitle={val.description}
              right={() => (
                <IconButton icon="dots-vertical" iconColor='black' onPress={() => {
                  <View style={{ flex: 1 }}>
                  <Menu.Item  onPress={() => {}} title="edit" />
                  <Menu.Item  onPress={() => {}} title="delete" />
                </View>
                }} />
              )}
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
    backgroundColor: '#c5ec69',
    borderRadius: 10,
    margin: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
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
