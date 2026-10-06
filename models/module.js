// models/Module.js
// Schéma Mongoose représentant un module/chapitre appartenant à un cours.

const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du module est obligatoire'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    displayOrder: {
        type: Number,
        default: 1
    },
    estimatedDuration: {
        type: Number, // Durée en minutes
        default: 30
    },
    // Clé étrangère / Relation : Référence vers le cours parent
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Le module doit obligatoirement être rattaché à un cours']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);
