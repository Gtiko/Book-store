// const userModel = require("../models/userModels");
// const bcrypt = require("bcrypt");\\
import userModel from '../models/userModels.js'
import bcrypt from 'bcrypt'

export const signUp = async (req, res, next) => {
  try {
    const { fName, lName, username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 7);
    const newUser = {
      fName,
      lName,
      username,
      password: hashed,
      role: "user",
    };
    const result = await userModel.createUser(req.db, newUser);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { fName, lName, username, password, role } = req.body;
    const hashed = bcrypt.hashSync(password, 7);
    const newUser = { fName, lName, username, password: hashed, role: role };
    const result = await userModel.createUser(req.db, newUser);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await userModel.getUsers(req.db);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// exports.getAllUsers = async (req, res, next) =>{
//   try {
//     const result = await userModel.getAllUsers(req.db);
//     return res.status(200).send({ success: true, data: result });
//   } catch (error) {
//     next(error);
//   }
// }

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userModel.getUserById(req.db, userId);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { fName, lName, username, password, role } = req.body;
    const hashed = bcrypt.hashSync(password, 7);
    const updatedUser = { fName, lName, username, password: hashed, role };
    const result = await userModel.updateUser(req.db, userId, updatedUser);
    if (result.modifiedCount != 0) {
      return res.status(200).send({ success: true, data: result });
    } else {
      return res.send({ success: false, data: result });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
      const result = await userModel.deleteUser(req.db, userId);
      return res.send({ success: true, data: result });

  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userModel.addToCart(req.db, userId, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;
    const result = await userModel.removeFromCart(req.db, userId, bookId);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userModel.addToFavorites(req.db, userId, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const sendCheckoutStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userModel.sendCheckoutStatus(req.db, userId, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const approveCheckoutRequest = async (req, res, next) => {
  try {
    const { userId, ISBN } = req.body;
    const result = await userModel.approveCheckoutRequest(req.db, userId, ISBN);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


export const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { userId, orderId } = req.params;
    const { status } = req.body;
    const result = await userModel.updateDeliveryStatus(req.db, userId, orderId, status);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error)
  }
}

export const removeDeliveredBooks = async (req, res, next) => {
  try {
    const { userId, orderId } = req.params;
    const result = await userModel.removeDeliveredBooks(req.db, userId, orderId);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export const editProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userModel.editProfile(req.db, userId, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next();
  }
}
