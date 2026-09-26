# OliveTrack

---

## 1. Nom du projet

**Nom du projet :** OliveTrack

---

## 2. Présentation du projet

Ce projet est une **application web** qui permet de centraliser la gestion des exploitations oléicoles : parcelles, récoltes, stock d'olives/huile, opérations de trituration et ventes.

Il s'adresse principalement aux **agriculteurs oléiculteurs** qui gèrent une ou plusieurs parcelles, ainsi qu'à un **administrateur** chargé de superviser la plateforme.

Son objectif principal est de **digitaliser le suivi de la production oléicole** en remplaçant une gestion manuelle et dispersée par une plateforme unique offrant un suivi de stock automatisé, un calcul de rendement par trituration, une comparaison du rendement d'une parcelle d'une année sur l'autre avec détection automatique d'anomalie, et un tableau de bord d'indicateurs clés.

---

## 3. Problématique

Le problème identifié est que la gestion des exploitations oléicoles est encore souvent réalisée de manière manuelle (carnets papier, tableurs isolés), ce qui rend le suivi des parcelles, des récoltes, du stock et du rendement difficile, sans aucune vision consolidée ni alerte en cas de baisse de performance.

La solution proposée permet d'enregistrer les parcelles et les récoltes (qui alimentent automatiquement un stock par parcelle), d'enregistrer les opérations de trituration (transformation des olives en huile, avec calcul automatique du rendement) et les ventes, puis de comparer le rendement d'une parcelle d'une année à l'autre pour détecter automatiquement une baisse de performance significative.

---

## 4. Fonctionnalités principales

- Créer un compte utilisateur (agriculteur uniquement, rôle forcé côté serveur)
- Se connecter via un système d'authentification sécurisé (JWT)
- Consulter et modifier son profil personnel
- Gérer ses parcelles (ajouter, consulter, modifier, supprimer)
- Enregistrer une récolte, qui alimente automatiquement le stock de la parcelle concernée
- Enregistrer une opération de trituration (olives → huile) avec calcul automatique du rendement
- Enregistrer une vente d'olives et suivre le revenu généré
- Consulter le rendement annuel de chaque parcelle et sa comparaison avec les années précédentes
- Recevoir une alerte automatique en cas de baisse significative du rendement (seuil -20%)
- Consulter un tableau de bord affichant le rendement de toutes les parcelles de l'exploitation
- Consulter un guide agronomique mensuel (irrigation, taille, fertilisation, récolte, trituration)
- Superviser (lecture seule) la liste des utilisateurs — rôle administrateur, unique dans le système

---

## 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| Node.js & Express.js | Backend et API REST |
| MongoDB & Mongoose | Stockage des données |
| JWT (jsonwebtoken) | Authentification |
| Bcrypt | Hachage des mots de passe |
| Joi | Validation des données entrantes |
| Jest, Supertest, mongodb-memory-server | Tests unitaires et d'intégration |
| Docker, docker-compose | Conteneurisation de l'API et de MongoDB |
| GitHub Actions | Intégration continue (lint, tests, build) |
| Postman | Tests manuels de l'API |
| Git & GitHub | Versionnement |

---

## 6. Modèle de données

```
User (nom, email, motDePasse, role, region, telephone : agriculteur|admin — un seul admin dans le système)
  └── Parcelle (nom, superficie, localisation, variete, typeIrrigation, modeCulture, nombreArbres, anneePlantation)
        ├── Recolte (date, quantiteOlives)                          → alimente automatiquement ParcelleStock
        └── ParcelleStock (nom, Stock, quantiteEntrant, quantiteSortante)   → 1 par parcelle
              ├── Trituration (date, quantite, quantiteHuile, rendement)    → transforme le stock d'olives en huile
              └── Vendu (date, quantiteVendue, revenu)                      → vente d'olives depuis le stock
```

**Rendement** : calculé et stocké à chaque `Trituration`. Le rendement annuel par parcelle est calculé à la volée (agrégation des triturations de l'année), non stocké, et comparé aux 3 années précédentes pour détecter une baisse significative.

**Contrainte single-admin** : garantie au niveau base de données via un index unique partiel MongoDB sur `role: "admin"`, pas seulement au niveau applicatif.

---

## 7. Installation et lancement

### 7.1 Prérequis
- Node.js (version 18 ou supérieure)
- npm, Git
- MongoDB (local ou instance MongoDB Atlas), ou Docker

### 7.2 Cloner le dépôt
```bash
git clone https://github.com/imaneimziline2-netizen/olivetrack-app.git
cd olivetrack-backend
```

### 7.3 Installer les dépendances
```bash
npm install
```

### 7.4 Variables d'environnement
Créer un fichier `.env` à la racine :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/olivetrack
JWT_SECRET=votre_secret_jwt
```

### 7.5 Lancer le projet

**En local :**
```bash
npm run dev
```

**Avec Docker (API + MongoDB) :**
```bash
docker compose up --build
```

### 7.6 Vérifier
```
GET http://localhost:5000/health
```

### 7.7 Lancer les tests
```bash
npm test
```

### Point de vigilance
- `.env` ne doit jamais être publié sur GitHub (exclu via `.gitignore` et `.dockerignore`).
- Le compte administrateur ne peut pas être créé via `/api/auth/register` — il est créé manuellement (register standard puis bascule du champ `role` en base), garantissant qu'un seul admin existe.

---

## 8. Endpoints de l'API

| Module | Endpoint | Statut |
|---|---|---|
| Auth | POST /api/auth/register, POST /api/auth/login | ✅ Fait |
| Users | GET/PUT /api/users/me | ✅ Fait |
| Parcelles | CRUD /api/parcelles, GET /:id/stock | ✅ Fait |
| Récoltes | CRUD /api/parcelles/:id/recoltes, /api/recoltes/:id | ✅ Fait |
| Trituration | CRUD /api/parcelles/:id/triturations, /api/triturations/:id | ✅ Fait |
| Vendu | CRUD /api/parcelles/:id/ventes, /api/ventes/:id | ✅ Fait |
| Dashboard | GET /api/dashboard?annee=YYYY, GET /api/parcelles/:id/rendement | ✅ Fait |
| Guide agronomique | GET /api/guide, GET /api/guide/:mois | ✅ Fait |
| Admin | GET /api/admin/users, GET /api/admin/users/:id (lecture seule) | ✅ Fait |

---

## 9. Sécurité

- Mots de passe hachés avec Bcrypt, jamais renvoyés dans les réponses API.
- Authentification par JWT, middleware dédié sur toutes les routes protégées.
- Ownership vérifié par des middlewares dédiés pour chaque ressource (Parcelle directe, Récolte/Trituration/Vendu via leur parcelle parente) — un agriculteur ne peut jamais accéder aux données d'un autre.
- Rôle `admin` non injectable via l'API : toujours forcé à `agriculteur` côté serveur à l'inscription, et un seul compte admin peut exister (contrainte base de données).
- Validation stricte des entrées (Joi) sur tous les endpoints, rejetant tout champ non attendu.
- Le rendement n'est jamais accepté depuis le client, toujours recalculé côté serveur.

---

## 10. Tests

8 tests automatisés (`npm test`), couvrant :
- La contrainte single-admin au niveau base de données (unitaire)
- Le calcul du rendement, y compris les cas limites (unitaire)
- L'inscription, le rejet d'email dupliqué, et le forçage du rôle (intégration, via `mongodb-memory-server` + `supertest`)

---

### structure  

.
├── src
│   ├── config
│   ├── middlewares
│   ├── modules
│   │   ├── admin
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── parcelles
│   │   ├── recoltes
│   │   ├── triturations
│   │   ├── users
│   │   └── ventes
│   └── utils
└── tests
    ├── integration
    └── unit



## 11. Difficultés rencontrées

### Difficulté 1 — Erreurs de résolution de modules ES Modules (`ERR_MODULE_NOT_FOUND`)
**Problème rencontré :** Le serveur crashait au démarrage avec des erreurs `Cannot find module`.
**Solution :** L'extension `.js` est obligatoire dans les imports en ES Modules, et le chemin doit correspondre exactement à l'emplacement physique du fichier.
**Ce que j'ai appris :** Toujours vérifier extension et chemin avant de chercher un bug plus complexe.

### Difficulté 2 — Évolution du modèle de données en cours de projet
**Problème rencontré :** Le modèle initial (`Production` unique) a dû être remplacé par `ParcelleStock`, `Trituration` et `Vendu` après validation d'un nouveau diagramme de classes.
**Solution :** Grâce à des services découplés avec ownership vérifié par des fonctions dédiées, seul le module Production a été retiré sans impacter Parcelles/Récoltes.
**Ce que j'ai appris :** L'importance de concevoir des couches indépendantes pour absorber un changement de modèle sans tout casser.

### Difficulté 3 — Faille de sécurité : ownership manquant sur les ressources imbriquées
**Problème rencontré :** Les routes `GET/DELETE /api/triturations/:id` et `/api/ventes/:id` ne vérifiaient que l'authentification, pas la propriété réelle de la ressource — un agriculteur pouvait accéder aux données d'un autre.
**Solution :** Création de middlewares dédiés (`checkRecolteAccess`, `checkTriturationAccess`, `checkVenduAccess`) remontant jusqu'à la parcelle parente pour vérifier le propriétaire réel.
**Ce que j'ai appris :** Un middleware générique d'ownership ne suffit pas dès qu'une ressource n'a pas de `userId` direct — chaque relation indirecte doit être vérifiée explicitement.

### Difficulté 4 — Contrainte "un seul administrateur" non fiable au niveau applicatif
**Problème rencontré :** Un middleware vérifiant l'unicité de l'admin avant création ne suffisait pas : une modification directe en base (MongoDB Compass) pouvait créer un second admin sans passer par l'API.
**Solution :** Ajout d'un index unique partiel MongoDB (`partialFilterExpression: { role: "admin" }`) garantissant la contrainte au niveau base de données, quel que soit le point d'entrée de l'écriture.
**Ce que j'ai appris :** Les règles métier critiques doivent être protégées au niveau le plus bas possible (base de données), pas seulement au niveau applicatif.

---

## 12. Améliorations possibles

- Étendre la couverture de tests (endpoints Parcelles/Trituration/Vendu, tests de sécurité supplémentaires).
- Documenter l'API avec Swagger/OpenAPI.
- Déployer sur un hébergeur cloud avec MongoDB Atlas (configuration prête, déploiement à finaliser).
- Ajouter des recommandations automatiques (stock dormant, récolte manquante) en complément de l'alerte de rendement.
- Ajouter un dashboard d'évolution graphique (séries mensuelles) si le besoin se confirme.

### Conclusion
OliveTrack couvre aujourd'hui l'ensemble du cycle de vie oléicole (parcelle → récolte → stock → trituration/vente → rendement), avec une sécurité par ownership dédiée à chaque ressource et une contrainte d'administration unique garantie au niveau base de données.