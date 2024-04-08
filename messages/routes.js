import * as dao from "./dao.js";
import superagent from "superagent";

function MessageRoutes(app) {

    const fetchMessages = async (req, res) => {
        const body = req.body;
        const userId = body.userId
        const friendId = body.friendId
        if (userId === undefined || userId === null || !userId || friendId === undefined || friendId === null || !friendId){
          const message = "You are not sending valid userId"
          res.status(400).json({message});
        }
        const messages = await dao.findMessagesForUser(userId, friendId);
        // return with all the pictures in the json format.
        res.json(messages);
    };


    const fetchList = async (req, res) => {
        const body = req.body;
        const userId = body.userId
        if (userId === undefined || userId === null || !userId){
          const message = "You are not sending valid userId"
          res.status(400).json({message});
        }
        const list = await dao.findListForUser(userId);
        // return with all the pictures in the json format.
        res.json(list);
    };


    const addMessage = async (req, res) => {
      const body = req.body;
      const userId = body.userId
      const friendId = body.friendId
      const message = body.message
      if (userId === undefined || userId === null || !userId || friendId === undefined || friendId === null || !friendId){
        const message = "You are not sending valid Ids"
        res.status(400).json({message});
      }
      const data = await dao.addMessageForUser(userId, friendId, message);
      // return with all the pictures in the json format.
      res.json(data.status);
  };





    app.post("/messages/UserMessages", fetchMessages);
    app.post("/messages/UserFriendList", fetchList);
    app.post("/messages/AddUserMessage", addMessage);
    
}
export default MessageRoutes