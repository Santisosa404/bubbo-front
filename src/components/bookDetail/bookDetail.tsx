// LibroDetalle.tsx
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Book } from '../../models/book';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface LibroDetalleProps {
  book: Book;
  handleDeleteBook: (id: string) => void,
  handleEditBook: (id: string) => void,
}

const BookDetail: React.FC<LibroDetalleProps> = ({ book, handleDeleteBook, handleEditBook }) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../utils/images/bookDefault.png')} style={styles.image} />
          <Text style={styles.title}>{book.name}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{book.description}</Text>
        </View>
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleEditBook(book.id)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setShowModal(true)}>
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este libro?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity  >
              <Text style={styles.buttonText} onPress={() => { handleDeleteBook(book.id); setShowModal(false); }}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonText} onPress={() => setShowModal(false)}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2E86AB',
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  descriptionContainer: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    backgroundColor: '#2E86AB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4949',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
export default BookDetail;
