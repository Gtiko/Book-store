// const { ObjectId } = require("mongodb");
import { ObjectId } from 'mongodb';

class Users {
  static async createUser(db, newUser) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .insertOne(newUser);
    } catch (error) {
      return error;
    }
  }

  static async getUsers(db) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .find({})
        .toArray();
    } catch (error) {
      return error;
    }
  }

  // static async getAllUsers(db){
  //   try {
  //     return await db.collection(process.env.USERS_COLLECTION_NAME).find({}).toArray()
  //   } catch (error) {
  //     return error
  //   }
  // }

  static async getUserById(db, userId) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .findOne({ _id: new ObjectId(userId) });
    } catch (error) {
      return error;
    }
  }
  static async getUserByUsername(db, username) {
    try {
      const user = await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .findOne({ username });

      if (user && user._id instanceof ObjectId) {
        user._id = user._id.toString();
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  static async updateUser(db, userId, updatedUser) {
    try {
      return await db.collection(process.env.USERS_COLLECTION_NAME).updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            fName: updatedUser.fName,
            lName: updatedUser.lName,
            username: updatedUser.username,
            password: updatedUser.password,
            role: updatedUser.role,
          },
        }
      );
    } catch (error) {
      return error;
    }
  }

  static async deleteUser(db, userId) {
    try {
      console.log(userId)
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .deleteOne({ _id: new ObjectId(userId) });
    } catch (error) {
      return error;
    }
  }

  static async addToCart(db, userId, bookId) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .updateOne({ _id: new ObjectId(userId) }, { $push: { cart: bookId } });
    } catch (error) {
      return error;
    }
  }

  static async removeFromCart(db, userId, bookId) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { cart: { bookId: bookId } } }
        );
    } catch (error) {
      return error;
    }
  }

  static async addToFavorites(db, userId, bookId) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $push: { favorites: bookId } }
        );
    } catch (error) {
      return error;
    }
  }

  static async removeFromFavorites(db, userId, bookId) {
    try {
      return await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { favorites: { bookId: bookId } } }
        );
    } catch (error) {
      return error;
    }
  }

  static async sendCheckoutStatus(db, userId, cart) {
    try {
      const newRequest = { userId: userId, items: cart };
      const result = await db
        .collection(process.env.USERS_COLLECTION_NAME)
        .updateMany({ role: "admin" }, { $push: { requests: newRequest } });
      if (result.modifiedCount != 0) {
        let rst = await db
          .collection(process.env.USERS_COLLECTION_NAME)
          .updateOne({ _id: new ObjectId(userId) }, { $set: { cart: [] } });
        return rst
      }
      // return result;
    } catch (error) {
      return error;
    }
  }

  static async approveCheckoutRequest(db, userId, ISBN) {
    try {
      const result = await db
      .collection(process.env.USERS_COLLECTION_NAME)
      .updateMany(
        { role: "admin", "requests.userId": userId },
        { $pull: { "requests.$[r].items": { ISBN: ISBN } } },
        { arrayFilters: [{ "r.userId": userId }] }
      );
    
      if (result.modifiedCount != 0) {

console.log("result", result.modifiedCount);

       let x =  await db
          .collection(process.env.BOOKS_COLLECTION_NAME)
          .updateOne({ ISBN: ISBN }, { $inc: { available: - Number(result.modifiedCount) } });

console.log("x", x);
        const bookDetail = await db.collection(process.env.BOOKS_COLLECTION_NAME).findOne(
          { ISBN: ISBN }
        )
       let y =  await db.collection(process.env.USERS_COLLECTION_NAME).updateOne(
          { _id: new ObjectId(userId) },
          {
            $push: {
              orderStatus:
              {
                orderId: new ObjectId(),
                deliveryStatus: "In Transit",
                bookId: bookDetail._id
              }
            }
          }
        )
console.log("y", y)
      }
      let rst = await db.collection(process.env.USERS_COLLECTION_NAME).updateMany(
        { role: 'admin', 'requests.items': { $size: 0 } },
        { $pull: { 'requests': { items: { $size: 0 } } } }
      )
        console.log("rst", rst)
      return rst;

    } catch (error) {
console.log(error);
      return error;
    }
  }

  static async updateDeliveryStatus(db, userId, orderId, status) {
    try {
      return await db.collection(process.env.USERS_COLLECTION_NAME).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { "orderStatus.$[o].deliveryStatus": status } },
        { arrayFilters: [{ "o.orderId": new ObjectId(orderId) }] }
      )
    } catch (error) {
      return error;
    }
  }

  static async removeDeliveredBooks(db, userId, orderId) {
    try {
      // console.log(userId, orderId);
      const result = await db.collection(process.env.USERS_COLLECTION_NAME).updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { "orderStatus": { orderId: new ObjectId(orderId) } } }
      );
  
      return result;
    } catch (error) {
      return error;
    }
  }

  static async editProfile(db, userId, updatedProfile) {
    try {
      return await db.collection(process.env.USERS_COLLECTION_NAME).updateOne(
        {_id: new ObjectId(userId)},
        {$set: updatedProfile}
      )
    } catch (error) {
      return error;
    }
  }
  
}

// module.exports = Users;
export default Users;
