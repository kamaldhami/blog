const {
    addBlogService, deleteBlogService, listBlog, ServicePatchBlog, addBlogCommentService, searchBlog
} = require('../services/blog-service');


const add = async (req, res) => {
    const response = await addBlogService(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });
}

const remove = async (req, res) => {
    const {
        id
    } = req.params;

    await deleteBlogService({
        _id: id
    });

    res.status(200).json({
        message: "success"
    });
}

const update = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        title,
        content,
        images,
        videos
    } = req.body;

    const response = await ServicePatchBlog({
        id,
        title,
        content,
        images,
        videos
    });

    res.status(200).json({
        message: "success",
    });
}

const list = async (req, res) => {

    const {
        q,
        p,
        s,
        o,
        l
    } = req.body;

    const response = await listBlog({
        query: q || {},
        project: p || {},
        sort: s || {},
        skip: o || 0,
        limit: l || 10
    });

    res.status(200).json({
        message: "success",
        data: response
    });

}

const addComment = async (req, res) => {
    const response = await addBlogCommentService(
        req.body
    );
    res.status(201).json({
        message: "success",
        data: response
    });
}

const search = async (req, res) => {
    const search = req.body

    const response = await searchBlog(search)

    res.status(200).json({
        message: "success",
        data: response
    });

}

module.exports = {
    add, remove, update, list, addComment, search
}