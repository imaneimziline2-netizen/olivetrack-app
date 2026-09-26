# Gestion d'une exploitation oléicole

## 1. Nom du projet

**Nom du projet :** OliveTrack

---

## 2. Présentation du projet

Ce projet est une application web Front-end qui permet de gérer et de suivre une exploitation oléicole.
Elle s'adresse principalement aux exploitants agricoles et aux utilisateurs chargés du suivi de la production oléicole.
L'application permet de consulter et gérer différentes informations liées aux parcelles, aux récoltes et à la production.
Son objectif principal est de centraliser les informations et de faciliter le suivi de l'exploitation.

---

## 3. Problématique

Le problème identifié est que le suivi des informations d'une exploitation oléicole peut être difficile lorsque les données sont dispersées ou gérées manuellement.

La solution proposée permet de regrouper les principales informations dans une interface web simple et organisée afin de faciliter la consultation et la gestion des données.

---

## 4. Fonctionnalités principales

* **Consulter le tableau de bord** et visualiser les principales informations de l'exploitation.
* **Gérer les parcelles** et consulter leurs informations.
* **Suivre les récoltes** et les données liées à la production.
* **Consulter les informations de production** d'huile d'olive.
* **Gérer les ventes** et consulter les informations commerciales.
* **Consulter un guide agronomique** contenant des informations utiles sur la culture de l'olivier.

---

## 5. Technologies utilisées

| Technologie  | Utilisation dans le projet                     |
| ------------ | ---------------------------------------------- |
| React        | Développement de l'interface utilisateur       |
| JavaScript   | Développement de la logique de l'application   |
| HTML         | Structure des pages et des composants          |
| CSS          | Mise en forme et design de l'interface         |
| React Router | Gestion de la navigation entre les pages       |
| Redux        | Gestion centralisée de l'état de l'application |
| Vite         | Création et lancement du projet Front-end      |
| Git / GitHub | Gestion et versionnement du code               |

---

# 6. Installation et lancement

## 6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

* **Node.js**
* **npm**
* **Git**
* **Un navigateur web moderne**
* **Un éditeur de code comme VS Code**

---

## 6.2 Cloner le dépôt

```bash
git clone https://github.com/imaneimziline2-netizen/olivetrack-app.git
```
---

## 6.3 Ouvrir le dossier

```bash
cd olivetrack-backend
```
---

## 6.4 Installer les dépendances

```bash
npm install
```
---

## 6.5 Variables d'environnement

Le projet Front-end ne nécessite pas de variables d'environnement sensibles pour son fonctionnement actuel.

Si une API ou un service externe est ajouté dans une prochaine version, les informations de configuration pourront être placées dans un fichier `.env`.

Exemple :

```env
VITE_API_URL=
```

Aucune clé API, aucun mot de passe ou token privé ne doit être publié dans le dépôt GitHub.

---

## 6.6 Lancer le projet

```bash
npm run dev
```

Après le lancement, Vite affiche dans le terminal l'adresse locale permettant d'accéder à l'application.

---

## 6.7 Ouvrir le projet

L'application est généralement accessible à l'adresse :

```text
http://localhost:5173
```

L'adresse exacte affichée par Vite doit être utilisée si le port est différent.

---

# 7. Captures d'écran

## Capture 1

### Titre

**Tableau de bord**

### Image

```md
![Tableau de bord](./screenshots/dashboard.png)
```

### Explication

Cette capture montre le tableau de bord de l'application. Il permet de consulter rapidement les principales informations liées à l'exploitation oléicole.

---

## Capture 2

### Titre

**Gestion des parcelles**

### Image

```md
![Gestion des parcelles](./screenshots/parcelles.png)
```

### Explication

Cette capture montre l'interface permettant de consulter les informations relatives aux parcelles de l'exploitation.

---

# 8. Contribution personnelle

Ma contribution principale a porté sur le développement de l'interface Front-end de l'application.

J'ai travaillé sur la création et l'organisation des différentes pages, la navigation entre les interfaces ainsi que la mise en forme des composants.

J'ai également utilisé Redux pour gérer l'état de l'application et faciliter le partage des données entre les différents composants.

J'ai participé à l'intégration des différentes fonctionnalités liées à la gestion de l'exploitation oléicole.

---

# 9. Difficultés rencontrées

## Difficulté 1 : Gestion de l'état de l'application

### Problème rencontré

La gestion des données partagées entre plusieurs composants pouvait devenir difficile lorsque chaque composant gérait son propre état.

### Recherches / Tests

J'ai étudié différentes solutions de gestion d'état et testé l'utilisation de Redux afin de centraliser certaines données utilisées par plusieurs parties de l'application.

### Solution

J'ai utilisé Redux pour centraliser la gestion de l'état et permettre aux différents composants d'accéder aux données nécessaires.

### Ce que j'ai appris

Cette difficulté m'a permis de mieux comprendre la gestion d'état dans React et l'utilisation de Redux dans une application Front-end.

---

## Difficulté 2 : Organisation et navigation entre les pages

### Problème rencontré

L'application contient plusieurs interfaces et il était nécessaire d'organiser correctement la navigation entre les différentes pages.

### Recherches / Tests

J'ai étudié la gestion des routes avec React Router et testé différentes structures pour organiser les pages et les composants.

### Solution

J'ai utilisé React Router afin de créer une navigation claire entre les différentes interfaces de l'application.

### Ce que j'ai appris

Cette difficulté m'a permis de mieux comprendre la gestion des routes dans une application React et l'organisation d'un projet Front-end.

---

# 10. Améliorations possibles

Dans une prochaine version, je pourrais :

* **Ajouter une API Backend** pour enregistrer et récupérer les données depuis une base de données.
* **Ajouter des tests automatisés** afin d'améliorer la fiabilité de l'application.
* **Améliorer le responsive design** pour adapter l'interface aux smartphones et aux tablettes.
* **Ajouter davantage de statistiques et de graphiques** pour faciliter l'analyse de la production.

### Conclusion

Ces améliorations permettraient de rendre l'application plus complète, plus sécurisée et plus adaptée à une utilisation réelle dans une exploitation oléicole.

