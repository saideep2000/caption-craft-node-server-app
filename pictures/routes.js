import * as dao from "./dao.js";

function PictureRoutes(app) {

  const fetchFeed = async (req, res) => {
    const body = req.body;
    const userId = body._id
    if (userId === undefined || userId === null || !userId){
      const message = "You are not sending valid userId"
      res.status(400).json({message});
    }
    const feed = await dao.findFeedForUser(userId);
    // return with all the pictures in the json format.
    res.json(feed);
  };

  const fetchAll = async (req, res) => {
    const pictures = await dao.findAllPictures();
    // return with all the pictures in the json format.
    res.json(pictures);
  };

  const postLike = async (req, res) => {
    const body = req.body;
    const pictureId = body._id
    if (pictureId === undefined || pictureId === null || !pictureId){
      const message = "You are not sending valid pictureId"
      res.status(400).json({message});
    }
    else{
      const pictures = await dao.likePost(pictureId);
      // return true or false value
      res.json(pictures);
    }
  };

  const postComment = async (req, res) => {
    const body = req.body;
    const pictureId = body._id
    const comment = body.comment
    if (pictureId === undefined || pictureId === null || !pictureId){
      const message = "You are not sending valid pictureId"
      return res.status(400).json({message});
    }
    if (comment === undefined || comment === null || !comment){
      const message = "You are not sending valid comment string"
      return res.status(400).json({message});
    }
    const pictures = await dao.commentPost(pictureId, comment);
    // return true or false value
    res.json(pictures);
  };

  const postDelete = async (req, res) => {
    const body = req.body;
    const pictureId = body._id
    console.log(body)
    if (pictureId === undefined || pictureId === null || !pictureId){
      const message = "You are not sending valid pictureId"
      return res.status(400).json({message});
    }
    const pictures = await dao.deletePost(pictureId);
    // return true or false value
    res.json(pictures);
  };

  
  app.post("/pictures/UserFeed", fetchFeed);
  app.get("/pictures/all", fetchAll);
  app.post("/pictures/like", postLike);
  app.post("/pictures/comment", postComment);
  app.post("/pictures/delete", postDelete)
}
export default PictureRoutes;