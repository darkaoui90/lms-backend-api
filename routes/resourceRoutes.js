// routes/resourceRoutes.js
// Définition des routes pour la gestion des ressources pédagogiques.

const express = require('express');
const router = express.Router();

const resourceController = require('../controllers/resourceController');

// Routes de base pour les ressources
router.route('/')
    .get(resourceController.getResourcesByModule) // Obtenir les ressources (option ?moduleId=xxx)
    .post(resourceController.createResource);     // Créer une ressource

// Routes par identifiant de ressource
router.route('/:id')
    .get(resourceController.getResourceById)    // Consulter une ressource par son ID
    .put(resourceController.updateResource)     // Mettre à jour une ressource
    .delete(resourceController.deleteResource); // Supprimer une ressource

module.exports = router;
