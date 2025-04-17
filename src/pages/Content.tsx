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
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);



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
      <ViewModal hideModal={hideModal} visible={visible}/>

      {/* Content  */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
        {cardData.map((val, i) => (
  <Card.Title
    key={i}
    style={styles.maincard}
    title={val.name}
    subtitle={val.description}
    right={() => (
      <Menu
        visible={activeMenu === i}
        onDismiss={() => setActiveMenu(null)}
        anchor={
          <IconButton
            icon="dots-vertical"
            iconColor="black"
            onPress={() => setActiveMenu(i)}
          />
        }>
        <Menu.Item onPress={() => Alert.alert("Edit", val.name)} title="Edit" />
        <Menu.Item onPress={() => Alert.alert("Delete", val.name)} title="Delete" />
      </Menu>
    )}
  />
))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setVisible(true)}>
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
