// const bookModel = require("../models/bookModels");
import bookModel from '../models/bookModels.js'

export const addBook = async (req, res, next) => {
  try {
    const { originalname, filename, buffer, mimetype } = req.file;
    // console.log(originalname, filename, buffer, mimetype);

    // Construct the book object with binary image data
    const quantity = req.body.available;
    const available = Number(quantity);
    const newBook = {
      ...req.body,
      available:available,
      pic: {
        filename,
        originalname,
        binaryData: buffer, // Store the binary image data in the 'binaryData' field
        contentType: mimetype, // Store the MIME type of the image
      },
      rating: [],
    };

    const result = await bookModel.addBook(req.db, newBook);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const result = await bookModel.getAllBooks(req.db);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const findBookByBookId = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const result = await bookModel.findBookByBookId(req.db, bookId);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const result = await bookModel.updateBook(req.db, bookId, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const result = await bookModel.deleteBook(req.db, bookId);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { rate } = req.body;
    const result = await bookModel.updateRating(req.db, bookId, rate);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
