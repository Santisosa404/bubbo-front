// LibroDetalle.tsx
import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Book } from '../models/book';
import { TouchableOpacity } from 'react-native-gesture-handler';



interface LibroDetalleProps {
  book: Book;
}

const BookDetail: React.FC<LibroDetalleProps> = ({ book }) => {
    function deleteBook(id: string){
      
    }

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://img.freepik.com/vector-gratis/libro-azul-abierto-sobre-blanco_1308-69339.jpg?w=1800&t=st=1705582571~exp=1705583171~hmac=7e49751e66ee37c9953780127ab061a62b030a84c2e5f3422254f4e813be9928" }} style={styles.imagen} />
        <Text style={styles.titulo}>{book.name}</Text>
        <Text style={styles.autor}>{book.author}</Text>
      </View>
      <View style={styles.descripcionContainer}>
        <Text style={styles.descripcion}>{book.description}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.boton} onPress={()=> console.log('boton editar')}>
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton,styles.botonEliminar]} onPress={()=> console.log('boton eliminar')}>
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  imagen: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  autor: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  descripcionContainer: {
    flex: 1,
    padding: 16,
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'justify',
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  boton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  botonEliminar: {
    backgroundColor: '#FF4949',
  },
  textoBoton: {
    color: 'black',
    fontWeight: 'bold',
  },
});
export default BookDetail;
