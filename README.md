# OliveTrack

---

## 1. Nom du projet

**Nom du projet :** OliveTrack

---

## 2. Présentation du projet

Ce projet est une **application web** qui permet de centraliser la gestion des exploitations oléicoles : parcelles, récoltes et production d'huile d'olive.

Il s'adresse principalement aux **agriculteurs oléiculteurs** qui gèrent une ou plusieurs parcelles, ainsi qu'aux **administrateurs** chargés de superviser la plateforme.

Son objectif principal est de **digitaliser le suivi de la production oléicole** en remplaçant une gestion manuelle et dispersée par une plateforme unique offrant un calcul automatique du rendement et un tableau de bord d'indicateurs clés.

---

## 3. Problématique

Le problème identifié est que la gestion des exploitations oléicoles est encore souvent réalisée de manière manuelle (carnets papier, tableurs isolés), ce qui rend le suivi des parcelles, des récoltes et de la production difficile et source d'erreurs, sans aucune vision consolidée du rendement.

La solution proposée permet d'enregistrer les parcelles, les récoltes et les productions d'huile sur une seule plateforme, de calculer automatiquement le rendement, et de visualiser des indicateurs clés via un tableau de bord.

---

## 4. Fonctionnalités principales

- Créer un compte utilisateur (agriculteur)
- Se connecter à son espace via un système d'authentification sécurisé (JWT)
- Consulter et modifier son profil personnel
- Gérer ses parcelles (ajouter, consulter, modifier, supprimer)
- Enregistrer et consulter l'historique des récoltes par parcelle
- Enregistrer une production d'huile et obtenir un calcul automatique du rendement
- Consulter un tableau de bord affichant les indicateurs clés de l'exploitation
- Superviser les comptes utilisateurs (rôle administrateur)

---

## 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| Node.js & Express.js | Développement du backend et de l'API REST |
| MongoDB & Mongoose | Stockage des données (utilisateurs, parcelles, récoltes, productions) |
| JWT (jsonwebtoken) | Authentification et gestion des sessions utilisateur |
| Bcrypt | Hachage sécurisé des mots de passe |
| Joi | Validation des données entrantes sur chaque endpoint |
| Postman | Test manuel des endpoints de l'API pendant le développement |
| Git & GitHub | Versionnement du code et travail collaboratif |

---

## 6. Installation et lancement

### 6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

- Node.js (version 18 ou supérieure)
- npm
- Git
- MongoDB (local ou instance MongoDB Atlas)
- Un éditeur de code (VS Code recommandé)

### 6.2 Cloner le dépôt

```bash
git clone https://github.com/imaneimziline2-netizen/olivetrack-app.git
```

### 6.3 Ouvrir le dossier

```bash
cd olivetrack-backend
```

### 6.4 Installer les dépendances

```bash
npm install
```

### 6.5 Variables d'environnement

Créer un fichier `.env` à la racine du projet, à partir de `.env.example` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/olivetrack
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=1d
```

### 6.6 Lancer le projet

```bash
npm run dev
```

### 6.7 Ouvrir le projet

Une fois lancé, l'API est accessible à l'adresse :

```
http://localhost:5000
```

Endpoint de vérification :

```
GET http://localhost:5000/health
```

### Point de vigilance

- Le fichier `.env` ne doit **jamais** être publié sur GitHub (il est exclu via `.gitignore`).
- Ne jamais publier de mots de passe, clés API, tokens ou identifiants réels dans le code ou la documentation.

---

## 7. Captures d'écran

> ⚠️ À compléter : ajoute ici des captures Postman montrant un appel réussi (ex. `POST /api/auth/register`, `GET /api/parcelles`) une fois que tu as des screenshots à insérer.

### Capture 1

**Titre :** _______________________________________________

```md
![Titre](chemin-vers-image.png)
```

**Explication :** Cette capture montre _______________________________________________.

### Capture 2

**Titre :** _______________________________________________

```md
![Titre](chemin-vers-image.png)
```

**Explication :** Cette capture montre _______________________________________________.

---

## 8. Contribution personnelle

> ⚠️ À compléter selon ta situation réelle (projet solo ou en groupe).

Ma contribution principale a porté sur _______________________________________________.

J'ai également travaillé sur _______________________________________________.

J'ai été responsable de _______________________________________________.

---

## 9. Difficultés rencontrées

### Difficulté 1 — Erreurs de résolution de modules ES Modules (`ERR_MODULE_NOT_FOUND`)

**Problème rencontré :** Le serveur crashait au démarrage avec des erreurs `Cannot find module`, malgré la présence apparente des fichiers concernés (ex. `authMiddleware.js`, `userController.js`).

**Recherches / Tests :** J'ai vérifié l'arborescence des dossiers avec `dir`, comparé les chemins d'import avec l'emplacement réel des fichiers, et confirmé que chaque fichier était bien sauvegardé sur le disque.

**Solution :** Le problème venait soit d'un import sans l'extension `.js` (obligatoire en ES Modules avec `"type": "module"`), soit d'un fichier non encore créé/enregistré à l'emplacement attendu.

**Ce que j'ai appris :** En ES Modules, contrairement à CommonJS, l'extension du fichier importé est obligatoire, et il faut toujours vérifier que le chemin d'import correspond exactement à l'emplacement physique du fichier.

### Difficulté 2 — Bugs de typo bloquant silencieusement des fonctionnalités

**Problème rencontré :** Plusieurs erreurs de frappe (`req.header` au lieu de `req.headers`, `router.pu` au lieu de `router.put`, incohérence de casse entre `req.user` et `req.User`) provoquaient soit un crash, soit un comportement silencieusement incorrect (ex. authentification qui échouait toujours).

**Recherches / Tests :** Relecture ligne par ligne du code avec un pair/assistant, test systématique de chaque endpoint dans Postman après chaque correction.

**Solution :** Correction des noms exacts des propriétés Express (`req.headers`) et des méthodes du routeur (`router.put`), et harmonisation de la casse des noms de variables entre les fichiers.

**Ce que j'ai appris :** L'importance de tester chaque middleware individuellement dès sa création, plutôt que d'accumuler plusieurs modules avant de tester — une erreur de frappe simple peut rester invisible longtemps si elle échoue silencieusement (mauvais code HTTP, condition jamais vraie) plutôt que de crasher immédiatement.

---

## 10. Améliorations possibles

Dans une prochaine version, je pourrais :

- ajouter une suite de tests automatisés (unitaires, intégration, API) ;
- ajouter un middleware de gestion d'erreurs centralisé ;
- déployer l'application sur un hébergeur cloud avec MongoDB Atlas ;
- documenter l'API avec Swagger/OpenAPI ;
- ajouter une détection d'anomalies de rendement pour alerter l'agriculteur en cas de baisse de production anormale.

### Conclusion

Ces améliorations permettraient de fiabiliser le projet grâce à des tests automatisés, de faciliter sa maintenance grâce à une documentation claire, et d'apporter une réelle valeur ajoutée métier grâce à la détection d'anomalies.