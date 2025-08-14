# SupIGA - Plateforme de Gestion d'Établissement d'Enseignement Supérieur
## Auth et données

Cette version utilise exclusivement localStorage côté client pour l'authentification (sans base de données, sans API). Ne pas utiliser en production.
SupIGA est une plateforme moderne pour la gestion d'établissements d'enseignement supérieur. Elle permet aux administrateurs, professeurs et étudiants de gérer efficacement leurs activités académiques.

## Fonctionnalités

- Authentification sécurisée pour les administrateurs, professeurs et étudiants
- Tableau de bord personnalisé selon le rôle de l'utilisateur
- Gestion des profils utilisateurs
- Interface moderne et responsive
- Base de données MongoDB pour le stockage des données

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/supiga.git
cd supiga
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```
MONGODB_URI=mongodb://localhost:27017/supiga
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
supiga/
├── app/                    # Pages et composants Next.js
│   ├── api/               # Routes API
│   ├── dashboard/         # Page tableau de bord
│   ├── login/            # Page de connexion
│   └── register/         # Page d'inscription
├── lib/                   # Utilitaires et configurations
│   ├── db.ts             # Configuration MongoDB
│   └── models/           # Modèles Mongoose
├── public/               # Fichiers statiques
└── middleware.ts         # Middleware d'authentification
```

## Technologies Utilisées

- Next.js 13+ (App Router)
- TypeScript
- MongoDB avec Mongoose
- Tailwind CSS
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe

## Sécurité

- Authentification JWT avec cookies httpOnly
- Hachage des mots de passe avec bcrypt
- Protection des routes sensibles
- Validation des données côté serveur

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 