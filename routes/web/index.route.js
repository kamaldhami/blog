var express = require('express')
const indexRouter = express.Router();
const userRouter = require('./user.route');
const blogRouter = require('./blog.route');

indexRouter.use('/user', userRouter);
indexRouter.use('/blog',blogRouter)

module.exports = indexRouter;