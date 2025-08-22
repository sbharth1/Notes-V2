import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, IconButton, Menu} from 'react-native-paper';
import ViewModal from '../modal/Modal';
import {deleteNote} from '../database/userQueries';
import {initDB} from '../database';
import {useNoteProvider} from '../store/NoteProivder';

const Content: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const {
    allnote,
    setVisible,
    setHeadModal,
    setSingleUserData,
    cardData,
    setCardData,
    filteredCardData,
    setFilteredCardData,
    setSingleUserDataEdit,
    refreshAllNotes,
  } = useNoteProvider();

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: () => confirmDelete(id),
        },
      ]
    );
  };

  const confirmDelete = async (id: number) => {
    try {
      const db = await initDB();
      await deleteNote(db, id);
      await refreshAllNotes();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const onEditNote = (id: number) => {
    setHeadModal('Edit Note');
    const user = cardData?.find(userId => userId.id === id);
    if (user) {
      setSingleUserDataEdit([user]);
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
    if (allnote) {
      setCardData(allnote);
      setFilteredCardData(allnote);
    }
  }, [allnote, setCardData, setFilteredCardData]);

  return (
    <View style={styles.container}>
      <ViewModal />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {filteredCardData?.map((val) => (
            <TouchableOpacity key={val.id} onPress={() => SpecificUser(val.id)}>
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
          {filteredCardData.length === 0 && (
            <Text style={styles.noNotesText}>No Notes Found</Text>
          )}
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
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
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
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: 'green',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 36,
    textAlign: 'center',
  },
  menuitem: {},
  noNotesText: {
    textAlign: 'center',
    color: '#f2f2f2',
    fontSize: 16,
    marginTop: 20,
  },
});
