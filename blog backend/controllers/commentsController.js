const Post = require('../models/postModels')
const Comment = require('../models/commentsModels')

//business logic 

exports.createComment = async(req, res) => {

    try {
        const {post, user, body} = req.body;

        //create object for save method to insert post data into DB
        const comment = new Comment({
            post,
            user,
            body
        }); 
        
        //save into the DB
        const savedComment = await comment.save();
        //insert comment part in post section
      
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            {$push : {comments : savedComment._id}},
            {new : true}
        ).populate('comments').exec();


        res.status(200).json( {
            post : updatedPost,
            messgae : 'comments submited'
        })
    }
    catch(error) {
        res.status(500).json ({
            message : 'comments not submited'
        })
    }
}