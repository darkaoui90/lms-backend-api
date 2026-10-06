// controllers/courseController.js
// Contrôleur gérant la logique métier pour les cours du catalogue LMS.

const Course = require('../models/course');
const Module = require('../models/module');
const Resource = require('../models/resource');

// @desc    Obtenir la liste des cours (avec filtres, recherche, tri et pagination)
// @route   GET /api/courses
// @access  Public (Visiteur & Apprenant)
exports.getAllCourses = async (req, res, next) => {
    try {
        const { category, level, search, sortBy, order, status, page = 1, limit = 10 } = req.query;

        // 1. Construction de l'objet filtre
        let filter = {};

        // Par défaut, afficher seulement les cours publiés
        if (status === 'all') {
            // Ne filtre pas par statut si 'all' est demandé
        } else if (status) {
            filter.publicationStatus = status;
        } else {
            filter.publicationStatus = 'publié';
        }

        // Filtre par catégorie (insensible à la casse)
        if (category) {
            filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        // Filtre par niveau
        if (level) {
            filter.level = level;
        }

        // Recherche par mot-clé dans le titre ou la description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // 2. Gestion du tri (par date de création, date de publication, etc.)
        let sortOption = {};
        const sortField = sortBy || 'createdAt';
        const sortDirection = order === 'asc' ? 1 : -1;
        sortOption[sortField] = sortDirection;

        // 3. Pagination simple
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // 4. Exécution de la requête
        const totalCourses = await Course.countDocuments(filter);
        const courses = await Course.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        // 5. Réponse JSON standardisée
        res.status(200).json({
            success: true,
            count: courses.length,
            total: totalCourses,
            page: pageNumber,
            totalPages: Math.ceil(totalCourses / limitNumber) || 1,
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir le détail d'un cours par son ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Aucun cours trouvé avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un cours complet avec tous ses modules et ressources
// @route   GET /api/courses/:id/full
// @access  Public
exports.getCourseFull = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Aucun cours trouvé avec l'id : ${req.params.id}`
            });
        }

        // Récupérer tous les modules rattachés à ce cours
        const modules = await Module.find({ courseId: course._id }).sort({ displayOrder: 1 });

        // Pour chaque module, récupérer ses ressources
        const modulesWithResources = await Promise.all(
            modules.map(async (mod) => {
                const resources = await Resource.find({ moduleId: mod._id }).sort({ displayOrder: 1 });
                return {
                    ...mod.toObject(),
                    resources
                };
            })
        );

        res.status(200).json({
            success: true,
            data: {
                ...course.toObject(),
                modules: modulesWithResources
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Créer un nouveau cours
// @route   POST /api/courses
// @access  Formateur / Admin (simulé pour ce sprint)
exports.createCourse = async (req, res, next) => {
    try {
        const newCourse = await Course.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Cours créé avec succès',
            data: newCourse
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour un cours existant
// @route   PUT /api/courses/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.updateCourse = async (req, res, next) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: `Aucun cours trouvé avec l'id : ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cours mis à jour avec succès',
            data: updatedCourse
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un cours (et ses modules et ressources associés)
// @route   DELETE /api/courses/:id
// @access  Formateur / Admin (simulé pour ce sprint)
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Aucun cours trouvé avec l'id : ${req.params.id}`
            });
        }

        // Trouver tous les modules rattachés pour supprimer aussi leurs ressources
        const modules = await Module.find({ courseId: course._id });
        const moduleIds = modules.map(m => m._id);

        // Supprimer toutes les ressources associées aux modules
        await Resource.deleteMany({ moduleId: { $in: moduleIds } });

        // Supprimer tous les modules
        await Module.deleteMany({ courseId: course._id });

        // Supprimer le cours
        await Course.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Cours et contenus associés supprimés avec succès'
        });
    } catch (error) {
        next(error);
    }
};