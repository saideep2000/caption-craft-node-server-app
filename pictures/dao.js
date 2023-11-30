import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';
import userModel from "../users/model.js"

export const createUser = (picture) => {
    picture._id = uuidv4();
    return model.create(picture);
}
    


export const findFeedForUser = async (userId) => {
    try {
        // First, find the user to get their 'following' list
        const user = await userModel.findById(userId).lean();
        if (!user) {
            return []; // or handle the error as appropriate
        }

        // Extract the IDs of users that this user is following
        const followingUserIds = user.following;

        // Then, find all pictures posted by users that this user is following
        const feedPictures = await pictureModel.find({
            postedBy: { $in: followingUserIds },
            public: true
        }).lean();

        // Deduplicate pictures
        const uniqueFeedPictures = Array.from(new Set(feedPictures.map(p => p._id.toString())))
            .map(id => feedPictures.find(p => p._id.toString() === id));

        return uniqueFeedPictures;
    } catch (error) {
        console.error("Error in findFeedForUser:", error);
        throw error; // or handle the error as needed
    }
}

export const findAllPictures = () => model.find();

export const findUserById = (pictureId) => model.findById(pictureId);

// export const findUserByUsername = (username) =>
//   model.findOne({ username: username });

// export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

// export const updatePicture = (userId, user) =>
//   model.updateOne({ _id: userId }, { $set: user });
  
export const deletePicture = (pictureId) => model.deleteOne({ _id: pictureId });