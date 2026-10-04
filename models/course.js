const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du cours est obligatoire'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire']
    },
    level: {
        type: String,
        enum: ['Débutant', 'Intermédiaire', 'Avancé'],
        default: 'Débutant'
    },
    category: {
        type: String,
        required: true
    },
    estimatedDuration: {
        type: Number,
        required: true
    },
    publicationStatus: {
        type: String,
        enum: ['brouillon', 'publié'],
        default: 'brouillon'
    },
    
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Course', courseSchema);