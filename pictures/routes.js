import * as dao from "./dao.js";

let currentUser = null;
function PictureRoutes(app) {

  const fetchFeed = async (req, res) => {
    const userId = req.body;
    const feed = await dao.findFeedForUser(userId);
    res.json(feed);
  };

  const fetchAll = async (req, res) => {
    const pictures = await dao.findAllPictures();
    res.json(pictures);
  };

  
  app.post("/pictures/UserFeed", fetchFeed);
  app.get("/pictures/all", fetchAll);
}
export default PictureRoutes;