const { User } = require('../models/index.js');

const UserController = {
  // gets all users
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  // gets one user 
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  // creates a user
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  // update user by id
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(500).json({ message: 'User not found'});
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },
  // delete user by id
  deleteUserById(req, res) {
    User.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(500).json({ message: 'User not found'});
        }
        res.json({ message: 'User deleted' });
      })
      .catch(err => res.status(500).json(err));
  },
  // adds friend to a user id
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(500).json({ message: 'Friend not found'});
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },
  // removes friend from a user 
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(500).json({ message: 'Friend not found'});
        }
        const removed = !dbUserData.friends.includes(params.friendId);
        if (removed) {
          res.json({ message: 'Friend removed', dbUserData});
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  
};
// export UserController
module.exports = UserController;