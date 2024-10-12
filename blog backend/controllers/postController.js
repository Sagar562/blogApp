const Post = require('../models/postModels')

exports.createPost = async(req, res) => {

    try {
        const {user ,title, body} = req.body;
        const post = new Post({
            user,
            title,
            body
        });

        const savedPost = await post.save();

        res.status(200).json({
            post : savedPost,
            messagae : 'Post created'
        })
    }
    catch(error) {
        console.error(error)
        res.status(400).json({
            error : 'post not created'
        })
    }
}

exports.getAllPost = async(req, res) => {

    try {
        const post = await Post.find().populate('comments').exec();

        res.status(200).json({
            post,
        })
    }
    catch(error) {
        return res.status(500).json({
            message : 'error while fetching data'
        })
    }

}