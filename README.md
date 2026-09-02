# OliveTrack

---

## 1. Nom du projet

**Nom du projet :** OliveTrack

---

## 2. Présentation du projet

Ce projet est une **application web** qui permet de centraliser la gestion des exploitations oléicoles : parcelles, récoltes, stock d'olives/huile, opérations de trituration et ventes.

Il s'adresse principalement aux **agriculteurs oléiculteurs** qui gèrent une ou plusieurs parcelles, ainsi qu'aux **administrateurs** chargés de superviser la plateforme.

Son objectif principal est de **digitaliser le suivi de la production oléicole** en remplaçant une gestion manuelle et dispersée par une plateforme unique offrant un suivi de stock automatisé, un calcul de rendement par trituration, une comparaison du rendement d'une parcelle d'une année sur l'autre, et un tableau de bord d'indicateurs clés.

---

## 3. Problématique

Le problème identifié est que la gestion des exploitations oléicoles est encore souvent réalisée de manière manuelle (carnets papier, tableurs isolés), ce qui rend le suivi des parcelles, des récoltes, du stock et du rendement difficile, sans aucune vision consolidée ni alerte en cas de baisse de performance.

La solution proposée permet d'enregistrer les parcelles et les récoltes (qui alimentent automatiquement un stock par parcelle), d'enregistrer les opérations de trituration (transformation des olives en huile, avec calcul automatique du rendement) et les ventes, puis de comparer le rendement d'une parcelle d'une année à l'autre pour détecter automatiquement une baisse de performance significative.

---

## 4. Fonctionnalités principales

- Créer un compte utilisateur (agriculteur)
- Se connecter à son espace via un système d'authentification sécurisé (JWT)
- Consulter et modifier son profil personnel
- Gérer ses parcelles (ajouter, consulter, modifier, supprimer)
- Enregistrer une récolte, qui alimente automatiquement le stock de la parcelle concernée
- Enregistrer une opération de trituration (olives → huile) avec calcul automatique du rendement
- Enregistrer une vente d'huile et suivre le revenu généré
- Consulter le rendement annuel de chaque parcelle et sa comparaison avec les années précédentes
- Recevoir une alerte automatique en cas de baisse significative du rendement d'une parcelle
- Consulter un tableau de bord affichant les indicateurs clés de toutes les parcelles de l'exploitation
- Superviser les comptes utilisateurs (rôle administrateur)

---

## 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| Node.js & Express.js | Développement du backend et de l'API REST |
| MongoDB & Mongoose | Stockage des données (utilisateurs, parcelles, récoltes, stock, triturations, ventes) |
| JWT (jsonwebtoken) | Authentification et gestion des sessions utilisateur |
| Bcrypt | Hachage sécurisé des mots de passe |
| Joi | Validation des données entrantes sur chaque endpoint |
| Postman | Test manuel des endpoints de l'API pendant le développement |
| Git & GitHub | Versionnement du code et travail collaboratif |

---

## 6. Modèle de données

```
User (nom, email, motDePasse, role)
  └── Parcelle (nom, superficie, localisation, variete, typeIrrigation, modeCulture, nombreArbres, anneePlantation)
        ├── Recolte (date, quantiteOlives)              → alimente automatiquement ParcelleStock
        └── ParcelleStock (nom, Stock, quantiteEntrant, quantiteSortante)   → 1 par parcelle
              ├── Trituration (date, quantite, quantitéHuile, rendement)    → transforme le stock d'olives en huile
              └── Vendu (date, quantite, revenu)                            → vente d'huile depuis le stock
```

**Rendement** : calculé automatiquement à chaque `Trituration` (`quantitéHuile / quantite × 100`), stocké sur l'enregistrement. Le rendement annuel par parcelle est calculé à la volée (agrégation des triturations de l'année), non stocké, et comparé aux années précédentes pour détecter une baisse significative (seuil configurable, ex. -20%).

---

## 7. Installation et lancement

### 7.1 Prérequis

- Node.js (version 18 ou supérieure)
- npm
- Git
- MongoDB (local ou instance MongoDB Atlas)
- Un éditeur de code (VS Code recommandé)

### 7.2 Cloner le dépôt

```bash
git clone https://github.com/imaneimziline2-netizen/olivetrack-app.git
```

### 7.3 Ouvrir le dossier

```bash
cd olivetrack-backend
```

### 7.4 Installer les dépendances

```bash
npm install
```

### 7.5 Variables d'environnement

Créer un fichier `.env` à la racine du projet, à partir de `.env.example` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/olivetrack
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=1d
```

### 7.6 Lancer le projet

```bash
npm run dev
```

### 7.7 Ouvrir le projet

```
http://localhost:5000
```

Endpoint de vérification :
```
GET http://localhost:5000/health
```

### Point de vigilance

- Le fichier `.env` ne doit **jamais** être publié sur GitHub (exclu via `.gitignore`).
- Ne jamais publier de mots de passe, clés API, tokens ou identifiants réels.

---

## 8. Endpoints principaux (au fur et à mesure de l'avancement)

| Module | Endpoint | Statut |
|---|---|---|
| Auth | POST /api/auth/register, POST /api/auth/login | ✅ Fait |
| Users | GET/PUT /api/users/me | ✅ Fait |
| Parcelles | CRUD /api/parcelles | ✅ Fait |
| Récoltes | CRUD /api/parcelles/:id/recoltes, /api/recoltes/:id | ✅ Fait |
| ParcelleStock | mise à jour automatique via Récolte/Trituration/Vendu | 🚧 En cours |
| Trituration | CRUD /api/parcelles/:id/triturations, /api/triturations/:id | ⏳ À faire |
| Vendu | CRUD /api/parcelles/:id/ventes, /api/ventes/:id | ⏳ À faire |
| Dashboard | GET /api/dashboard?annee=YYYY | ⏳ À faire |

---

## 9. Captures d'écran

> ⚠️ À compléter avec des captures Postman une fois les modules Trituration/Vendu/Dashboard testés.

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

## 10. Contribution personnelle

> ⚠️ À compléter selon ta situation réelle.

Ma contribution principale a porté sur _______________________________________________.

J'ai également travaillé sur _______________________________________________.

J'ai été responsable de _______________________________________________.

---

## 11. Difficultés rencontrées

### Difficulté 1 — Erreurs de résolution de modules ES Modules (`ERR_MODULE_NOT_FOUND`)

**Problème rencontré :** Le serveur crashait au démarrage avec des erreurs `Cannot find module`, malgré la présence apparente des fichiers concernés.

**Recherches / Tests :** Vérification de l'arborescence avec `dir`, comparaison des chemins d'import avec l'emplacement réel des fichiers.

**Solution :** Le problème venait soit d'un import sans l'extension `.js` (obligatoire en ES Modules), soit d'un fichier non encore sauvegardé.

**Ce que j'ai appris :** En ES Modules, l'extension du fichier importé est obligatoire, et il faut toujours vérifier que le chemin d'import correspond exactement à l'emplacement physique du fichier.

### Difficulté 2 — Évolution du modèle de données en cours de projet

**Problème rencontré :** Le modèle initial (`Production` unique regroupant huile et rendement) a dû être remplacé en cours de développement par une structure plus fidèle au métier réel (`ParcelleStock`, `Trituration`, `Vendu`), après validation d'un nouveau diagramme de classes.

**Recherches / Tests :** Comparaison des deux modèles, analyse des relations et des cascades d'ownership pour chaque nouvelle entité.

**Solution :** Le module Récoltes existant n'a pas eu besoin d'être modifié (relation directe conservée), seul le module Production a été retiré et remplacé par les trois nouvelles entités.

**Ce que j'ai appris :** L'importance de concevoir des services découplés (ownership vérifié via des fonctions dédiées plutôt que codé en dur) pour absorber une évolution du modèle de données sans tout casser.

---

## 12. Améliorations possibles

Dans une prochaine version, je pourrais :

- ajouter une suite de tests automatisés (unitaires, intégration, API) ;
- ajouter un middleware de gestion d'erreurs centralisé ;
- déployer l'application sur un hébergeur cloud avec MongoDB Atlas ;
- documenter l'API avec Swagger/OpenAPI ;
- affiner le seuil de détection d'anomalie de rendement selon les retours des agriculteurs testeurs.

### Conclusion

Ces améliorations permettraient de fiabiliser le projet grâce à des tests automatisés, de faciliter sa maintenance grâce à une documentation claire, et d'affiner la valeur métier de la détection d'anomalies de rendement.