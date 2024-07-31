import express from 'express';
import {createPost, getPost, deletePost, likeUnlikePost, replyPost, getFeedPosts} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:postId", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:postId", protectRoute, deletePost);
router.post("/like/:postId", protectRoute, likeUnlikePost);
router.post("/reply/:postId", protectRoute, replyPost);

export default router; 
