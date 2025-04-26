import React, {use, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {initDB} from '../database';
import {addNote, editNote} from '../database/userQueries';
import {useNoteProvider} from '../store/NoteProivder';

const ViewModal = () => {
  const {hideModal, visible, headModal, singleUserData, addNewNote} =
    useNoteProvider();
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title should be at least 3 characters'),
    note: Yup.string()
      .required('Note content is required')
      .min(5, 'Note should be at least 5 characters'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      note: '',
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      const db = await initDB();
      if (headModal === 'Edit Note') {
        const id = singleUserData?.[0]?.id;
        console.log(id, 'idedited--');
        if (id) {
          await editNote(db, values.title, values.note, id);
        }
      } else {
        const id = await addNote(db, 'userNotes', values.title, values.note);
        if (id) {
          addNewNote({id, title: values.title, note: values.note});
        }
      }
      resetForm();
      hideModal();
    },
  });

  useEffect(() => {
    if (headModal === 'Edit Note') {
      const note = singleUserData?.[0];
      if (note) {
        formik.setValues({title: note.title, note: note.note});
      }
    }
  }, [headModal, singleUserData]);

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.mainModal}>
        <Text style={styles.modalHeader}>{headModal}</Text>

        <TextInput
          value={
            headModal === 'Add Note'
              ? formik.values.title
              : singleUserData?.length
              ? singleUserData[0]?.title
              : ''
          }
          onChangeText={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
          style={styles.input1}
          placeholder="TITLE"
          readOnly={headModal === 'User Note' ? true : false}
        />
        {formik.touched.title && formik.errors.title ? (
          <Text style={styles.errorText}>{formik.errors.title}</Text>
        ) : null}

        <TextInput
          value={
            headModal === 'Add Note'
              ? formik.values.note
              : singleUserData?.length
              ? singleUserData[0]?.note
              : ''
          }
          onChangeText={formik.handleChange('note')}
          onBlur={formik.handleBlur('note')}
          style={styles.input2}
          placeholder="NOTE..."
          readOnly={headModal === 'User Note' ? true : false}
          multiline
        />
        {formik.touched.note && formik.errors.note ? (
          <Text style={styles.errorText}>{formik.errors.note}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          {headModal === 'Add Note' || headModal === 'Edit Note' ? (
            <Button
              mode="contained"
              buttonColor="green"
              textColor="#fff"
              onPress={() => {
                formik.handleSubmit();
              }}
              disabled={formik.isSubmitting}
              style={styles.saveBtn}>
              Save
            </Button>
          ) : null}

          <Button
            mode="outlined"
            textColor="#000"
            onPress={() => {
              formik.resetForm();
              hideModal();
            }}
            style={styles.cancelBtn}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ViewModal;

const styles = StyleSheet.create({
  mainModal: {
    backgroundColor: 'lightgray',
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
  input1: {
    marginBottom: 5,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    padding: 10,
    height: 40,
  },
  input2: {
    marginBottom: 5,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    padding: 10,
    height: 60,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveBtn: {
    flex: 1,
    marginRight: 10,
  },
  cancelBtn: {
    flex: 1,
    marginLeft: 10,
  },
});
