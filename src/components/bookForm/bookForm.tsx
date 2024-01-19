import { useState } from "react";
import { Book } from "../../models/book";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface bookFormProps {
    isNewBook: boolean;
    book?: Book
    handleEditBook: (id: string, bookEdited: Book) => void
    handleNewBook: (id: string, newBook: Book) => void
}

const BookForm: React.FC<bookFormProps> = ({ isNewBook, book, handleEditBook, handleNewBook }) => {
    const [name, setName] = useState(isNewBook ? '' : book!.name);
    const [author, setAuthor] = useState(isNewBook ? '' : book!.author);
    const [description, setDescription] = useState(isNewBook ? '' : book!.description);

    function handleSubmit() {
        const uuid = uuidv4().toString();
        const bookToSubmit: Book = {
            name,
            author,
            description,
            id: book ? book.id : uuid,
            image: book ? book.image : undefined
        };
        if (book) {
            handleEditBook(book.id, bookToSubmit);
        } else {
            handleNewBook(bookToSubmit.id, bookToSubmit);
        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del Libro</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Autor</Text>
            <TextInput
                style={styles.input}
                value={author}
                onChangeText={(text) => setAuthor(text)}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.bigText]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                numberOfLines={5}
            />

            <Button title="Guardar Cambios" onPress={() => handleSubmit()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    bigText: {
        height: 'auto'
    }
});

export default BookForm;