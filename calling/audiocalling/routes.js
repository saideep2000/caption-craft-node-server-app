// import * as dao from "./dao.js";
// import superagent from "superagent";

function AudioCallingRoutes(app) {
    const audioCallUser = async (req, res) => {
        const body = req.body;
        const userId = body.userId;
        const friendId = body.friendId;
        if (userId === undefined || userId === null || !userId || friendId === undefined || friendId === null || !friendId || userId === friendId){
        const message = "You are not sending valid Ids"
        res.status(400).json({message});
        }
        const message = "Audio calling your friend"
        res.status(200).json({message});

    }
app.post("/audiocall/audioCallUser", audioCallUser);

}

export default AudioCallingRoutes;