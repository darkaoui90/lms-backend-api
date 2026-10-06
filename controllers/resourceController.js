// controllers/resourceController.js
// Contrôleur gérant les ressources pédagogiques (vidéos, docs, liens, etc.).

const Resource = require('../models/resource');
const Module = require('../models/module');

// @desc    Obtenir toutes les ressources d'un module
// @route   GET /api/modules/:moduleId/resources ou GET /api/resources?moduleId=xxx
// @access  Public
exports.getResourcesByModule = async (req, res, next) => {
    try {
        const moduleId = req.params.moduleId || req.query.moduleId;

        if (moduleId) {
            // Vérifier que le module parent existe
            const moduleItem = await Module.findById(moduleId);
            if (!moduleItem) {
                return res.status(404).json({
                    success: false,
                    message: `Aucun module trouvé avec l'id : ${moduleId}`
                });
            }
        }

        const filter = moduleId ? { moduleId } : {};
        const resources = await Resource.find(filter).sort({ displayOrder: 1 });

        res.status(200).json({
            success: true,
            count: resources.length,
            data: resources
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir une ressource par son ID
// @route   GET /api/resources/:id
// @access  Public
exports.getResourceById = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: `Aucune ressource trouvée avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: resource
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer une nouvelle ressource
// @route   POST /api/resources ou POST /api/modules/:moduleId/resources
// @access  Formateur / Admin (simulé pour ce sprint)
exports.createResource = async (req, res, next) => {
    try {
        // Si le moduleId est passé dans l'URL
        if (req.params.moduleId) {
            req.body.moduleId = req.params.moduleId;
        }

        // Vérifier que le module parent existe
        const moduleItem = await Module.findById(req.body.moduleId);
        if (!moduleItem) {
            return res.status(404).json({
                success: false,
                message: `Le module associé avec l'id ${req.body.moduleId} n'existe pas`
            });
        }

        const newResource = await Resource.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Ressource créée avec succès',
            data: newResource
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour une ressource
// @route   PUT /api/resources/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.updateResource = async (req, res, next) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedResource) {
            return res.status(404).json({
                success: false,
                message: `Aucune ressource trouvée avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ressource mise à jour avec succès',
            data: updatedResource
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer une ressource
// @route   DELETE /api/resources/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.deleteResource = async (req, res, next) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: `Aucune ressource trouvée avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ressource supprimée avec succès'
        });
    } catch (error) {
        next(error);
    }
};
