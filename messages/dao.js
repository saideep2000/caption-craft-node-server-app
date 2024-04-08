import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';
import userModel from "../users/model.js"

export const createMessage = (message) => {
    message._id = uuidv4();
    return model.create(message);
}


export const findMessagesForUser = async (userId, friendId) => {
    try {
        // Find messages where the conversation is between the user and the friend
        // and sort them by timestamp in ascending order (oldest to newest)
        const userMessages = await model.find({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 }).exec(); // 1 for ascending order

        return userMessages;
    } catch (error) {
        console.error("Error in findMessagesForUser:", error);
        throw error; // or handle the error as needed
    }
}

export const findListForUser = async (userId) => {
    try {
        // Ensure userId is a string
        const userIdString = userId.toString();

        // First, find all messages involving the given userId
        const messages = await model.find({
            $or: [{ senderId: userIdString }, { receiverId: userIdString }]
        }, 'senderId receiverId -_id').exec();

        // Extract unique user IDs, excluding the userId itself
        const uniqueUserIds = new Set();
        messages.forEach(message => {
            // Add senderId if it's not the userId
            if (message.senderId !== userIdString) uniqueUserIds.add(message.senderId);
            // Add receiverId if it's not the userId
            if (message.receiverId !== userIdString) uniqueUserIds.add(message.receiverId);
        });

        // Fetch user information for each unique user ID
        const userDocs = await userModel.find({
            _id: { $in: Array.from(uniqueUserIds) }
        }).exec();

        // Map the user documents to exclude the user's own profile
        const users = userDocs.filter(user => user._id.toString() !== userIdString);

        return users; // This will be an array of user documents, excluding the userId itself
    } catch (error) {
        console.error("Error in findListForUser:", error);
        throw error;
    }
}



export const addMessageForUser = async (userId, friendId, messageContent) => {
    try {
        // Create a new message document
        const newMessage = new model({
            _id: uuidv4(), // Generate a new ObjectId
            senderId: userId,
            receiverId: friendId,
            timestamp: new Date().toISOString(), // Use the current time in ISO format
            messageContent: messageContent,
            isRead: false, // Default to false
            attachments: [] // Assuming no attachments for now
        });

        // Save the new message document to the database
        const savedMessage = await newMessage.save();

        return savedMessage;
    } catch (error) {
        console.error("Error in addMessageForUser:", error);
        throw error;
    }
}









