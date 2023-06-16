const { Schema, Types } = require('mongoose');
const calender = require('dayjs/plugin/calendar')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> Types.ObjectId()
    },
    reactionBody:{
        type:String,
        required:true,
        max_length:280
    },
    username:{
        type: String,
        required:true
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: calender
    }
},
{
    toJSON:{
        getters:true
    },
    id: false
});

module.exports = reactionSchema