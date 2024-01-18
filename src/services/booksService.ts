import { Book } from "../models/book";

const baseURL = "http://192.168.1.138:3000"
const editBook = async (book: Book, id: string) => {
    try {
        const body = {
            book: book
        };
    
        const editedBookRequest = await fetch(`${baseURL}/books/${id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        console.log(editedBookRequest.json(), 'editedBookRequest.json()');
    } catch (error) {
        console.log('Error on editBook'+error);
    }
};

const deleteBook = async () => {

};

export default {editBook, deleteBook}