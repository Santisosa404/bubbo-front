// ListaLibros.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Book } from '../../models/book';
import { Icon } from '@rneui/themed';

interface BookListProps {
  books: Book[];
  onBookDetailClick: (id: string) => void;
  handleNewBook: () => void;
};

const BookList: React.FC<BookListProps> = ({ books: booksList, onBookDetailClick, handleNewBook }) => {

  return (
    <View style={styles.containerList} key={'view-parent-list'}>
      <ScrollView key={'scrollView-list'}>
        {booksList.map((book: Book, index: number) => {
          return (
            <View style={styles.fileContainer} key={`book-container-${book.id}`}>
              <TouchableOpacity style={styles.bookContainer} activeOpacity={0.7} onPress={() => onBookDetailClick(book.id)} key={`view-${book.id}-${index}`}>
                <Text style={styles.bookTitle} key={'book-name'}>{book.name}</Text>
                <Text style={styles.bookAuthor} key={'book-author'}>{book.author}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
      <Icon
        raised
        name='plus'
        type='font-awesome'
        onPress={() => handleNewBook()} />
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  containerList: {
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
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookList;
