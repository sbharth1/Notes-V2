import { useState } from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const ViewModal = ({visible,hideModal}:any) => {
  
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
  );
};

export default ViewModal;