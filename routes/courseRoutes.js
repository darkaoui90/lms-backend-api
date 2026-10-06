// routes/courseRoutes.js
// Définition des routes pour la gestion du catalogue des cours.

const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const moduleController = require('../controllers/moduleController');

// Routes de base pour les cours
router.route('/')
    .get(courseController.getAllCourses)   // Lister les cours (avec filtres, recherche, tri, pagination)
    .post(courseController.createCourse);  // Créer un cours (simulation formateur)

// Route pour obtenir un cours complet (avec tous ses modules et ressources)
router.get('/:id/full', courseController.getCourseFull);

// Routes par identifiant de cours
router.route('/:id')
    .get(courseController.getCourseById)    // Consulter les détails d'un cours
    .put(courseController.updateCourse)     // Mettre à jour un cours
    .delete(courseController.deleteCourse); // Supprimer un cours

// Routes imbriquées : Accéder aux modules d'un cours spécifique
router.route('/:courseId/modules')
    .get(moduleController.getModulesByCourse) // Consulter les modules d'un cours
    .post(moduleController.createModule);     // Ajouter un module à un cours

module.exports = router;
