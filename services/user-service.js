const { tryCatchHandler } = require("../helpers/error-handler");
const {
  DbAddUser,
  DbFindUser,
} = require("../model/User");
const bcrypt = require('bcrypt')
const { USER_NOT_EXIST,
  INCORRECT_PASSWORD, } = require('../constants/messages')
const { generateToken } = require("../config/jwt.config");

const addUserService = tryCatchHandler(async (body) => {

  body.password = await bcrypt.hash(body.password, 10);
  let user = await DbAddUser(body);

  return {
    record: user
  }
});

const getUserList = tryCatchHandler(async (body) => {
  
  let query = { email: body.email };

  let user = {};

  user = await DbFindUser({
    multiple: false,
    query: query,
    project: {
      _id: 1,
      email: 1,
      password:1
    },
  });

  if (!user) {
    throw new Error(USER_NOT_EXIST);
  } else {
    
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (passwordMatch) {
      const token = await generateToken(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return {
        token: token,
        record: {
          _id: user._id,
          email: user.email
        },
      };
    } else {
      throw new Error(INCORRECT_PASSWORD);
    }

  }


});


module.exports = {
  addUserService,
  getUserList
};
