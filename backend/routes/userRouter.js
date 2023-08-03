// const express = require("express");
// const router = express.Router();
// const middleware = require("../middleware/auth");
// const userController = require("../controllers/userController");

import express from 'express';
const router = express.Router();
import {existingUsers, login, validateAddBook, validateAdmin, validateFavoriteBook} from '../middleware/auth.js'
import {addToCart,addToFavorites,approveCheckoutRequest,createUser,deleteUser,editProfile,getUserById,getUsers,removeDeliveredBooks,removeFromCart,sendCheckoutStatus,signUp,updateDeliveryStatus,updateUser} from '../controllers/userController.js'

router.post("/signup", existingUsers, signUp);
router.post("/login", login);

router.get("/:userId", getUserById);

// add to cart
router.post("/:userId/addToCart", addToCart);

router.patch("/:userId/removeFromCart", removeFromCart);

router.post("/:userId/addToFavorites", validateFavoriteBook, addToFavorites);

// when the user checkout send request(pending) for the admin to be approved
// when approved reduce the quantity;
router.post("/:userId/checkout", sendCheckoutStatus);


router.patch("/:userId/updateDelivery/:orderId", updateDeliveryStatus);

router.delete("/:userId/removerDelivered/:orderId", removeDeliveredBooks);

router.post("/:userId/editProfile", editProfile);

router.delete("/:userId/deleteUser", deleteUser);

router.use(validateAdmin);

// router.get("/getAllUsers", getAllUsers);

router.patch("/approveRequest", approveCheckoutRequest);

router.post("/createUser", existingUsers, createUser);

router.get("/", getUsers);

router.patch("/updateUser/:userId", updateUser);


// module.exports = router;
export default router;
