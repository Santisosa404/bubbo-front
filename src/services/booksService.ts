import { Book } from "../models/book";

const baseURL = "http://192.168.1.138:3000";

const editBook = async (book: Book, id: string) => {
    try {
        const body = {
            book: book
        };

        const editedBookRequest = await fetch(`${baseURL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return editedBookRequest.ok;
    } catch (error) {
        console.log('Error on editBook ' + error);
    }
};

const deleteBook = async (id: string) => {
    try {
        const deleteBookRequest = await fetch(`${baseURL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return deleteBookRequest.ok;
    } catch (error) {
        console.log('Error removing book ' + error);

    }
};

const createNewBook = async (id: string, newBook: Book) => {
    try {
        const body = {
            book: newBook
        };
        const createNewBookRequest = await fetch(`${baseURL}/books/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        return createNewBookRequest.ok;
    } catch (error) {
        console.log('Error while creating new book ' + error);

    }
};

export default { editBook, deleteBook, createNewBook }