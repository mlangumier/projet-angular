# Projet Évaluation Angular

Créer une application frontend qui correspond à un projet backend Spring Boot (REST API).

## Objectifs

Créer une application Angular et créer une interface graphique responsive pour ce backend.

### Fonctionnalités attendues

- [x] Formulaire d'inscription
- [x] Formulaire d'authentification
- [x] Afficher les dernières images paginées
- [x] Afficher une image spécifique et ses commentaires
- [x] Afficher les images d'un user spécifique
- [ ] ~~Poster une image~~ CRUD d'une image
- [ ] Poster un commentaire.
- [x] Liker une image et afficher le nombre de like et le status (déjà likée ou non)

### Bonus

- [ ] Réactiver le CSRF dans le SecurityConfig et faire en sorte côté front de récupéré le token
  CSRF et de l'envoyer pour chaque méthode de modification

### Problèmes à régler

- Développement :
    - Regrouper le code réutilisé à plusieurs endroits (style, pages ajout/modification d'image,
      composants réutilisables).
- UI :
    - Cartes d'affichage des images, en particulier en display horizontal
    - Dans l'affichage en grille, les image n'ont pas toutes la même hauteur
    - Ajouter des couleurs aux boutons (SCSS) : distinguer confirmation, danger, etc.
- UX :
    - Définir une norme en ce qui concerne les interactions et la durée entre les redirections (
      timeout, duration, snackbar vs erreurs)
    - Submission de formulaire : désactiver les formulaires lors d'un submit & afficher un spinner
      le temps de la requête.
