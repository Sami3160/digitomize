const Blog = require('../models/Blog')
const User = require('../models/User')
const { uploadOnCloudinary, deleteOnCloudinary } = require('./cloudnary')


exports.createBlog = async (req, res) => {
    const { _id, title, content, category, tags } = req.body
    const doc = req.file
    if (!title || !content || !category || !tags || !_id) {
        return res.status(400).json({ message: "Please fill the form" })
    }

    try {
        let result;
        if (doc) {
            result = await uploadOnCloudinary(doc, 'thumbnail')
        }
        const newBlog = new Blog({
            title,
            content,
            category,
            tags,
            owner: _id,
            thumbnailUrl: result?.url,
            public_id: result?.public_id
        })

        const updateUser = await User.findByIdAndUpdate(_id,
            { $push: { blogs: newBlog._id }, },
            { new: true, useFindAndModify: false }
        )

        if (!updateUser) return res.status(400).json({ message: "User not found" })
        return res.status(200).json({ message: "Blog created successfully", newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

exports.deleteBlog = async (req, res) => {
    const { user_id, blog_id } = req.body
    const doc = req.file
    if (!userId || !blog_id) {
        return res.status(400).json({ message: "Need user id and blog id" })
    }

    try {
        const blog = await Blog.findById(blog_id)
        let result;
        if (doc) {
            result = await deleteOnCloudinary(blog.public_id)
        }
        await Blog.deleteOne({ _id: blog_id })
        const updateUser = await User.findByIdAndUpdate(_id,
            { $pull: { blogs: newBlog._id }, },
            { new: true, useFindAndModify: false }
        )

        return res.status(200).json({ message: "Blog created successfully", newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

