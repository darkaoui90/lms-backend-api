// models/Course.js
// Schéma Mongoose représentant un cours dans le catalogue LMS.

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
    category: {
        type: String,
        required: [true, 'La catégorie est obligatoire'],
        trim: true
    },
    level: {
        type: String,
        enum: ['Débutant', 'Intermédiaire', 'Avancé'],
        default: 'Débutant'
    },
    estimatedDuration: {
        type: Number, // Durée estimée en heures
        required: [true, 'La durée estimée (en heures) est obligatoire']
    },
    publicationStatus: {
        type: String,
        enum: ['brouillon', 'publié'],
        default: 'publié'
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    // Référence future vers l'utilisateur formateur (prévu pour le prochain sprint)
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Course', courseSchema);