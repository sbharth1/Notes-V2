import {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.card}>
        {cardData.map((val, i) => (
          <Card.Title key={i}
            style={styles.maincard}
            title="Card Title"
            subtitle="Card Subtitle"
          />
        ))}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  maincard: {
    width: '80%',
    backgroundColor: 'red',
    margin:5,
  },
});
