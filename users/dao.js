import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (user) => {
    user._id = uuidv4();
    return model.create(user);
}
    
export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
  
export const deleteUser = (userId) => model.deleteOne({ _id: userId });