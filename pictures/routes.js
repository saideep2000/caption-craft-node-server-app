import * as dao from "./dao.js";

let currentUser = null;
function PictureRoutes(app) {

  const fetchFeed = async (req, res) => {
    const body = req.body;
    const userId = body["userId"]
    if (userId === undefined || userId === null){
      const message = "You are not sending valid userId"
      res.status(400).json({message});
    }
    const feed = await dao.findFeedForUser(userId);
    res.json(feed);
  };

  const fetchAll = async (req, res) => {
    const pictures = await dao.findAllPictures();
    res.json(pictures);
  };

  const postLike = async (req, res) => {
    const body = req.body;
    const pictures = await dao.likePost(body["userId"], body["pictureId"]);
    res.json(pictures);
  };

  
  app.post("/pictures/UserFeed", fetchFeed);
  app.get("/pictures/all", fetchAll);
  app.post("/pictures/like", postLike);

}
export default PictureRoutes;