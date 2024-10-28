const Blog = require('../models/Blog')
const User = require('../models/User')
const { uploadOnCloudinary, deleteOnCloudinary } = require('./cloudnary')


exports.createBlog = async (req, res) => {
    const { _id, title, content, category, tags } = req.body
    const doc = req.file
    console.log(req.body)
    console.log(req.file)
    if (!title || !content || !category || !_id) {
        return res.status(403).json({ message: "Please fill the form" })
    }
    let data = {}
    if (title) data.title = title
    if (content) data.content = content
    if (category) data.category = category
    if (tags) data.tags = tags


    let result;
    try {

        if (doc) {
            result = await uploadOnCloudinary(doc.path, 'thumbnail')
            if (result) {
                data.thumbnailUrl = result.url
                data.public_id = result.public_id
            }
        }
        console.log("image result: ", result)


    } catch (error) {
        console.log("Error savinf image: ",error)
        return res.status(500).json({ message: error.message })

    }
    let newBlog;
    try {
        newBlog = new Blog({
            ...data,
            owner: _id,
        })
        await newBlog.save()
        console.log("blog result: ", newBlog)
    } catch (error) {
        console.log("Error saving blog: ",error)
        return res.status(500).json({ message: error.message })
    }



    try {

        const updateUser = await User.findByIdAndUpdate(_id,
            { $push: { blogs: newBlog._id }, },
            { new: true, useFindAndModify: false }
        )

        console.log("updateUser result: ", updateUser)

        if (!updateUser) return res.status(400).json({ message: "User not found" })
        return res.status(200).json({ message: "Blog created successfully", newBlog })

    } catch (error) {
        console.log("error in updating profile ",error)
        return res.status(500).json({ message: error.message })
    }
}

exports.deleteBlog = async (req, res) => {
    const { user_id, blog_id } = req.body
    const doc = req.file
    if (!userId || !blog_id) {
        return res.status(400).json({ message: "Need user id and blog id" })
    }

    let result;
    try {
        const blog = await Blog.findById(blog_id)
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

