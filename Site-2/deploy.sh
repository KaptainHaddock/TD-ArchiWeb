#!/bin/bash

# Étape 1 : git add
git add .

# Étape 2 : git commit avec message entré par l'utilisateur
read -p "Entrez le message de commit : " commit_message
git commit -m "$commit_message"

# Étape 3 : git push
git push

# Étape 4 : Supprimer les images Docker locales
echo "Suppression des images Docker locales..."
sudo docker image prune -af

# Étape 5 : Construire l'image Docker
sudo docker build -t victorsavalle/tdarchiweb:latest

# Étape 6 : Pousser l'image sur le registre Docker
sudo docker push victorsavalle/tdarchiweb:latest

echo "✅ Script terminé avec succès."
