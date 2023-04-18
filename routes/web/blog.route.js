var express = require('express')
const blogRouter = express.Router();

const { asyncHandler } = require('../../helpers/error-handler');
const { checkToken } = require('../../config/jwt.config')
const { add, remove, update, list, addComment, search } = require('../../controllers/blog-ctrl');
const upload = require('../../helpers/multer');

blogRouter.post('/', asyncHandler(checkToken), asyncHandler(add));
blogRouter.delete('/:id', asyncHandler(checkToken), asyncHandler(remove));
blogRouter.patch('/:id', asyncHandler(checkToken), asyncHandler(update))
blogRouter.post('/list', asyncHandler(checkToken), asyncHandler(list))
blogRouter.post('/addcomment', asyncHandler(checkToken), asyncHandler(addComment))
blogRouter.post('/search', asyncHandler(checkToken), asyncHandler(search))
blogRouter.post('/upload', asyncHandler(checkToken), asyncHandler(upload.single('file')), (req, res) => {
    res.status(201).json({
        message: "success",
        data: req.file
    });
});

module.exports = blogRouter;