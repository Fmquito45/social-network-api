const { Thought, User} = require('../models/index.js');

const ThoughtController = {
  // following methods
  // gets all thougths
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // gets single thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      if (!thought) {
        res.status(500).json(err);
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // creates thought and sets to user
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log(thought);
      const usernamee = thought.username;
      console.log(thought.username);
      if (thought.username) {
        const user = await User.findOne({username: usernamee});
        console.log(user);
        if (user) {
          user.thoughts.push(thought._id);
          await user.save();
        }
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // deletes thought and removes from user
  async deleteThought(req,res) {
    try {
      const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
      res.status(200).json(thought);
      const usernamee = thought.username;
      console.log(thought.username);
      if (thought.username) {
        const user = await User.findOne({username: usernamee});
        console.log(user);
        if (user) {
          user.thoughts.pop(thought._id);
          await user.save();
        }
      }
    } catch (err) {
        res.status(500).json(err);
    }
  },
  // updates thought with id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(500).json(err);
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // creates reaction through thought id
  async createReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(500).json(err);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  // deletes reaction on thought with id
  async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        thought ? res.json(thought) : res.status(500).json(err);
    } catch (err) {
        res.status(500).json(err);
    }
  },

};
// export ThoughtController
module.exports = ThoughtController;