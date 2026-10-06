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
        required: [true, 'Le type de ressource est obligatoire']
    },
    storageUrl: {
        type: String,
        required: [true, 'L\'URL ou le chemin du fichier est requis']
    },
    description: {
        type: String
    },
    displayOrder: {
        type: Number,
        default: 1
    },
  
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: [true, 'La ressource doit être rattachée à un module']
    }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);