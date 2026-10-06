# 📖 Documentation de l'API LMS - Catalogue

**URL de base** : `http://localhost:5000/api`

---

## 1. Endpoints des Cours (`/courses`)

### 🔹 Obtenir la liste des cours (Catalogue)
- **Méthode** : `GET`
- **URL** : `/courses`
- **Accès** : Public
- **Paramètres d'URL (Query Params)** :
  - `category` *(optionnel)* : Filtrer par catégorie (ex: `Frontend`, `Backend`, `DevOps`)
  - `level` *(optionnel)* : Filtrer par niveau (`Débutant`, `Intermédiaire`, `Avancé`)
  - `search` *(optionnel)* : Recherche textuelle dans le titre et la description
  - `sortBy` *(optionnel)* : Champ de tri (`createdAt`, `publishedAt`, `title`) - Défaut : `createdAt`
  - `order` *(optionnel)* : Ordre de tri (`asc` ou `desc`) - Défaut : `desc`
  - `page` *(optionnel)* : Numéro de page - Défaut : `1`
  - `limit` *(optionnel)* : Nombre d'éléments par page - Défaut : `10`
  - `status` *(optionnel)* : Statut (`publié`, `brouillon`, ou `all`) - Défaut : `publié`

**Exemple de requête** :
`GET http://localhost:5000/api/courses?category=Frontend&level=Débutant`

**Réponse (200 OK)** :
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "totalPages": 1,
  "data": [
    {
      "_id": "660c1d2e8f1b2c001a123456",
      "title": "HTML5 & CSS3 Moderne : De Zéro à Expert",
      "description": "Apprenez à concevoir des sites web modernes, responsives et accessibles.",
      "category": "Frontend",
      "level": "Débutant",
      "estimatedDuration": 15,
      "publicationStatus": "publié",
      "publishedAt": "2026-01-10T00:00:00.000Z",
      "createdAt": "2026-01-10T00:00:00.000Z",
      "updatedAt": "2026-01-10T00:00:00.000Z"
    }
  ]
}
```

---

### 🔹 Obtenir les détails d'un cours
- **Méthode** : `GET`
- **URL** : `/courses/:id`
- **Accès** : Public

**Réponse (200 OK)** :
```json
{
  "success": true,
  "data": {
    "_id": "660c1d2e8f1b2c001a123456",
    "title": "HTML5 & CSS3 Moderne : De Zéro à Expert",
    "description": "Apprenez à concevoir des sites web modernes, responsives et accessibles.",
    "category": "Frontend",
    "level": "Débutant",
    "estimatedDuration": 15,
    "publicationStatus": "publié"
  }
}
```

---

### 🔹 Obtenir un cours complet (avec ses modules et ressources)
- **Méthode** : `GET`
- **URL** : `/courses/:id/full`
- **Accès** : Public

**Réponse (200 OK)** :
```json
{
  "success": true,
  "data": {
    "_id": "660c1d2e8f1b2c001a123456",
    "title": "HTML5 & CSS3 Moderne : De Zéro à Expert",
    "category": "Frontend",
    "modules": [
      {
        "_id": "660c1d2e8f1b2c001a123457",
        "title": "Introduction aux bases du Web",
        "displayOrder": 1,
        "resources": [
          {
            "_id": "660c1d2e8f1b2c001a123458",
            "title": "Vidéo : Comment fonctionne le Web ?",
            "type": "VIDEO",
            "storageUrl": "https://youtube.com/watch?v=sample-web-basics"
          }
        ]
      }
    ]
  }
}
```

---

### 🔹 Créer un cours (Formateur / Admin simulé)
- **Méthode** : `POST`
- **URL** : `/courses`
- **Corps de la requête (JSON)** :
```json
{
  "title": "React.js Moderne & Hooks",
  "description": "Maîtrisez React 19, les hooks et le state management.",
  "category": "Frontend",
  "level": "Intermédiaire",
  "estimatedDuration": 20,
  "publicationStatus": "publié"
}
```
- **Réponse (201 Created)**

---

### 🔹 Modifier un cours
- **Méthode** : `PUT`
- **URL** : `/courses/:id`
- **Corps de la requête (JSON)** : Champs à modifier

---

### 🔹 Supprimer un cours
- **Méthode** : `DELETE`
- **URL** : `/courses/:id`
- **Réponse (200 OK)** : Supprime le cours ainsi que tous les modules et ressources associés.

---

## 2. Endpoints des Modules (`/modules`)

### 🔹 Obtenir les modules d'un cours
- **Méthode** : `GET`
- **URL** : `/courses/:courseId/modules` ou `/modules?courseId=...`
- **Accès** : Public

### 🔹 Créer un module
- **Méthode** : `POST`
- **URL** : `/courses/:courseId/modules` ou `/modules`
- **Corps de la requête (JSON)** :
```json
{
  "title": "Les composants fonctionnels et Props",
  "description": "Création et réutilisation de composants React",
  "displayOrder": 1,
  "estimatedDuration": 60,
  "courseId": "660c1d2e8f1b2c001a123456"
}
```

### 🔹 Modifier / Supprimer un module
- `PUT /api/modules/:id`
- `DELETE /api/modules/:id`

---

## 3. Endpoints des Ressources (`/resources`)

### 🔹 Obtenir les ressources d'un module
- **Méthode** : `GET`
- **URL** : `/modules/:moduleId/resources` ou `/resources?moduleId=...`
- **Accès** : Public

### 🔹 Créer une ressource
- **Méthode** : `POST`
- **URL** : `/modules/:moduleId/resources` ou `/resources`
- **Corps de la requête (JSON)** :
```json
{
  "title": "Vidéo : Introduction aux State & Props",
  "type": "VIDEO",
  "storageUrl": "https://video.lms.local/react-props-101.mp4",
  "description": "Comprendre les flux de données descendants en React.",
  "displayOrder": 1,
  "moduleId": "660c1d2e8f1b2c001a123457"
}
```

### 🔹 Modifier / Supprimer une ressource
- `PUT /api/resources/:id`
- `DELETE /api/resources/:id`

---

## 4. Codes de Statut HTTP Utilisés

| Code HTTP | Description | Cas d'usage |
| :--- | :--- | :--- |
| **200 OK** | Succès | Consultation (GET), mise à jour (PUT) ou suppression (DELETE) réussie |
| **201 Created** | Création réussie | Création d'une nouvelle ressource (POST) |
| **400 Bad Request** | Requête invalide | Données manquantes ou non conformes au schéma de validation |
| **404 Not Found** | Introuvable | ID inexistant ou URL non trouvée |
| **500 Internal Server Error** | Erreur serveur | Erreur inattendue interceptée par le middleware global |
