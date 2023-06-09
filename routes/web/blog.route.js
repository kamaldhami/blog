var express = require('express')
const blogRouter = express.Router();

const { asyncHandler } = require('../../helpers/error-handler');
const { checkToken } = require('../../config/jwt.config')
const { add, remove, update, list, addComment, search } = require('../../controllers/blog-ctrl');
const upload = require('../../helpers/multer');
const fs = require('fs').promises;

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

blogRouter.put('/removeImage', asyncHandler(checkToken), async (req, res) => {
    try {
        await fs.unlink(req.body.path);
        res.status(200).json({
            message: "success",
            data: req.files
        });
    } catch (err) {
        res.status(200).json({
            message: err,
        });
    }
});

module.exports = blogRouter;