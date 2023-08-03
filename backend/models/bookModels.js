// const { ObjectId } = require("mongodb");
import { ObjectId } from 'mongodb';

class Books {
  static async addBook(db, newBook) {
    try {
      return await db
        .collection(process.env.BOOKS_COLLECTION_NAME)
        .insertOne(newBook);
    } catch (error) {
      return error;
    }
  }

  static async findBookByISBN(db, ISBN) {
    try {
      return await db
        .collection(process.env.BOOKS_COLLECTION_NAME)
        .findOne({ ISBN });
    } catch (error) {
      return error;
    }
  }

  static async findBookByBookId(db, bookId) {
    try {
      return await db
        .collection(process.env.BOOKS_COLLECTION_NAME)
        .findOne({ _id: new ObjectId(bookId) });
    } catch (error) {
      return error;
    }
  }

  static async getAllBooks(db) {
    try {
      return await db
        .collection(process.env.BOOKS_COLLECTION_NAME)
        .find({})
        .toArray();
    } catch (error) {
      return error;
    }
  }

  static async updateBook(db, bookId, updatedBook) {
    try {
      return await db.collection(process.env.BOOKS_COLLECTION_NAME).updateOne(
        { _id: new ObjectId(bookId) },
        {
          $set: {
            title: updatedBook.title,
            ISBN: updatedBook.ISBN,
            author: updatedBook.author,
            genre: updatedBook.genre,
            publicationDate: updatedBook.publicationDate,
            price: updatedBook.price,
            available: updatedBook.available,
          },
        }
      );
    } catch (error) {
      return error;
    }
  }

  static async deleteBook(db, bookId) {
    try {
      return await db
        .collection(process.env.BOOKS_COLLECTION_NAME)
        .deleteOne({ _id: new ObjectId(bookId) });
    } catch (error) {
      return error;
    }
  }


  // static async 


  static async checkout(db, cart) {
    try {
      return await db.collection(process.env.BOOKS_COLLECTION_NAME).updateMany(
        {}
      )
    } catch (error) {
      return error;
    }
  }

  static async updateRating(db, bookId, rate) {
    try {
      // console.log(rate)
      return await db.collection(process.env.BOOKS_COLLECTION_NAME).updateOne(
        { _id: new ObjectId(bookId) },
        { $push: { rating: rate } }
      )
    } catch (error) {
      return error;
    }
  }


}

// module.exports = Books;
export default Books;
