const bcrypt = require ('bcrypt');
const mongoose = require ('mongoose');



const userSchema = new mongoose.Schema ({

    userName:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    blogs: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
     }]
   
});

// userSchema.pre('save', async function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next();

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(user.password, salt);
//         user.password = hashedPassword;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const User = mongoose.model('User', userSchema);


module.exports = User;