const { User, Thought } = require('../models');

module.exports = {

    getUsers(req,res) {
        User.find()
        .then((userData) => res.json(userData))
        .catch((err)=> res.status(500).json(err));
    },

    getOneUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((userData)=> {
            if(!userData) {
                return res.status(404).json({message:'No user found.'});
            }
            res.json(userData)
        })
        .catch((err)=> res.status(500).json(err));
    },

    createUser(req,res) {
        User.create(req.body)
        .then((userData)=>{
            res.json(userData)
        })
    },

    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set:req.body},
            {runValidators: true, new:true}
        ).then((userData)=>{
            if(!userData) {
                return res.status(404).json({message:'No user find with id.'})
            }
            res.json(userData);
        })
    },

    deleteUser(req,res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: userdata.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res) {
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new:true}
        )
        .then((userData)=>{
            if(!userData) {
                return res.status(404).json({message:'No id found'});
            }
            res.json(userData)
        })
        .catch((err)=> res.status(500).json(err));
    },

    removeFriend(req,res) {
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new:true})
            .then((userData)=>{
                if(!userData) {
                    return res.status(404).json({meassage:'No id!'})
                }
                res.json(userData)
            })
    }
}