// controllers/moduleController.js
// Contrôleur gérant les modules/chapitres des cours du LMS.

const Module = require('../models/module');
const Course = require('../models/course');
const Resource = require('../models/resource');

// @desc    Obtenir tous les modules d'un cours spécifique
// @route   GET /api/courses/:courseId/modules ou GET /api/modules?courseId=xxx
// @access  Public
exports.getModulesByCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId || req.query.courseId;

        if (courseId) {
            // Vérifier si le cours existe
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: `Aucun cours trouvé avec l'id : ${courseId}`
                });
            }
        }

        const filter = courseId ? { courseId } : {};
        const modules = await Module.find(filter).sort({ displayOrder: 1 });

        res.status(200).json({
            success: true,
            count: modules.length,
            data: modules
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un module par son ID
// @route   GET /api/modules/:id
// @access  Public
exports.getModuleById = async (req, res, next) => {
    try {
        const moduleItem = await Module.findById(req.params.id);

        if (!moduleItem) {
            return res.status(404).json({
                success: false,
                message: `Aucun module trouvé avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: moduleItem
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un nouveau module
// @route   POST /api/modules ou POST /api/courses/:courseId/modules
// @access  Formateur / Admin (simulé pour ce sprint)
exports.createModule = async (req, res, next) => {
    try {
        // Si l'ID du cours est passé dans l'URL, on l'ajoute au corps de la requête
        if (req.params.courseId) {
            req.body.courseId = req.params.courseId;
        }

        // Vérifier que le cours parent existe
        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Le cours associé avec l'id ${req.body.courseId} n'existe pas`
            });
        }

        const newModule = await Module.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Module créé avec succès',
            data: newModule
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour un module existant
// @route   PUT /api/modules/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.updateModule = async (req, res, next) => {
    try {
        const updatedModule = await Module.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedModule) {
            return res.status(404).json({
                success: false,
                message: `Aucun module trouvé avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Module mis à jour avec succès',
            data: updatedModule
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un module (et ses ressources associées)
// @route   DELETE /api/modules/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.deleteModule = async (req, res, next) => {
    try {
        const moduleItem = await Module.findById(req.params.id);

        if (!moduleItem) {
            return res.status(404).json({
                success: false,
                message: `Aucun module trouvé avec l'id : ${req.params.id}`
            });
        }

        // Supprimer toutes les ressources associées à ce module
        await Resource.deleteMany({ moduleId: moduleItem._id });

        // Supprimer le module
        await Module.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Module et ses ressources supprimés avec succès'
        });
    } catch (error) {
        next(error);
    }
};
