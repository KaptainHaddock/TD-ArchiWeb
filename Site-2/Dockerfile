# Étape 1 : Construire l’application
FROM node:18-alpine AS builder

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l’application
RUN npm run build

# Étape 2 : Servir l’application avec Nginx
FROM nginx:alpine

# Copier les fichiers générés du build dans le dossier de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]