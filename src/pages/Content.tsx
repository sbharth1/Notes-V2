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
import {useNoteProvider} from '../store/NoteProivder';

interface Props {
  allnote?: Note[];
}

const Content: React.FC<Props> = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [actionNoteId, setActionNoteId] = useState<number | null>(null);
  const {allnote,visible,setVisible,setHeadModal,setSingleUserData,cardData,setCardData,darkMode,setDarkMode} = useNoteProvider();


  const handleDelete = (id: number) => {
    setActionNoteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (actionNoteId !== null) {
      const db = await initDB();
      await deleteNote(db, actionNoteId);
      const updatedNotes = cardData?.filter(note => note.id !== actionNoteId);
      setCardData(updatedNotes);
      setShowAlert(false);
      setActionNoteId(null);
    }
  };

  const onEditNote = async (id: number) => {
    const db = await initDB();
    console.log('Editing note:', id);
  };

  const SpecificUser = async(id: number) => {
    setHeadModal("User Note")
    const user = cardData?.filter((userId)=> userId.id === id);
    setSingleUserData(user)
    setVisible(!visible)
  };

  useEffect(() => {
    setCardData(allnote || []);
  }, [allnote]);

  return (
    <View style={styles.container}>
      {/* modal  */}
      <ViewModal/>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.card}>
          {cardData?.map((val, i) => (
            <TouchableOpacity key={i} onPress={() => SpecificUser(val.id)}>
              <Card.Title
                key={i}
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => {setVisible(true),setHeadModal("Add Note")}}>
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
