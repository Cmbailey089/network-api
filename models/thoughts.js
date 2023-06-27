const { Schema, model } = require ('mongoose');
const reactionSchema = require('./reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length:1,
            max_length: 128
        },
        createdAt: {
            type: Date,
            default: Date.now(),
           
        },
        username:{
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
                getters: true
            },
            id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought',thoughtSchema);

module.exports = Thought;