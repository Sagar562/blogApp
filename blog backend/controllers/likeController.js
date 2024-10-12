const Post = require('../models/postModels')
const Like = require('../models/likesModels')

exports.likePost = async (req , res) => {

    try {
        const {post, user} = req.body;
        const like = new Like({
            post,
            user
        }
        );
        const savedLike = await like.save();

        const updatedLike = await Post.findByIdAndUpdate(
            post,
            {$push : {likes : savedLike._id}},
            {new : true} 
        ).populate('likes').exec();
        

        res.status(200).json({
            like : savedLike,
            post : updatedLike,
            messsage : 'like updated'
        })
    }
    catch(error) {
        res.status(500).json({
            messagae : 'Not updated likes'
        })
    }
}
//unlike post
exports.unLikePost = async(req, res) => {

    try {
        const {post, like} = req.body;

        const deleteLike = await Like.findOneAndDelete({post:post, _id:like})

        const updateLikePost = await Post.findByIdAndUpdate(
            post,
            {$pull : {likes : deleteLike}},
            {new : true}
        ).populate('likes').exec();

        res.status(200).json({
            post : updateLikePost,
            message : 'like updated'
        })

    }
    catch(error) {
        return res.status(500).json( {
            error : 'error while unlike'
        })
    }
}