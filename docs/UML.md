# 📐 Conception & Diagrammes UML du LMS

Ce document présente la modélisation complète du système LMS afin de verrouiller la conception globale dès ce premier sprint.

---

## 1. Diagramme de Classes UML Global

Ce diagramme modélise l'ensemble du domaine fonctionnel :
- Les entités implémentées dans ce sprint : **Course**, **Module**, **Resource**
- Les entités prévues pour les prochains sprints : **User**, **Enrollment**, **Progress**, **Quiz**, **QuizAttempt**, **Feedback**

```mermaid
classDiagram
    class User {
        +ObjectId id
        +String firstName
        +String lastName
        +String email
        +String password
        +String role
        +Date createdAt
        +register()
        +login()
        +updateProfile()
    }

    class Course {
        +ObjectId id
        +String title
        +String description
        +String category
        +String level
        +Number estimatedDuration
        +String publicationStatus
        +Date publishedAt
        +ObjectId trainerId
        +publish()
        +unpublish()
    }

    class Module {
        +ObjectId id
        +String title
        +String description
        +Number displayOrder
        +Number estimatedDuration
        +ObjectId courseId
    }

    class Resource {
        +ObjectId id
        +String title
        +String type
        +String storageUrl
        +String description
        +Number displayOrder
        +ObjectId moduleId
    }

    class Enrollment {
        +ObjectId id
        +ObjectId userId
        +ObjectId courseId
        +Date enrolledAt
        +String status
    }

    class Progress {
        +ObjectId id
        +ObjectId enrollmentId
        +ObjectId resourceId
        +Boolean isCompleted
        +Date completedAt
    }

    class Quiz {
        +ObjectId id
        +String title
        +Number passingScore
        +ObjectId moduleId
    }

    class QuizAttempt {
        +ObjectId id
        +ObjectId quizId
        +ObjectId userId
        +Number score
        +Boolean isPassed
        +Date attemptedAt
    }

    class Feedback {
        +ObjectId id
        +ObjectId userId
        +ObjectId courseId
        +Number rating
        +String comment
        +Date createdAt
    }

    User "1" --> "0..*" Course : "crée (Formateur)"
    User "1" --> "0..*" Enrollment : "s'inscrit (Apprenant)"
    User "1" --> "0..*" Feedback : "publie"
    User "1" --> "0..*" QuizAttempt : "passe"
    
    Course "1" *-- "1..*" Module : "contient"
    Course "1" --> "0..*" Enrollment : "reçoit"
    Course "1" --> "0..*" Feedback : "reçoit"

    Module "1" *-- "1..*" Resource : "contient"
    Module "1" --> "0..1" Quiz : "intègre"

    Quiz "1" --> "0..*" QuizAttempt : "évalue"

    Enrollment "1" *-- "0..*" Progress : "suit"
    Progress --> Resource : "concerne"
```

---

## 2. Diagramme de Cas d'Utilisation (Use Cases)

Ce diagramme présente les interactions des 4 rôles avec la plateforme LMS.

```mermaid
flowchart LR
    subgraph Acteurs
        V["👤 Visiteur"]
        A["🎓 Apprenant"]
        F["👨‍🏫 Formateur"]
        Admin["🛡️ Administrateur"]
    end

    subgraph "Système LMS - Cas d'Utilisation"
        UC1["Consulter le catalogue des cours"]
        UC2["Rechercher et filtrer les cours"]
        UC3["Voir les détails et le plan d'un cours"]
        UC4["S'inscrire à un cours"]
        UC5["Consulter le contenu des ressources"]
        UC6["Suivre sa progression d'apprentissage"]
        UC7["Passer un quiz"]
        UC8["Laisser un avis (Feedback)"]
        UC9["Créer / Modifier un cours"]
        UC10["Gérer modules et ressources"]
        UC11["Publier un cours"]
        UC12["Gérer les utilisateurs et les rôles"]
        UC13["Modérer les cours et avis"]
    end

    V --> UC1
    V --> UC2
    V --> UC3

    A --> UC1
    A --> UC2
    A --> UC3
    A --> UC4
    A --> UC5
    A --> UC6
    A --> UC7
    A --> UC8

    F --> UC9
    F --> UC10
    F --> UC11

    Admin --> UC12
    Admin --> UC13
    Admin --> UC9
```

---

## 3. Diagramme Complémentaire : Parcours & Séquence d'Apprentissage

### Diagramme de Séquence : Consultation et Parcours d'un Cours

```mermaid
sequenceDiagram
    autonumber
    actor Apprenant as 🎓 Apprenant / Visiteur
    participant Frontend as 💻 Application Frontend
    participant API as 🌐 API Backend (Express)
    participant DB as 🗄️ Base MongoDB

    Apprenant->>Frontend: Visite le catalogue de cours
    Frontend->>API: GET /api/courses?category=Frontend&level=Débutant
    API->>DB: Course.find({ publicationStatus: 'publié', category: 'Frontend' })
    DB-->>API: Liste des cours
    API-->>Frontend: 200 OK (JSON des cours)
    Frontend-->>Apprenant: Affiche les cartes des cours

    Apprenant->>Frontend: Clique sur un cours pour voir les détails
    Frontend->>API: GET /api/courses/:id/full
    API->>DB: Course.findById() + Module.find() + Resource.find()
    DB-->>API: Données complètes du cours
    API-->>Frontend: 200 OK (Cours avec modules et ressources)
    Frontend-->>Apprenant: Affiche la page du cours avec son plan
```

### 💡 Justification du diagramme complémentaire :
Ce diagramme de séquence permet de clarifier le flux de données entre l'interface utilisateur, l'API Express et la base de données MongoDB. Il sécurise l'implémentation de la route `GET /api/courses/:id/full` et garantit que les données envoyées au client contiennent tous les éléments nécessaires pour construire la vue d'un cours de manière performante.

---

## 4. Règles d'Accès Futures et Justification de la Structure

### 🔐 Règles d'accès futures (Sprint 2) :
1. **Routes Publiques** :
   - `GET /api/courses` (seulement statut 'publié')
   - `GET /api/courses/:id`
   - `GET /api/courses/:id/modules`
2. **Routes Protégées Apprenant** :
   - `POST /api/enrollments` (inscription)
   - `GET /api/modules/:moduleId/resources` (accès aux contenus privés une fois inscrit)
   - `POST /api/progress`
3. **Routes Protégées Formateur / Admin** :
   - `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`
   - `POST /api/modules`, `PUT /api/modules/:id`, `DELETE /api/modules/:id`
   - `POST /api/resources`, `PUT /api/resources/:id`, `DELETE /api/resources/:id`

### 🏗️ Justification de la Structure du Projet :
- **Séparation des responsabilités (MVC simplifié)** :
  - `routes/` : Déclare les endpoints et associe les requêtes HTTP aux contrôleurs.
  - `controllers/` : Contient la logique métier pure (recherche, validation, formatage).
  - `models/` : Définit les schémas Mongoose et les règles de validation des données.
  - `middlewares/` : Centralise la gestion des erreurs et des routes introuvables.
  - `config/` : Isole la configuration de la base de données.
- Cette organisation permet une grande lisibilité pour les débutants, évite la duplication de code et facilite les tests et la maintenance.
