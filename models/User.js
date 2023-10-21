// Import dependencies from the mongoose
const mongoose = require('mongoose'); 

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { 
          validator: function(v) {
              return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
          }
      }
    },
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    thoughts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
  },
  {
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = mongoose('User',userSchema)
// export the User 
module.exports = User;