// models/Resource.js
// Schéma Mongoose représentant une ressource pédagogique dans un module.

const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre de la ressource est obligatoire'],
        trim: true
    },
    type: {
        type: String,
        enum: ['VIDEO', 'DOCUMENT', 'LINK', 'CODE', 'QUIZ'],
        required: [true, 'Le type de ressource est obligatoire (VIDEO, DOCUMENT, LINK, CODE, QUIZ)']
    },
    storageUrl: {
        type: String,
        required: [true, 'L\'URL ou le chemin de la ressource est requis'],
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
    // Clé étrangère / Relation : Référence vers le module parent
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: [true, 'La ressource doit obligatoirement être rattachée à un module']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);