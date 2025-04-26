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
import {deleteNote, getAllNote, Note} from '../database/userQueries';
import {initDB} from '../database';
import {useNoteProvider} from '../store/NoteProivder';

const Content: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [actionNoteId, setActionNoteId] = useState<number | null>(null);

  const {
    allnote,
    visible,
    setVisible,
    setHeadModal,
    setSingleUserData,
    cardData,
    setCardData,
    filteredCardData,
    setFilteredCardData,
    darkMode,
  } = useNoteProvider();

  const handleDelete = (id: number) => {
    setActionNoteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (actionNoteId !== null) {
      try {
        const db = await initDB();
        await deleteNote(db, actionNoteId);
        const updatedNotes = await getAllNote(db);
        setCardData(updatedNotes);
        setFilteredCardData(updatedNotes);
      } catch (err) {
        console.error('Delete failed', err);
      } finally {
        setActionNoteId(null);
        setShowAlert(false);
      }
    }
  };

  const onEditNote = (id: number) => {
    setHeadModal('Edit Note');
    const user = cardData?.filter(userId => userId.id === id);
    if (user) {
      setSingleUserData(user);
    }
    setVisible(true);
  };

  const SpecificUser = (id: number) => {
    setHeadModal('User Note');
    const user = cardData?.filter(userId => userId.id === id);
    setSingleUserData(user);
    setVisible(true);
  };

  useEffect(() => {
    setCardData(allnote || []);
  }, [allnote]);

  return (
    <View style={styles.container}>
      <ViewModal />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {filteredCardData?.map((val, i) => (
            <TouchableOpacity key={i} onPress={() => SpecificUser(val.id)}>
              <Card.Title
                style={styles.maincard}
                title={val.title}
                subtitle={val.note}
                right={() => (
                  <Menu
                    visible={activeMenu === val.id}
                    onDismiss={() => setActiveMenu(null)}
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        iconColor="black"
                        onPress={() => setActiveMenu(val.id)}
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setVisible(true);
          setHeadModal('Add Note');
        }}>
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
