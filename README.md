# LSR Motors

Application de gestion de garage moto — suivi des interventions pour mécaniciens et clients.

**Stack :** Next.js 16 · Prisma · PostgreSQL · NextAuth · Tailwind CSS

---

## Développement local

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) + Docker Compose

### Lancement

```bash
# 1. Copier le fichier d'environnement
cp .env.example .env

# 2. Éditer .env avec vos valeurs (au minimum NEXTAUTH_SECRET)
# Générer un secret : openssl rand -base64 32

# 3. Lancer le projet complet
docker compose up
```

L'app sera disponible sur **http://localhost:3000**

Les migrations Prisma sont appliquées automatiquement au démarrage.

### Commandes utiles

```bash
# Démarrer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f app

# Arrêter
docker compose down

# Reset complet (supprime la DB)
docker compose down -v
```

### Dev sans Docker (Next.js natif)

```bash
npm install
# Démarrer uniquement la DB
docker compose up postgres -d
# Appliquer les migrations
npx prisma migrate dev
# Lancer le serveur de dev
npm run dev
```
