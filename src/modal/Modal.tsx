import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';

const ViewModal = ({visible, hideModal}: any) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.mainModal}>
        <Text style={styles.modalHeader}>Add Note</Text>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Note"
          value={note}
          onChangeText={setNote}
          style={styles.input}
          mode="outlined"
          multiline
        />
        <Button
          mode="contained"
          onPress={() => {
            console.log({title, note});
            hideModal();
          }}
          style={{marginTop: 10}}
          contentStyle={{paddingVertical: 5}}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
};

export default ViewModal;

const styles = StyleSheet.create({
  mainModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 350,
  },  
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
});
