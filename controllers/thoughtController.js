const { Thought,User } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughtData) => {res.json(thoughtData)})
        .catch((err)=> res.status(500).json(err));
    },
    oneThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData) {
                return res.staus(404).json({message:'Can not find thought.'});
            }
            res.json(thoughtData)
            .catch((err)=> 
            res.status(500).json(err))
        })
    },

    createThought(req,res) {
        Thought.create(req.body).then((thoughtData)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$push: { thoughts: thoughtData._id }},
                {new:true});
        })
        .then((userData)=>{
            if(!userData) {
                return res.status(404).json({message:'Invalid user.'});
            }
                res.json({message: 'Thought created!'})
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);  
        })
    },

    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set:req.body},
            {runValidators:true, new:true})
            .then((thoughtData)=>{
                if(!thoughtData) {
                    res.status(404).json({message:'No thought found with that id.'})
                }
                res.json(thoughtData)
            }) 
    },

    deleteThought(req,res) {
        Thought.findOneAndDelete({_id:req.params.thoughtId})
        .then((thoughtData)=> {
            if(!thoughtData)
            return User.findOneAndUpdate(
                {thought: req.params.thoughtId},
                {$pull: {thougths: req.params.thoughtId}},
                {new:true}
            );
        })
        .then((thoughtData)=>{
            if(!thoughtData)  {
                return res.status(404).json({message:'No thought found'})
            }
            res.json({message:'Success!'})
        })
       
    },

    addReaction(req,res) {
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new:true}
        )
        .then((thoughtData)=>{
            if(!thoughtData) {
                return res.status(404).json({message:'No id found'});
            }
            res.json(thoughtData)
        })
    },

    removeReaction(req,res) {
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new:true})
            .then((thoughtData)=>{
                if(!thoughtData) {
                    return res.status(404).json({meassage:'No id!'})
                }
                res.json(thoughtData)
            })
    }
};