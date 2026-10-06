// middlewares/notFound.js
// Ce middleware est exécuté si aucune route ne correspond à l'URL demandée.

const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route non trouvée : ${req.method} ${req.originalUrl}`
    });
};

module.exports = notFound;
