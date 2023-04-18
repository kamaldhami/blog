const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: { type: String },
    content: { type: String },
    images: { type: String },
    videos: { type: String },
    comment: [{ type: String }]
}
    , {
        timestamps: true
    });

let Blog = null;

try {
    Blog = mongoose.model('blogs');
} catch (error) {
    Blog = mongoose.model('blogs', blogSchema);
}

const {
    tryCatchHandler
} = require('../helpers/error-handler');

const DbAddBlog = tryCatchHandler(async (body) => {
    const blog = new Blog(body);
    return await blog.save();
});

const DbFindBlog = tryCatchHandler(async (body) => {

    let {
        multiple,
        query,
        project,
        sort,
        limit,
        skip
    } = body;

    multiple = multiple || false;
    query = query || {};
    project = project || {};
    sort = sort || {};
    limit = limit || 0;
    skip = skip || 0;

    let records = [];

    if (multiple) {
        records = await Blog.find(query, project).sort(sort).skip(skip).limit(limit).lean();
    } else {
        records = await Blog.find(query, project).lean()
    }

    return records;
});

const DbUpdateBlog = tryCatchHandler(async (body) => {

    const {
        query,
        update,
        option,
        multiple
    } = body;


    let res = {};
    if (multiple) {
        res = await Blog.updateMany(query, update, option);
    } else {
        res = await Blog.updateOne(query, update, option);
    }

    return res
});

const DbCountBlog = tryCatchHandler(async (body) => {

    const {
        query,
    } = body;

    const res = await Blog.count(query).lean();

    return res;
});

const DbDeleteBlog = tryCatchHandler(async (body) => {

    const {
        query,
    } = body;

    const res = await Blog.deleteOne(query);

    return res;
});

const DbSearch = tryCatchHandler(async(body) =>{
    const {
        query,
    } = body;

    const res = await Blog.find(query).lean();

    return res;
});

module.exports = {
    DbAddBlog,
    DbFindBlog,
    DbUpdateBlog,
    DbCountBlog,
    DbDeleteBlog,
    DbSearch
};