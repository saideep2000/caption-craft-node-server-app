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

export const followedUsers = async (userId) => {
  try {
      // Find the current user
      const user = await model.findById(userId).lean();

      if (!user) {
          throw new Error('User not found');
      }

      // Retrieve the list of user IDs that the current user is following
      const userFollowingIds = user.following.map(followingId => followingId.toString());

      // Fetch the details of each followed user
      const followedPeople = await Promise.all(
        userFollowingIds.map(async (id) => {
          const followedUser = await model.findById(id).lean();
          return {
            ...followedUser,
            name: `${followedUser.firstname} ${followedUser.lastname}` // Constructing the full name
          };
        })
      );

      return followedPeople;
  } catch (error) {
      console.error("Error in followedUsers:", error);
      throw error; // or handle the error as needed
  }
}



export const followUser = async (userId, frndId) => {
  try {
    // Assuming 'model' is your user model, similar to Mongoose models in MongoDB
    const user = await model.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Check if the user is already following the friend
    const isAlreadyFollowing = user.following.some(id => id.toString() === frndId);
    
    if (isAlreadyFollowing) {
      throw new Error('User is already following this friend');
    }

    // Add frndId to the user's following list
    user.following.push(frndId);

    // Save the updated user
    await user.save();

    // Fetch the updated list of followed users
    const updatedFollowingList = await Promise.all(
      user.following.map(async (id) => {
        const followedUser = await model.findById(id).lean();
        return {
          ...followedUser,
          name: `${followedUser.firstname} ${followedUser.lastname}`
        };
      })
    );

    return updatedFollowingList;
  } catch (error) {
      console.error("Error in following the User:", error);
      throw error;
  }
}





