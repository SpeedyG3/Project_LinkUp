import express from 'express';
import {createPost, getPost, deletePost, likeUnlikePost, replyPost, getFeedPosts} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';
import { getUserPosts } from '../controllers/userController.js';

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:postId", protectRoute, deletePost);
router.put("/like/:postId", protectRoute, likeUnlikePost);
router.put("/reply/:postId", protectRoute, replyPost);

export default router; 
