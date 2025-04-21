import {useEffect, useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, IconButton, Menu} from 'react-native-paper';
import ViewModal from '../modal/Modal';
import {deleteNote, Note} from '../database/userQueries';
import {initDB} from '../database';

interface Props {
  allnote?: Note[];
}

const Content: React.FC<Props> = ({allnote}) => {
  const [cardData, setCardData] = useState<Note[]>([]);
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [actionNoteId, setActionNoteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setActionNoteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (actionNoteId !== null) {
      const db = await initDB();
      await deleteNote(db, actionNoteId);
      const updatedNotes = cardData.filter(note => note.id !== actionNoteId);
      setCardData(updatedNotes);
      setShowAlert(false);
      setActionNoteId(null);
    }
  };

  const onEditNote = async (id: number) => {
    const db = await initDB();
    console.log('Editing note:', id);

  };

  useEffect(() => {
    setCardData(allnote || []);
  }, [allnote]);

  return (
    <View style={styles.container}>
      {/* modal  */}
      <ViewModal hideModal={hideModal} visible={visible} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {cardData.map((val, i) => (
            <Card.Title
              key={val.id}
              style={styles.maincard}
              title={val.title}
              subtitle={val.note}
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
                  <Menu.Item
                    style={styles.menuitem}
                    onPress={() => {
                      setActiveMenu(null);
                      onEditNote(val.id);
                    }}
                    title="Edit"
                  />
                  <Menu.Item
                    style={styles.menuitem}
                    onPress={() => {
                      setActiveMenu(null);
                      handleDelete(val.id);
                    }}
                    title="Delete"
                  />
                </Menu>
              )}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirm Delete"
        message="Are you sure you want to delete this note?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        cancelButtonColor="red"
        confirmButtonColor="green"
        onConfirmPressed={confirmDelete}
        onCancelPressed={() => {
          setShowAlert(false);
          setActionNoteId(null);
        }}
      />
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
    backgroundColor: 'gray',
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
  menuitem: {},
});
