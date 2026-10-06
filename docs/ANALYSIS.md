# 📋 Analyse du Besoin & Backlog Projet (LMS)

## 1. Reformulation du Besoin

Le projet consiste à concevoir et développer une plateforme d'apprentissage en ligne (**LMS - Learning Management System**).
Pour ce **Sprint 1 (Fondations & Catalogue)**, l'objectif principal est de poser le socle technique solide et de réaliser le catalogue de cours consultable (cours, modules, ressources pédagogiques), tout en préparant la conception globale pour les fonctionnalités futures (authentification, inscriptions, progression, quiz, feedbacks).

---

## 2. Identification des Rôles

| Rôle | Description | Droits d'accès |
| :--- | :--- | :--- |
| **Visiteur** | Utilisateur non connecté qui découvre la plateforme. | - Consulter le catalogue des cours publiés<br>- Rechercher et filtrer les cours (catégorie, niveau, mot-clé)<br>- Voir les détails et la structure d'un cours |
| **Apprenant** | Utilisateur inscrit qui suit des formations. | - Tous les droits du visiteur<br>- S'inscrire à un cours<br>- Suivre sa progression (marquer une ressource/module terminé)<br>- Passer des quiz et consulter ses scores<br>- Laisser un avis / feedback sur un cours |
| **Formateur** | Enseignant / Créateur de contenu pédagogique. | - Créer, modifier et supprimer ses cours<br>- Organiser les cours en modules et ressources (vidéos, docs, liens, code, quiz)<br>- Définir le statut de publication (brouillon / publié)<br>- Consulter les statistiques et notes de ses cours |
| **Administrateur** | Gestionnaire global de la plateforme. | - Gestion globale des utilisateurs et des rôles<br>- Modération des cours et des avis<br>- Gestion des catégories globales<br>- Supervision technique et reporting |

---

## 3. Entités Principales du Système

1. **User (Utilisateur)** : Identité, rôle (Visiteur/Apprenant/Formateur/Admin), profil.
2. **Course (Cours)** : Titre, description, niveau, catégorie, durée estimée, statut (brouillon/publié), formateur associé.
3. **Module (Chapitre)** : Titre, description, ordre d'affichage, durée, rattaché à un cours.
4. **Resource (Ressource pédagogique)** : Titre, type (VIDEO, DOCUMENT, LINK, CODE, QUIZ), URL, ordre d'affichage, rattaché à un module.
5. **Enrollment (Inscription)** : Liaison entre un apprenant et un cours, date d'inscription, statut (en cours, terminé).
6. **Progress (Progression)** : Suivi par apprenant des modules et ressources complétés avec pourcentage d'avancement.
7. **Quiz** : Titre, questions, choix, réponses correctes, score minimum pour valider.
8. **QuizAttempt (Tentative de quiz)** : Réponses soumises par l'apprenant, note obtenue, statut (réussi/échoué).
9. **Feedback (Avis / Évaluation)** : Note (1 à 5 étoiles), commentaire, date, rattaché à un cours et un apprenant.

---

## 4. Règles Métier Structurantes

- **Publication** : Seuls les cours avec le statut `publié` sont visibles dans le catalogue public pour les visiteurs et apprenants.
- **Organisation séquentielle** : Les modules et ressources sont ordonnés par un champ `displayOrder`.
- **Intégrité référentielle** : La suppression d'un cours entraîne la suppression en cascade de ses modules et ressources associés.
- **Accès futur aux ressources privées** : Un apprenant ne pourra voir le contenu complet des ressources protégées qu'après inscription au cours (Sprint suivant).
- **Validation** : Les champs obligatoires (`title`, `description`, `category`, `type`, `storageUrl`) sont strictement validés via Mongoose.

---

## 5. Backlog Jira (Epics, User Stories & Tâches Techniques)

### 🔹 EPIC 1 : Architecture & Socle Technique (Sprint 1 - Réalisé ✅)
- **US-1.1** : En tant que développeur, je veux structurer le projet en architecture MVC propre (routes, contrôleurs, modèles, middlewares).
  - *Tâche tech 1* : Initialiser Express, dotenv, nodemon et package.json.
  - *Tâche tech 2* : Créer la connexion MongoDB avec Mongoose (`config/db.js`).
  - *Tâche tech 3* : Configurer l'environnement Docker avec `docker-compose.yml`.
  - *Tâche tech 4* : Mettre en place les middlewares `notFound` et `errorHandler`.

### 🔹 EPIC 2 : Modélisation et Données (Sprint 1 - Réalisé ✅)
- **US-2.1** : En tant que développeur, je veux créer les modèles de données pour les cours, modules et ressources.
  - *Tâche tech 1* : Créer le modèle `Course` avec validations et énumérations.
  - *Tâche tech 2* : Créer le modèle `Module` avec clé étrangère vers `Course`.
  - *Tâche tech 3* : Créer le modèle `Resource` avec types et clé étrangère vers `Module`.
  - *Tâche tech 4* : Écrire un script de seed réaliste (`seeds/seed.js`).

### 🔹 EPIC 3 : API Catalogue & Consultation (Sprint 1 - Réalisé ✅)
- **US-3.1** : En tant que visiteur/apprenant, je veux lister les cours publiés avec des options de filtrage et de recherche.
  - *Tâche tech 1* : Créer la route `GET /api/courses` avec filtres (`category`, `level`, `search`).
  - *Tâche tech 2* : Ajouter le tri (`sortBy`, `order`) et la pagination (`page`, `limit`).
- **US-3.2** : En tant que visiteur/apprenant, je veux consulter le détail d'un cours et sa structure.
  - *Tâche tech 1* : Créer la route `GET /api/courses/:id`.
  - *Tâche tech 2* : Créer la route `GET /api/courses/:courseId/modules`.
  - *Tâche tech 3* : Créer la route `GET /api/modules/:moduleId/resources`.
  - *Tâche tech 4* : Créer la route complète `GET /api/courses/:id/full`.

### 🔹 EPIC 4 : Gestion des Contenus (CRUD Formateur - Simulé ✅)
- **US-4.1** : En tant que formateur, je veux créer, modifier et supprimer des cours, modules et ressources.
  - *Tâche tech 1* : Créer les routes POST, PUT, DELETE pour les cours.
  - *Tâche tech 2* : Créer les routes POST, PUT, DELETE pour les modules avec cascade.
  - *Tâche tech 3* : Créer les routes POST, PUT, DELETE pour les ressources.

---

### 🚀 Epics des Prochains Sprints (Roadmap)
- **EPIC 5 (Sprint 2)** : Authentification JWT, Sécurité, Gestion des Rôles et Profils.
- **EPIC 6 (Sprint 2)** : Inscriptions aux cours (`Enrollment`) et Suivi de Progression (`Progress`).
- **EPIC 7 (Sprint 3)** : Quiz interactifs, évaluations et soumission de devoirs.
- **EPIC 8 (Sprint 3)** : Feedbacks, notations, avis et tableau de bord formateur/admin.
