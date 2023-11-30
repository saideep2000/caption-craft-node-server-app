import * as dao from "./dao.js";

let currentUser = null;
function PictureRoutes(app) {

  const fetchFeed = async (req, res) => {
    const body = req.body;
    const feed = await dao.findFeedForUser(body["userId"]);
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

  
  app.get("/pictures/UserFeed", fetchFeed);
  app.get("/pictures/all", fetchAll);
  app.post("/pictures/like", postLike);

}
export default PictureRoutes;