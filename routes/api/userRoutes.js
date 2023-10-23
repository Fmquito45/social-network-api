const router = require('express').Router();
// imports methods from userController
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// routes for GET and POST user
router.route('/').get(getAllUsers).post(createUser);
// routes for GET and PUT and DELETE user
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);
// routes for POST and DELETE friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// export router
module.exports = router;