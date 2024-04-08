// import * as dao from "./dao.js";
// import superagent from "superagent";

function VideoCallingRoutes(app) {
    const videoCallUser = async (req, res) => {
        const body = req.body;
        const userId = body.userId
        const friendId = body.friendId
        if (userId === undefined || userId === null || !userId || friendId === undefined || friendId === null || !friendId || userId === friendId){
        const message = "You are not sending valid Ids"
        res.status(400).json({message});
        }
        const message = "Video calling your friend"
        res.status(200).json({message});
        // res.status(200);

    }
app.post("/videocall/videoCallUser", videoCallUser);

}

export default VideoCallingRoutes;