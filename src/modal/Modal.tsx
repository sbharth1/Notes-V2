import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {useFormik} from 'formik';
import {initDB} from '../database';
import {addNote} from '../database/userQueries';

const ViewModal = ({visible, hideModal}: any) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      note: '',
    },
    onSubmit: async (values,{resetForm}) => {
      const db = await initDB();
     const res =  await addNote(db, 'sid', values.title, values.note);
      console.log('Form Submitted:', res);
      hideModal();
      resetForm();
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.mainModal}>
        <Text style={styles.modalHeader}>Add Note</Text>

        <TextInput
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          style={styles.input}
          placeholder="TITLE"
        />

        <TextInput
          value={formik.values.note}
          onChangeText={formik.handleChange('note')}
          style={styles.input}
          placeholder="NOTE..."
          multiline
        />

        <Button
          mode="contained"
          onPress={() => formik.handleSubmit()}
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
    color: '#000',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
  },
});
