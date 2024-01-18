// App.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Book } from './src/models/book';
import BookList from './src/components/bookList';
import BookDetail from './src/components/bookDetail';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  const [libros, setLibros] = useState<Book[]>([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState<Book | null>(null);

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
    console.log('Hago fetch');
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
    setLibros(bookList);
  }

  type RootRouterParamList = {
    booksList: undefined;
    bookDetails: { id: string };
  }

  const Stack = createStackNavigator<RootRouterParamList>();

  function BookListContent() {
    const navigation = useNavigation<StackNavigationProp<RootRouterParamList>>();

    const handleLibroClick = (id: string) => {
      const libro = libros.find((l) => l.id === id);
      setLibroSeleccionado(libro || null);
      if (libroSeleccionado) {
        navigation.navigate('bookDetails', { id });
      }
    };

    return (
      <BookList books={libros} onLibroClick={handleLibroClick} ></BookList>
    )
  };

  function BookDetails() {
    return (
      <BookDetail book={libroSeleccionado!}></BookDetail>
    )
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='booksList'>
        <Stack.Screen name='booksList' options={{ title: 'Listado de Libros' }} component={BookListContent} />
        <Stack.Screen name='bookDetails' options={{ title: 'Detalles del Libro' }} component={BookDetails} />
      </Stack.Navigator>
    </NavigationContainer>);
};

export default App;
