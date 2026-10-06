// routes/moduleRoutes.js
// Définition des routes pour la gestion des modules.

const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/moduleController');
const resourceController = require('../controllers/resourceController');

// Routes de base pour les modules
router.route('/')
    .get(moduleController.getModulesByCourse) // Obtenir les modules (option ?courseId=xxx)
    .post(moduleController.createModule);     // Créer un module

// Routes par identifiant de module
router.route('/:id')
    .get(moduleController.getModuleById)     // Obtenir le détail d'un module
    .put(moduleController.updateModule)      // Mettre à jour un module
    .delete(moduleController.deleteModule);  // Supprimer un module

// Routes imbriquées : Accéder aux ressources d'un module spécifique
router.route('/:moduleId/resources')
    .get(resourceController.getResourcesByModule) // Obtenir les ressources d'un module
    .post(resourceController.createResource);     // Ajouter une ressource à un module

module.exports = router;
