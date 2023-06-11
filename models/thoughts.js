const { Schema, model } = require ('mongoose');
const reactionSchema = require('./reactions');
const dateFormat = require('')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length:1,
            max_length: 128
        },
        createAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => dateFormat (timestamp)
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

thoughtSchema.virtuals('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thoughts',thoughtSchema);

module.exports = Thought;