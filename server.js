// server.js
// Point d'entrée principal de l'API Backend LMS.

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import des middlewares personnalisés
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Import des routeurs
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

// 1. Chargement des variables d'environnement (.env)
dotenv.config();

// 2. Connexion à la base de données MongoDB
connectDB();

// 3. Initialisation de l'application Express
const app = express();

// Middleware pour parser le corps des requêtes en format JSON
app.use(express.json());

// 4. Route d'accueil / Santé de l'API
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenue sur l\'API LMS - Catalogue de cours',
        version: '1.0.0',
        endpoints: {
            courses: '/api/courses',
            modules: '/api/modules',
            resources: '/api/resources'
        }
    });
});

// 5. Montage des routes de l'API
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/resources', resourceRoutes);

// 6. Middlewares de gestion des erreurs
app.use(notFound);      // Gère les routes inexistantes (404)
app.use(errorHandler);  // Gère les erreurs serveur et validation (500, 400, etc.)

// 7. Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
    console.log(` URL de base : http://localhost:${PORT}`);
});