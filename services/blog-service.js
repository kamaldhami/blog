const { tryCatchHandler } = require("../helpers/error-handler");
const { DbAddBlog,
    DbFindBlog,
    DbUpdateBlog,
    DbDeleteBlog,
    DbCountBlog,
    DbSearch
} = require('../model/Blog')

const { default: mongoose } = require("mongoose");

const addBlogService = tryCatchHandler(async (body) => {
    let blog = await DbAddBlog(body);

    return {
        record: blog
    }
});

const deleteBlogService = tryCatchHandler(async (body) => {
    await DbDeleteBlog({ query: { _id: mongoose.Types.ObjectId(body._id) } });

    return;
})

const ServicePatchBlog = tryCatchHandler(async (body) => {

    const {
        id,
        title,
        content,
        images,
        videos
    } = body;
    const response = await DbUpdateBlog({
        query: {
            _id: mongoose.Types.ObjectId(id),
        },
        update: {
            $set: {
                title,
                content,
                images,
                videos
            },
        },
    });
    return response;

})

const listBlog = tryCatchHandler(async (body) => {

    const totalRecords = await DbCountBlog({
        query: body.query,
    });
    let records = [];

    if (totalRecords) {
        records = await DbFindBlog({
            query: body.query,
            sort: body.sort,
            project: body.project,
            limit: body.limit,
            skip: body.skip,
            multiple: true,
        });
    }

    return {
        records,
        totalRecords,
    };

})

const addBlogCommentService = tryCatchHandler(async (body) => {
    const {
        id,
        comment
    } = body;
    const response = await DbUpdateBlog({
        query: {
            _id: mongoose.Types.ObjectId(id),
        },
        update: {
            $push: {
                comment
            },
        },
    });
    return response;
})

const searchBlog = tryCatchHandler(async (body) => {

    const query = { $text: { $search: body.search } };
    records = await DbSearch({ query: query });

    return {
        records
    };

})

module.exports = {
    addBlogService,
    deleteBlogService,
    ServicePatchBlog,
    listBlog,
    addBlogCommentService,
    searchBlog
}