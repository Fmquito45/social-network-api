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
// export router
module.exports = router;