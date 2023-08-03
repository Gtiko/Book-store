// const express = require("express");
// const router = express.Router();
// const bookController = require("../controllers/bookController");
// const middleware = require("../middleware/auth");
// const multer = require('multer')

import express from 'express'
const router = express.Router();
import { getAllBooks, findBookByBookId, updateBook, updateRating, addBook, deleteBook } from '../controllers/bookController.js';
import { existingUsers, login, validateAdmin, validateAddBook, validateFavoriteBook } from '../middleware/auth.js'
import multer from 'multer';

router.get("/", getAllBooks);
router.get("/:bookId", findBookByBookId);
router.patch("/:bookId/updateRating", updateRating);
router.patch("/checkout")

router.use(validateAdmin);

router.post("/add", multer({ dest: 'uploads/' }).single('pic'), validateAddBook, addBook);

router.patch("/:bookId/update/", updateBook);
router.delete("/:bookId/delete/", deleteBook);

// module.exports = router;
export default router;
