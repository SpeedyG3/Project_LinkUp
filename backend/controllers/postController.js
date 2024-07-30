import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try{
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text){
            return res.status(400).json({message: "Postedby and text fields are required"});
        }

        const user = await User.findById(postedBy);
        if(!user){
            return res.status(400).json({message: "User not found!"});
        }

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to create post"});
        }

        const maxLen = 500;
        if(text.length > maxLen){
            return res.status(400).json({message: `Text must be less than ${maxLen} characters`});
        }

        const newPost = new Post({postedBy, text, img});
        await newPost.save();
        res.status(201).json({message: "Post created successfully ", newPost});

    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err.message);
    }
};

const getPost = async(req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json({message: "Post found ", post});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const deletePost = async(req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to delete Post"});
        }

        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({message: "Post deleted Successfully"});

    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export {createPost, getPost, deletePost};