// config/db.js
// Ce fichier gère la connexion simple à la base de données MongoDB avec Mongoose.

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(` MongoDB connecté avec succès : ${conn.connection.host}`);
    } catch (error) {
        console.error(` Erreur de connexion à MongoDB : ${error.message}`);
        process.exit(1); // Arrête l'application en cas d'erreur de connexion
    }
};

module.exports = connectDB;
