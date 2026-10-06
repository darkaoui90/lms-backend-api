// seeds/seed.js
// Script de remplissage initial de la base de données avec des données réalistes.

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Chargement des variables d'environnement
dotenv.config();

// Modèles
const Course = require('../models/course');
const Module = require('../models/module');
const Resource = require('../models/resource');

// Données réalistes pour le développement web
const coursesData = [
    {
        title: 'HTML5 & CSS3 Moderne : De Zéro à Expert',
        description: 'Apprenez à concevoir des sites web modernes, responsives et accessibles avec HTML5, CSS3, Flexbox et CSS Grid.',
        category: 'Frontend',
        level: 'Débutant',
        estimatedDuration: 15,
        publicationStatus: 'publié',
        publishedAt: new Date('2026-01-10'),
        modules: [
            {
                title: 'Introduction aux bases du Web',
                description: 'Comprendre le fonctionnement du web, la structure HTML et les balises sémantiques.',
                displayOrder: 1,
                estimatedDuration: 120,
                resources: [
                    {
                        title: 'Vidéo : Comment fonctionne le Web ?',
                        type: 'VIDEO',
                        storageUrl: 'https://youtube.com/watch?v=sample-web-basics',
                        description: 'Explication du protocole HTTP, des navigateurs et du serveur.',
                        displayOrder: 1
                    },
                    {
                        title: 'Guide PDF : Les balises sémantiques HTML5',
                        type: 'DOCUMENT',
                        storageUrl: 'https://docs.lms.local/html5-semantics-cheatsheet.pdf',
                        description: 'Fiche récapitulative des balises sémantiques essentielles.',
                        displayOrder: 2
                    }
                ]
            },
            {
                title: 'Mise en page moderne avec Flexbox et Grid',
                description: 'Maîtriser les dispositions modernes pour créer des interfaces adaptatives et responsives.',
                displayOrder: 2,
                estimatedDuration: 180,
                resources: [
                    {
                        title: 'Tutoriel interactif : Flexbox Froggy',
                        type: 'LINK',
                        storageUrl: 'https://flexboxfroggy.com/',
                        description: 'Jeu d\'apprentissage pour pratiquer Flexbox.',
                        displayOrder: 1
                    },
                    {
                        title: 'Code source : Template Responsive Landing Page',
                        type: 'CODE',
                        storageUrl: 'https://github.com/example/responsive-landing-template',
                        description: 'Code de départ pour le projet d\'intégration.',
                        displayOrder: 2
                    },
                    {
                        title: 'Quiz de validation : Maîtrise de CSS Grid',
                        type: 'QUIZ',
                        storageUrl: 'https://quiz.lms.local/css-grid-eval-1',
                        description: '10 questions pour évaluer votre compréhension de CSS Grid.',
                        displayOrder: 3
                    }
                ]
            }
        ]
    },
    {
        title: 'JavaScript Moderne (ES6+) pour Développeurs',
        description: 'Découvrez toutes les nouveautés de JavaScript : Arrow functions, Destructuring, Promises, Async/Await et Programmation Asynchrone.',
        category: 'Frontend',
        level: 'Intermédiaire',
        estimatedDuration: 25,
        publicationStatus: 'publié',
        publishedAt: new Date('2026-02-01'),
        modules: [
            {
                title: 'Syntaxe moderne ES6+',
                description: 'Variables const/let, arrow functions, template literals et rest/spread operators.',
                displayOrder: 1,
                estimatedDuration: 150,
                resources: [
                    {
                        title: 'Vidéo : Maîtriser le Destructuring et le Spread Operator',
                        type: 'VIDEO',
                        storageUrl: 'https://youtube.com/watch?v=sample-es6-features',
                        description: 'Exemples concrets d\'utilisation de ES6 dans le quotidien.',
                        displayOrder: 1
                    },
                    {
                        title: 'Exercices pratiques JavaScript',
                        type: 'CODE',
                        storageUrl: 'https://github.com/example/js-es6-exercises',
                        description: 'Série de 15 exercices guidés avec tests unitaires.',
                        displayOrder: 2
                    }
                ]
            },
            {
                title: 'Programmation Asynchrone : Promises et Async/Await',
                description: 'Comprendre l\'Event Loop, manipuler les promesses et consommer des API avec Fetch.',
                displayOrder: 2,
                estimatedDuration: 200,
                resources: [
                    {
                        title: 'Documentation : MDN Web Docs - Async / Await',
                        type: 'LINK',
                        storageUrl: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function',
                        description: 'Référence officielle MDN.',
                        displayOrder: 1
                    },
                    {
                        title: 'Quiz : Comprendre l\'asynchronisme en JS',
                        type: 'QUIZ',
                        storageUrl: 'https://quiz.lms.local/js-async-quiz',
                        description: 'Quiz sur le fonctionnement des promesses.',
                        displayOrder: 2
                    }
                ]
            }
        ]
    },
    {
        title: 'Construire des API RESTful avec Node.js, Express & MongoDB',
        description: 'Créez des API performantes et sécurisées de A à Z avec Node.js, Express et Mongoose.',
        category: 'Backend',
        level: 'Intermédiaire',
        estimatedDuration: 30,
        publicationStatus: 'publié',
        publishedAt: new Date('2026-02-15'),
        modules: [
            {
                title: 'Fondations de Node.js et Express',
                description: 'Architecture événementielle, création d\'un serveur HTTP et routage basique.',
                displayOrder: 1,
                estimatedDuration: 180,
                resources: [
                    {
                        title: 'Vidéo : Démarrer un projet Express propre',
                        type: 'VIDEO',
                        storageUrl: 'https://youtube.com/watch?v=sample-express-intro',
                        description: 'Structure MVC et configuration initiale.',
                        displayOrder: 1
                    },
                    {
                        title: 'Dépôt GitHub Starter API Express',
                        type: 'CODE',
                        storageUrl: 'https://github.com/example/express-starter-kit',
                        description: 'Projet starter avec structure pré-configurée.',
                        displayOrder: 2
                    }
                ]
            },
            {
                title: 'Modélisation de données avec MongoDB et Mongoose',
                description: 'Création de schémas, validations, relations et opérations CRUD.',
                displayOrder: 2,
                estimatedDuration: 240,
                resources: [
                    {
                        title: 'Guide Mongoose : Relations et Population',
                        type: 'DOCUMENT',
                        storageUrl: 'https://docs.lms.local/mongoose-relations-guide.pdf',
                        description: 'Tout savoir sur le référencement et l\'agrégation.',
                        displayOrder: 1
                    }
                ]
            }
        ]
    },
    {
        title: 'DevOps & Déploiement Cloud avec Docker & CI/CD',
        description: 'Conteneurisez vos applications Node.js / MongoDB et automatisez les déploiements.',
        category: 'DevOps',
        level: 'Avancé',
        estimatedDuration: 20,
        publicationStatus: 'brouillon',
        publishedAt: null,
        modules: [
            {
                title: 'Introduction aux conteneurs Docker',
                description: 'Images, conteneurs, Dockerfile et Docker Compose.',
                displayOrder: 1,
                estimatedDuration: 120,
                resources: [
                    {
                        title: 'Vidéo : Docker expliqué simplement',
                        type: 'VIDEO',
                        storageUrl: 'https://youtube.com/watch?v=sample-docker-basics',
                        description: 'Comprendre la conteneurisation.',
                        displayOrder: 1
                    }
                ]
            }
        ]
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Connexion à la base de données pour le seed...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log(' Connecté à MongoDB');

        // 1. Nettoyage complet des collections existantes
        console.log('🧹 Nettoyage des anciennes données...');
        await Resource.deleteMany({});
        await Module.deleteMany({});
        await Course.deleteMany({});
        console.log(' Collections vidées avec succès');

        // 2. Insertion séquentielle des cours, modules et ressources
        console.log(' Insertion des nouvelles données...');
        for (const courseItem of coursesData) {
            const { modules, ...courseDetails } = courseItem;

            // Création du cours
            const createdCourse = await Course.create(courseDetails);
            console.log(` Cours créé : "${createdCourse.title}"`);

            if (modules && modules.length > 0) {
                for (const moduleItem of modules) {
                    const { resources, ...moduleDetails } = moduleItem;

                    // Création du module rattaché au cours
                    const createdModule = await Module.create({
                        ...moduleDetails,
                        courseId: createdCourse._id
                    });
                    console.log(`   Module créé : "${createdModule.title}"`);

                    if (resources && resources.length > 0) {
                        for (const resourceItem of resources) {
                            // Création de la ressource rattachée au module
                            await Resource.create({
                                ...resourceItem,
                                moduleId: createdModule._id
                            });
                        }
                        console.log(`     ${resources.length} ressource(s) ajoutée(s)`);
                    }
                }
            }
        }

        console.log(' Base de données initialisée avec succès avec des données réalistes !');
        process.exit(0);
    } catch (error) {
        console.error(' Erreur pendant l\'exécution du seed :', error.message);
        process.exit(1);
    }
};

seedDatabase();
