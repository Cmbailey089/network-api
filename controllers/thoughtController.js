const { Thought,User } = require('../models');

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughtDB) => res.json(thoughtDB))
        .catch((err)=> res.status(500).json(err));
    },
    oneThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughtDB) => {
            if(!thoughtDB) {
                return res.staus(404).json({message:'Can not find though.'});
            }
            res.json(thoughtDB)
            .catch((err)=> 
            res.status(500).json(err))
        })
    },

    createThought(req,res) {
        Thought.create(req.body).then((thoughtDB)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$push: { thoughts: thoughtDB._id }},
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

    deleteThought(req,res) {
        Thought.findOneAndDelete({_id:req.params.thoughtId})
    }
};