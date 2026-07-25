# Mon Blog — Frontend

Interface d'un blog simple en Next.js (App Router) + React + Tailwind CSS. Consomme l'API Flask (voir le repo backend `davjournal_api`).

## Stack

- Next.js (App Router)
- React
- Tailwind CSS

## Installation locale

1. Cloner le repo :
```bash
   git clone <url-du-repo>
   cd davjournal
```

2. Installer les dépendances :
```bash
   npm install
```

3. Configurer l'URL de l'API — créer un fichier `.env.local` à la racine :
NEXT_PUBLIC_API_URL=http://localhost:5000

4. Lancer le serveur de développement :
```bash
   npm run dev
```

   Le site tourne sur `http://localhost:3000`.

> Important : le backend Flask (`davjournal_api`) doit être démarré en parallèle pour que les pages affichent des données.

## Pages

| Route | Description |
|---|---|
| `/` | Liste des articles |
| `/articles/[id]` | Détail d'un article (avec option de suppression) |
| `/creer` | Formulaire de création d'un article |

## Build de production

```bash
npm run build
npm start
```

## Déploiement (Vercel)

1. Connecter le repo GitHub à Vercel.
2. Ajouter la variable d'environnement `NEXT_PUBLIC_API_URL` dans les settings du projet Vercel, pointant vers l'URL du backend déployé.
3. Déployer.

## URL de déploiement

https://monblog-front-phi.vercel.app/