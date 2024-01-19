// App.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Book } from './src/models/book';
import BookList from './src/components/bookList/bookList';
import BookDetail from './src/components/bookDetail/bookDetail';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import booksService from './src/services/booksService';
import Toast from 'react-native-toast-message';
import { ToastAndroid } from 'react-native';
import BookForm from './src/components/bookForm/bookForm';

type RootRouterParamList = {
  booksList: undefined;
  bookDetails: { id: string };
  bookEditForm: { id?: string };
}
const App: React.FC = () => {
  const [booksList, setBookList] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isNewBook, setIsNewBook] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      // Cambia la URL a tu servidor o API local
      const response = await fetch('http://192.168.1.138:3000/books/');

      if (!response.ok) {
        throw new Error(response.toString());
      }

      const result = await response.json();
      typeResponse(result);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function typeResponse(result: any[]) {

    const bookList: Book[] = result.map((res) => {
      const book: Book = {
        name: res.name,
        author: res.author,
        description: res.description,
        id: res.id,
        image: res.image ? res.image : undefined
      };
      return book;
    });
    setBookList(bookList);
  }

  const Stack = createStackNavigator<RootRouterParamList>();

  function BookListContent() {
    const navigation = useNavigation<StackNavigationProp<RootRouterParamList>>();

    const handleSeeDetails = (id: string) => {
      const libro = booksList.find((l) => l.id === id);
      setSelectedBook(libro || null);
      if (selectedBook) {
        navigation.navigate('bookDetails', { id });
      }
    };

    const handleNewBook = () => {
      setSelectedBook(null);
      setIsNewBook(true);
      navigation.navigate("bookEditForm", { id: undefined });
    };

    return (
      <BookList books={booksList} onBookDetailClick={handleSeeDetails} handleNewBook={handleNewBook} ></BookList>
    )
  };

  function BookDetails() {
    const navigation = useNavigation<StackNavigationProp<RootRouterParamList>>();

    const handleDeleteBook = async (id: string) => {
      const result = await booksService.deleteBook(id);
      if (result) {
        await fetchData();
        navigation.navigate('booksList');
        ToastAndroid.showWithGravity(
          'Libro eliminado correctamente',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
    }

    const handleEditBook = async (id: string) => {
      navigation.navigate('bookEditForm', { id });
    };

    return (
      <BookDetail book={selectedBook!} handleDeleteBook={handleDeleteBook} handleEditBook={handleEditBook}></BookDetail>
    )
  };

  function BookForms() {
    const navigation = useNavigation<StackNavigationProp<RootRouterParamList>>();

    const handleEditBook = async (id: string, bookEdited: Book) => {
      const editBookRequest = await booksService.editBook(bookEdited, id);
      if (editBookRequest) {
        navigation.navigate('booksList');
        fetchData();
        ToastAndroid.showWithGravity(
          'Libro editado correctamente',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Error al editar el libro',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    };

    const handleNewBook = async (id: string, newBook: Book) => {
      const createNewBookRequest = await booksService.createNewBook(id, newBook);
      if (createNewBookRequest) {
        navigation.navigate('booksList');
        fetchData();
        ToastAndroid.showWithGravity(
          'Libro creado correctamente',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Error al crear el libro',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }

    return (
      <BookForm isNewBook={isNewBook} handleEditBook={handleEditBook} handleNewBook={handleNewBook} book={isNewBook ? undefined : selectedBook!}></BookForm>
    );

  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='booksList'>
        <Stack.Screen name='booksList' options={{ title: 'Listado de Libros' }} component={BookListContent} />
        <Stack.Screen name='bookDetails' options={{ title: 'Detalles del Libro' }} component={BookDetails} />
        <Stack.Screen name='bookEditForm' options={{ title: 'Editar detalles del libro' }} component={BookForms} />
      </Stack.Navigator>
    </NavigationContainer>);
};

export default App;
