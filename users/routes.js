import * as dao from "./dao.js";

let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser
    res.json(status);
  };

  

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser
    res.json(currentUser);
  };

  const account = async (req, res) => {
    if (req.session['currentUser']){
      const posts = await dao.findPosts(req.session['currentUser']._id)
      res.json(posts);
    }
  };


  const login = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser
    res.json(currentUser);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);

    if (user) {
      const message = "Username already taken"
      res.status(400).json({message});
    }
    else{
      const currentUser = await dao.createUser(req.body);
      req.session['currentUser'] = currentUser
      res.json(currentUser);
    }
    
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const suggestedUsers = async (req, res) => {

    // currentUser = req.session['currentUser']
    // console.log(currentUser)

    const body = req.body;
    const userId = body._id
    if (userId === undefined || userId === null || !userId){
      const message = "You are not sending valid userId"
      res.status(400).json({message});
    }
    else{
      const suggestPeople = await dao.suggestedUsers(userId);
      // return with sugested people as json format
      res.json(suggestPeople);
    }

    // currentUser = req.session['currentUser']
    // const suggestPeople = await dao.suggestedUsers();
    // res.json(suggestPeople);
  };


  const followedUsers = async (req, res) => {

    const body = req.body;
    const userId = body._id
    if (userId === undefined || userId === null || !userId){
      const message = "You are not sending valid userId"
      res.status(400).json({message});
    }
    else{
      const followedPeople = await dao.followedUsers(userId);
      // return with sugested people as json format
      res.json(followedPeople);
    }
  };

  const followUser = async (req, res) => {

    // currentUser = req.session['currentUser']
    // console.log(currentUser)

    const body = req.body;
    const userId = body._id
    const frndId = body.frndId
    if (userId === undefined || userId === null || !userId){
      const message = "You are not sending valid userId"
      res.status(400).json({message});
    }
    else{
      const followingPeople = await dao.followUser(userId, frndId);
      // return with sugested people as json format
      res.json(followingPeople);
    }

    // currentUser = req.session['currentUser']
    // const suggestPeople = await dao.suggestedUsers();
    // res.json(suggestPeople);
  };


  // app.post("/api/users", createUser);
  // app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  
  app.post("/api/users/signin", signin);
  // app.post("/api/users/signout", signout);
  // app.post("/api/users/account", account);

  app.post("/users/login", login);
  app.get("/users/all", findAllUsers);
  app.post("/users/signup", signup);
  app.get("/users/fetchAccount", account);
  app.post("/users/signout", signout);
  app.post("/users/suggestedUsers", suggestedUsers);
  app.post("/users/followedUsers", followedUsers);
  app.post("/users/followUser", followUser);

  // Credentials:
  // user101
  // hashed_password1

}
export default UserRoutes;