const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,

} = require('../../controllers/userController.js');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// export router
module.exports = router;