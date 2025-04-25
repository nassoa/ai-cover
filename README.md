# ai-cover

**Générez automatiquement des lettres de motivation personnalisées à partir d’offres d’emploi et de vos informations personnelles.**

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Tech Stack](#tech-stack)

## Description

**ai-cover** est une application web qui permet de générer des lettres de motivation adaptées à partir d’une offre d’emploi et d’informations personnelles fournies par l’utilisateur.  
Le projet utilise les modèles **Mixtral 8x7B** et **Llama 3.1 8B** via l’API Together AI, avec streaming des réponses pour une expérience fluide.

## Fonctionnalités

- Coller une offre d’emploi à analyser
- Ajouter ses informations personnelles : nom, prénom, adresse, compétences clés
- Génération automatique d’une lettre de motivation adaptée
- Affichage en temps réel de la lettre générée (streaming)
- Interface utilisateur réactive et moderne

## Tech Stack

- **Framework** : Next.js
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **UI** : Headless UI, Heroicons, Lucide React
- **API IA** : Together AI
  - Modèles : Mixtral 8x7B :contentReference[oaicite:3]{index=3}, Llama 3.1 8B :contentReference[oaicite:4]{index=4}
  - Streaming des réponses :contentReference[oaicite:5]{index=5}
