// ListaLibros.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Book } from '../models/book';

interface BookListProps {
  books: Book[];
  onLibroClick: (id: string) => void;
};

const BookList: React.FC<BookListProps> = ({ books: booksList, onLibroClick }) => {
  
  return (
    <View style={styles.listaContainer} key={'view-parent-list'}>
      <ScrollView key={'scrollView-list'}>
        {booksList.map((book : Book, index: number) => {
          return (
            <View style={styles.fileContainer} key={`book-container-${book.id}`}>
              <TouchableOpacity style={styles.bookContainer} activeOpacity={0.7} onPress={() => onLibroClick(book.id)} key={`view-${book.id}-${index}`}>
                <Text style={styles.bookTitle} key={'book-name'}>{book.name}</Text>
                <Text style={styles.bookAuthor} key={'book-author'}>{book.author}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listaContainer: {
    padding: 16,
    backgroundColor: 'D6EADC'
  },
  listTittle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 16
  },
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: "50%",
    elevation: 0,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  container: {
    padding: 16,
  },
  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default BookList;
