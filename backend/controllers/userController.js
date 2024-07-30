import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/helpers/genTokenAndSetCookie.js";

const signupUser = async (req, res) => {
    try{
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or: [{email}, {username}]});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name, 
            email, 
            username, 
            password: hashedPassword
        });
        await newUser.save();

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email, 
                username: newUser.username,
            });
        }else{
            res.status(400).json({message: "Invalid User data"});
        }
    }catch(err){
        res.status(500).json({message: err.message});
        console.log("Error in signupUser", err.message);
    }
};

const loginUser = async(req, res) => {
    try{
        const {name, email, username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({message: "Invalid Username or Password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            username: user.username, 
        })
    }catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in loginUser: ", error.message);
    }
};

const logoutUser = (req, res) => {
    try{
        res.cookie("jwt", "", {
            maxAge: 1
        });
        res.status(200).json({message: "User loggout out successfully!"});
    }catch(err){
        res.status(500).json({message: err.message});
        console.log("Error in logoutUser: ", err.message);
    }
};

const followUnfollowUser = async(req, res) => {
    try{
        const {id} = req.params;
        const userToUpdate = await User.findById(id);
        const currUser = await User.findById(req.user._id);

        if(id==req.user._id){
            return res.status(400).json({message: "You cannot follow/unfollow yourself"});
        }

        if(!userToUpdate || !currUser){
            return res.status(400).json({message: "User not found!"});
        }

        const isFollowing = currUser.following.includes(id);
        if(isFollowing){
            //unfollow
            //modify curr user following, followers of usertoupdate
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            res.status(200).json({message: "User unfollowed successfully"});
        }else{
            //follow
            //2 cases just like above
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});
            res.status(200).json({message: "User followed successfully"});
        }
    }catch(err){
        res.status(500).json({message: err.message});
        console.log("Error in follow/unfollow user", err.message);
    }
}

export {signupUser, loginUser, logoutUser, followUnfollowUser};