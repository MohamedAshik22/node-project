const express = require ('express');
const router = express.Router();
const commentController = require ('../controllers/commentController');

router.post('/Comments', commentController.createComment);

router.get('/Comments', commentController.getAllComments);

router.get('/Comments/:id', commentController.getCommentById);

router.put('/Comments/:id', commentController.updateComment);

router.delete('/Comments/:id', commentController.deleteComment);

module.exports= router;