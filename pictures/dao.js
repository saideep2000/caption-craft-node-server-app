import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';
import userModel from "../users/model.js"

export const createUser = (picture) => {
    picture._id = uuidv4();
    return model.create(picture);
}
    


export const findFeedForUser = async (userId) => {
    try {
        // Find the user to get their 'following' list
        const user = await userModel.findById(userId).lean();
        if (user === undefined) {
            return []; // or handle the error as appropriate
        }

        // Extract the IDs of users that this user is following
        const followingUserIds = user.following;

        // Find all pictures posted by users that this user is following
        let feedPictures = await model.find(
            {
                postedBy : followingUserIds
            }
        ).lean();



        // Deduplicate pictures
        feedPictures = Array.from(new Set(feedPictures.map(p => p._id.toString())))
            .map(id => feedPictures.find(p => p._id.toString() === id));

        // Enrich each picture with profilePicture and name of the poster
        for (let picture of feedPictures) {
            const poster = await userModel.findById(picture.postedBy).lean();
            console.log(poster)
            if (poster) {
                picture.posterProfilePicture = poster.profilePicture; // assuming 'profilePicture' field exists in user schema
                picture.posterName = poster.firstName + " " + poster.lastName; // Corrected the space between first and last name
            }
        }

        return feedPictures;
    } catch (error) {
        console.error("Error in findFeedForUser:", error);
        throw error; // or handle the error as needed
    }
}

export const findAllPictures = async () => {
    // model.find();
    try {
        // Find all pictures
        let allPictures = await model.find({}).lean();

        
        // Enrich each picture with profilePicture and name of the poster
        for (let picture of allPictures) {
            // console.log(picture.postedBy)
            
            const poster = await userModel.findById(picture.postedBy).lean();
            console.log(poster)
            if (poster) {
                picture.profilePicture = poster.profilePicture; // assuming 'profilePicture' field exists in user schema
                picture.username = poster.firstname + " " + poster.lastname;
            }
        }

        return allPictures;
    } catch (error) {
        console.error("Error in findAllPictures:", error);
        throw error; // or handle the error as needed
    }

}

export const findUserById = (pictureId) => model.findById(pictureId);

// export const findUserByUsername = (username) =>
//   model.findOne({ username: username });

// export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });

// export const updatePicture = (userId, user) =>
//   model.updateOne({ _id: userId }, { $set: user });
  
export const deletePicture = (pictureId) => model.deleteOne({ _id: pictureId });