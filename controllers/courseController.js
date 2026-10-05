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