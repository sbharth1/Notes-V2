import React, {useEffect, useCallback, useState, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {initDB} from '../database';
import {addNote, editNote} from '../database/userQueries';
import {useNoteProvider} from '../store/NoteProivder';

const ViewModal = () => {
  const {
    hideModal,
    visible,
    headModal,
    singleUserData,
    setSingleUserData,
    singleUserDataEdit,
    setSingleUserDataEdit,
    refreshAllNotes,
  } = useNoteProvider();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

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
      try {
        const db = await initDB();
        if (headModal === 'Edit Note') {
          const id = singleUserDataEdit?.[0]?.id;
          if (id) {
            await editNote(db, values.title, values.note, id);
            await refreshAllNotes();
          }
        } else {
          const id = await addNote(db, 'userNotes', values.title, values.note);
          if (id) {
            await refreshAllNotes();
          }
        }
        resetForm();
        setTitle('');
        setNote('');
        setSingleUserDataEdit(null);
        setSingleUserData(null);
        hideModal();
      } catch (error) {
        console.error('Error saving note:', error);
      }
    },
  });

  const formikRef = useRef(formik);
  formikRef.current = formik;

  const resetFormAndClose = useCallback(() => {
    formikRef.current.resetForm();
    setTitle('');
    setNote('');
    setSingleUserDataEdit(null);
    setSingleUserData(null);
    hideModal();
  }, [setSingleUserDataEdit, setSingleUserData, hideModal]);

  useEffect(() => {
    if (visible) {
      if (headModal === 'Edit Note' && singleUserDataEdit?.[0]) {
        const editTitle = singleUserDataEdit[0].title || '';
        const editNote = singleUserDataEdit[0].note || '';
        setTitle(editTitle);
        setNote(editNote);
        formikRef.current.setValues({
          title: editTitle,
          note: editNote,
        });
      } else if (headModal === 'Add Note') {
        setTitle('');
        setNote('');
        formikRef.current.resetForm();
      }
    } else {
      setTitle('');
      setNote('');
      formikRef.current.resetForm();
      setSingleUserDataEdit(null);
      setSingleUserData(null);
    }
  }, [visible, headModal, singleUserDataEdit, setSingleUserData, setSingleUserDataEdit]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    formikRef.current.setFieldValue('title', text);
  };

  const handleNoteChange = (text: string) => {
    setNote(text);
    formikRef.current.setFieldValue('note', text);
  };

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.mainModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>{headModal}</Text>
          
          {headModal === 'User Note' ? (
            <View style={styles.viewContainer}>
              <View style={styles.titleSection}>
                <Text style={styles.labelText}>Title:</Text>
                <Text style={styles.viewTitle}>{singleUserData?.[0]?.title || ''}</Text>
              </View>
              
              <View style={styles.noteSection}>
                <Text style={styles.labelText}>Description:</Text>
                <Text style={styles.viewNote}>{singleUserData?.[0]?.note || ''}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                value={title}
                onChangeText={handleTitleChange}
                onBlur={formik.handleBlur('title')}
                style={styles.input1}
                placeholder="Enter title..."
                placeholderTextColor={'#888'}
                multiline
                maxLength={100}
              />
              
              {formik.touched.title && formik.errors.title ? (
                <Text style={styles.errorText}>{formik.errors.title}</Text>
              ) : null}

              <TextInput
                value={note}
                onChangeText={handleNoteChange}
                onBlur={formik.handleBlur('note')}
                placeholderTextColor={'#888'}
                style={styles.input2}
                placeholder="Enter your note..."
                multiline
                textAlignVertical="top"
              />
              
              {formik.touched.note && formik.errors.note ? (
                <Text style={styles.errorText}>{formik.errors.note}</Text>
              ) : null}
            </View>
          )}

          <View style={styles.buttonContainer}>
            {headModal === 'Add Note' || headModal === 'Edit Note' ? (
              <Button
                mode="contained"
                buttonColor="#4CAF50"
                textColor="#fff"
                onPress={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
                style={styles.saveBtn}
                labelStyle={styles.buttonLabel}>
                {formik.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            ) : null}

            <Button
              mode="outlined"
              textColor="#666"
              onPress={resetFormAndClose}
              style={styles.cancelBtn}
              labelStyle={styles.buttonLabel}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ViewModal;

const styles = StyleSheet.create({ 
  mainModal: {
    backgroundColor: 'transparent',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  viewContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  noteSection: {
    marginBottom: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  viewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 24,
  },
  viewNote: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input1: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 8,
    minHeight: 48,
  },
  input2: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 8,
    minHeight: 120,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  saveBtn: {
    flex: 1,
    borderRadius: 12,
    elevation: 2,
  },
  cancelBtn: {
    flex: 1,
    borderRadius: 12,
    borderColor: '#dee2e6',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
