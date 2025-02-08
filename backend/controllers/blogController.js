const Blog = require('../models/Blog')
const Comment = require('../models/Comments')
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
        console.log("Error savinf image: ", error)
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
        console.log("Error saving blog: ", error)
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
        console.log("error in updating profile ", error)
        return res.status(500).json({ message: error.message })
    }
}

exports.deleteBlog = async (req, res) => {
    const { user_id, blog_id } = req.body
    const doc = req.file
    if (!user_id || !blog_id) {
        return res.status(400).json({ message: "Need user id and blog id" })
    }

    let result;
    try {
        const blog = await Blog.findById(blog_id)
        if (doc) {
            result = await deleteOnCloudinary(blog.public_id)
        }
        await Blog.deleteOne({ _id: blog_id })
        const updateUser = await User.findByIdAndUpdate(user_id,
            { $pull: { blogs: blog_id }, },
            { new: true, useFindAndModify: false }
        )

        return res.status(200).json({ message: "Blog deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}


exports.getBlogs = async (req, res) => {
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)
    try {
        const totalBlogs = await Blog.countDocuments()
        const totalPages = Math.ceil(totalBlogs / pageSize)
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('owner', 'username email firstname lastname profileUrl')
        return res.status(200).json({ blogs, totalPages, totalBlogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

exports.getOneBlog = async (req, res) => {
    const _id = req.query._id
    try {
        // const comments = Comment.find().populate('user')
        // console.log(comments);

        const blogData = await Blog.findById(_id)
            .populate('owner', 'username email firstname lastname profileUrl blogs')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username _id profileUrl'
                },
            })
        return res.status(200).json({ blogData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}


exports.updateLike = async (req, res) => {
    const user_id = req.query.user_id
    const blog_id = req.query.blog_id
    try {
        // const comments = Comment.find().populate('user')
        // console.log(comments);

        const blogData = await Blog.findById(blog_id)
        if (blogData.likes.includes(user_id)) {
            const updateBlog = await Blog.findByIdAndUpdate(blog_id,
                { $pull: { likes: user_id }, },
                { new: true, useFindAndModify: false }
            )
            console.log(updateBlog)
        } else {
            const updateBlog = await Blog.findByIdAndUpdate(blog_id,
                { $push: { likes: user_id }, },
                { new: true, useFindAndModify: false }
            )
            console.log(updateBlog)
        }
        return res.status(200).json({ message: "like updated successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}


exports.addComment = async (req, res) => {
    const { blog_id, user_id, content } = req.body;
    console.log(req.body)

    try {
        const newComment = new Comment({
            content,
            author: user_id
        });

        const savedComment = await newComment.save();
        const updatedBlog = await Blog.findByIdAndUpdate(
            blog_id,
            { $push: { comments: savedComment._id } },
            { new: true, useFindAndModify: false }
        );

        return res.status(200).json({ message: "Comment added successfully", updatedBlog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { blog_id, comment_id } = req.body;
    try {
        await Comment.findByIdAndDelete(comment_id);
        const updatedBlog = await Blog.findByIdAndUpdate(
            blog_id,
            { $pull: { comments: comment_id } },
            { new: true, useFindAndModify: false }
        );

        return res.status(200).json({ message: "Comment deleted successfully", updatedBlog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getUserContributions = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate('blogs'); // Populate the blogs

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const contributions = Array(365).fill(0); // Initialize the array with 0s

        if (user.blogs && user.blogs.length > 0) {
            user.blogs.forEach(blog => {
                const createdAt = new Date(blog.createdAt);
                const startOfYear = new Date(createdAt.getFullYear(), 0, 1); // Get the start of the year
                const diffInDays = Math.floor((createdAt - startOfYear) / (1000 * 60 * 60 * 24));

                if (diffInDays >= 0 && diffInDays < 365) { // Ensure within the year
                    contributions[diffInDays]++;
                }
            });
        }

        res.status(200).json(contributions); // Send the contributions array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' + error });
    }
}