import * as dao from "./dao.js";
import superagent from "superagent";

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

  // const generateImage = async (req, res) => {
  //   const body = req.body;
  //   console.log(body)
  //   if(!body.prompt) {
  //     const message = "Invalid prompt"
  //     return res.status(400).json({message});
  //   }
    // const agent = superagent.agent();
    // const generateImageAPI = "http://localhost:8000/generate";
    // const response = await agent.post(generateImageAPI).set('Content-Type', 'application/json').send(body);
    // const response =  {
    //   // "image": "data:image/png;base64,ij"
    // }
    // res.json(response);
  // };

  
  const fetchModelResult = async (inputText, retryAfter = 0) => {
    const apiURL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";
    const API_KEY = "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";

    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000)); // Wait if needed before retrying

    const response = await fetch(apiURL, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: inputText }), // Adjusted to match the successful payload structure
    });

    if (!response.ok) {
        const errorBody = await response.json();
        if (errorBody.error && errorBody.estimated_time) {
            // Recursive call with the new estimated wait time
            return fetchModelResult(inputText, errorBody.estimated_time);
        }
        throw new Error(`API call failed: ${errorBody.error || "Unknown error"}`);
    }

    return response.blob();
};

const generateImage = async (req, res) => {
    try {
        const { body } = req;

        // Ensure the inputs is a string
        if (!body || typeof body.inputs !== 'string') {
            return res.status(400).json({ message: "Invalid input. Input must be a string." });
        }

        // Fetch model result with adjusted input key
        const resultBlob = await fetchModelResult(body.inputs);

        const imageBuffer = await resultBlob.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');

        console.log(resultBlob)

        res.json({ image: `data:image/jpeg;base64,${imageBase64}` });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ message: "Failed to generate image. " + error.message });
    }
};







  
  app.post("/pictures/UserFeed", fetchFeed);
  app.get("/pictures/all", fetchAll);
  app.post("/pictures/like", postLike);
  app.post("/pictures/comment", postComment);
  app.post("/pictures/delete", postDelete)
  app.post("/pictures/generateImage", generateImage)
}
export default PictureRoutes;