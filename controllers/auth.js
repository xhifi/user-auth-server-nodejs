import User from "../models/User.js";
import { StatusCodes as Status } from "http-status-codes";
import { BadRequestError, NotFoundError, AuthError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { firstName, lastName, userName, email, password, role } = req.body; // destruct request body

  if (!userName || !email || !password || !firstName || !role) throw new BadRequestError("Please provide all required values"); // Check if all required inputs exist in request body

  const userExists = await User.findOne({ email, userName }); // Check if the user with same username or email already exists in the Database
  if (userExists) throw new BadRequestError(`${email} ${userName} already exists`);

  const user = await User.create(req.body); // Create User Document in Database
  const token = user && user.createJWT(); // Invoke JWT middleware from User model

  res.status(Status.CREATED).json({ user: { username: userName, email, role }, token });
};

const login = async (req, res) => {
  const { password, userName } = req.body;
  if (!password || !userName) throw new BadRequestError("Please proved the required values: Username and Password"); // Check if username and password are provided by the user in request body

  const user = await User.findOne({ userName }).select("+ password"); // !!IMPORTANT!! Since password was specifically requested in the model to be "non-selectable", it has to be reincluded in the query manually on demand so the password can be successfully compared
  if (!user) throw new NotFoundError("Invalid Credentials");

  const isAuthenticated = await user.comparePassword(password); // Invoke compare password middleware from User Model
  if (!isAuthenticated) throw new AuthError("Invalid Credentials");

  const token = user && user.createJWT(); // Create the JWT token for the user from the user model
  user.password = undefined; // Just to not send the password hash in the response to the user's request

  res.status(Status.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  res.status(200).send("Update Route");
};
const deleteUser = async (req, res) => {
  res.status(200).send("Delete Route");
};

export { register, login, updateUser, deleteUser };
