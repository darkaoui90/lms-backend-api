// middlewares/errorHandler.js
// Ce middleware centralise la gestion des erreurs de l'application.

const errorHandler = (err, req, res, next) => {
    // Si l'erreur n'a pas déjà un code de statut spécifique, on met 500 (erreur interne)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Erreur interne du serveur';

    // Gestion de l'erreur d'ID MongoDB invalide (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Ressource non trouvée avec l'identifiant : ${err.value}`;
    }

    // Gestion des erreurs de validation Mongoose
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        // On affiche la pile d'exécution seulement en mode développement
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;
