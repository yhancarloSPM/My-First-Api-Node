const User = require("../models/users");
const response = require("../utils/response");
const { isValidObjectId } = require("../utils/validateObjectId");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id))
      response.badRequest(req, res, 400, `UserId: [${id}] is not valid`);
    else {
      const oneUser = await User.findById(id);
      oneUser === null || oneUser.length === 0
        ? response.notFound(req, res, 404, "User not found")
        : res.status(200).json(oneUser);
    }
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const newUser = new User({
    name,
    lastname,
    email,
    password,
  });

  try {
    await newUser.save();
    response.success(req, res, 201, "User Created Successfull");
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      response.badRequest(req, res, 400, `UserId: [${id}] is not valid`);
    } else {
      const { name, lastname, email, password } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        { $set: { name, lastname, email, password } },
        { new: true }
      );

      !user
        ? response.notFound(req, res, 404, "User not found")
        : response.success(req, res, 200, "User was updated successfull");
    }
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      response.badRequest(req, res, 400, `UserId: [${id}] is not valid`);
    } else {
      const user = await User.findByIdAndDelete(id);
      !user
        ? response.notFound(req, res, 404, "User not found")
        : response.success(req, res, 200, "User was deleted successfull");
    }
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await User.find({ name: req.body.name });
    user.length === 0
      ? response.notFound(req, res, 404, "User not found")
      : res.status(200).json({ user });
  } catch (error) {
    response.error(req, res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  getUserByName,
};
