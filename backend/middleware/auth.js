// const userModel = require("../models/userModels");
// const bookModel = require("../models/bookModels");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

import userModel from '../models/userModels.js';
import bookModel from '../models/bookModels.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await userModel.getUserByUsername(req.db, username);
    if (!data) {
      return res.send({ success: false, data: "Invalid username" });
    }
    if (!bcrypt.compareSync(password, data.password)) {
      return res.send({ success: false, data: "Invalid password" });
    }
    const token = jwt.sign(
      {
        _id: data._id,
        username: data.username,
        fName: data.fName,
        lName: data.lName,
        role: data.role,
      },
      process.env.PRIVATE_KEY
    );
    return res.status(200).send({ success: true, data: token });
  } catch (error) {
    next(error.message);
  }
};

export const existingUsers = async (req, res, next) => {
  try {
    const { username } = req.body;
    const data = await userModel.getUserByUsername(req.db, username);
    if (data) {
      return res.send({ success: false, data: "User already exists" });
    } else {
      next();
    }
  } catch (error) {
    next(error.message);
  }
};

export const validateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Invalid token");

    const payload = jwt.verify(token, process.env.PRIVATE_KEY);
    if (payload.role !== "admin") {
      return res.send({
        success: false,
        data: "You are not allowed, only for admins",
      });
    }
    next();
  } catch (error) {
    res.send({ success: false, data: "Invalid token" });
  }
};

export const validateAddBook = async (req, res, next) => {
  try {
    const { ISBN } = req.body;
    const data = await bookModel.findBookByISBN(req.db, ISBN);
    if (data) {
      return res.send({
        success: false,
        data: `Book with this ISBN:${ISBN} already registered`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const validateFavoriteBook = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;

    const data = await userModel.getUserById(req.db, userId);
    if (data.favorites) {
      for (let each of data.favorites) {
        if (each.bookId === bookId) {
          const unLiked =  await userModel.removeFromFavorites(req.db, userId, bookId);
          return res.send({success: false, data: unLiked });
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
