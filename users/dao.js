import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';
import PictureModel from "././model.js"
import {findPostById} from "../pictures/dao.js";

export const createUser = (user) => {
    user._id = uuidv4();
    return model.create(user);
}
    
export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findPosts = (userId) => model.findById(userId).populate('PostedPictures');

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
  
export const deleteUser = (userId) => model.deleteOne({ _id: userId });


export const suggestedUsers = async (userId) => {
  try {
      // Find the current user
      const user = await model.findById(userId).lean();

      if (!user) {
          throw new Error('User not found');
      }

      // Get all users
      const allUsers = await model.find().lean();
      const userFollowing = user.following.map(followingId => followingId.toString());

      // Suggest users that the current user is not already following
      const suggestedPeople = allUsers
        .filter(otherUser => {
          return !userFollowing.includes(otherUser._id.toString()) && otherUser._id.toString() !== userId;
        })
        .map(otherUser => {
          // Add a full name property for each suggested user
          return {
            ...otherUser,
            name: `${otherUser.firstname} ${otherUser.lastname}`
          };
        });

      return suggestedPeople;
  } catch (error) {
      console.error("Error in suggestedUsers:", error);
      throw error; // or handle the error as needed
  }
}
