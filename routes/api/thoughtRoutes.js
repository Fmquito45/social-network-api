const router = require('express').Router();
// imports methods from thoughtController
const {
  getThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// routes for GET and POST thought
router.route('/').get(getThoughts).post(createThought);
// routes for GET and PUT and DELETE thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
// routes for POST reaction
router.route('/:thoughtId/reactions').post(createReaction);
// roites for DELETE reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// Export the router
module.exports = router;