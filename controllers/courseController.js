const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Cours créé avec succès',
            data: newCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la création du cours',
            error: error.message
        });
    }
};



exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};


exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Cours non trouvé' });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true 
        });
        if (!course) {
            return res.status(404).json({ success: false, message: 'Cours non trouvé' });
        }
        res.status(200).json({ success: true, message: 'Cours mis à jour', data: course });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Erreur de mise à jour', error: error.message });
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Cours non trouvé' });
        }
        res.status(200).json({ success: true, message: 'Cours supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};