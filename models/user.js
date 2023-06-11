const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'Invalid email']
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref:'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id:false,
  }
);

userSchema.virtuals('friendcount').get(function(){
    return this.friends.length;
})
const User = model('User', userSchema);

module.exports = User;