const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Le nom est obligatoire'],
            trim: true
        },

        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, 'Le mot de passe est obligatoire'],
            minlength: 6
        },

        role: {
            type: String,
            enum: ['learner', 'trainer', 'admin'],
            default: 'learner'
        },

        accountStatus: {
            type: String,
            enum: ['active', 'disabled'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

 userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

module.exports = mongoose.model('User', userSchema);