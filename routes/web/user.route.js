var express = require('express')
const userRouter = express.Router();

const { asyncHandler } = require('../../helpers/error-handler');
const { add, login } = require('../../controllers/user-ctrl');

userRouter.post('/registration', asyncHandler(add));
userRouter.post('/login', asyncHandler(login));

module.exports = userRouter;