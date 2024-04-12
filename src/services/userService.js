const { getUserIdFromToken } = require("../config/jwtprovider");
const User = require("../models/user.model");
const bcrypt = require('bcrypt')

const creatUser = async (userData) => {
  
  try {
    let {fullName, email, password, role } = userData;
    const isuserExist = await User.findOne({ email: email });

    if (isuserExist) {
      throw new Error("User already exists with email");
    }

    password = await bcrypt.hash(password, 8);

    const user = new User({
      fullName: fullName,
      email: email,
      password: password,
      role,
    });

    console.log("Model",user)
    await user.save();
    return user;


    
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("addresses");
    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserProfileByjwt = async (jwt) => {
    try {
        const userId = getUserIdFromToken(jwt);
        const user = await User.findUserById(userId);

        return user;

    } catch (error) {
        throw new Error(error.message)
        
    }
}

const findAllUsers = async () => {
    try {
        const users=await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);        
    }
}

module.exports = {creatUser,getUserByEmail,findUserById,findUserProfileByjwt,findAllUsers}