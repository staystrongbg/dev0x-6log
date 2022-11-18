import express from 'express';

import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from '../controllers/post';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/', editPost);
router.delete('/:id', deletePost);

export default router;
