# game-demo

Demonstration de l'utilisation de Phaser 2 / Phaser CE sous forme d'un mini-jeu très simple

### 1. Installer NodeJS

NodeJS permet de faire tourner du JavaScript sans navigateur, directement sur l'ordinateur. L'utilité de faire tourner NodeJS est de créer un tout petit serveur web qui nous permettera de tester le jeu vidéo

https://nodejs.org/en/

### 2. Installer GitHub Desktop

Git permet de modifier du code source à plusieurs personnes, tout en gardant un historique complet de toutes les versions et révisions. Tu es actuellement en train de lire un document sur ce qui s'appelle un _repo_ Git.

https://desktop.github.com/

### 3. Cloner ce _repo_ Git sur ton ordi

En utilisant l'application GitHub Windows, il faut récupérer le code contenu dans ce _repo_ pour en avoir une copie en local.

### 4. Lancer le serveur en local

Une fois NodeJS installé, et le code copié en local, tu peux lancer le serveur node en ouvrant une ligne de commande, puis en te rendant dans le dossier cible.

Il faut d'abord installer les dépendences du projet en faisant

    $> npm install

Une fois que le processus d'installation est terminé, tu peux lancer le serveur en faisant

    $> node server.js

Ceci va lancer le processus NodeJS en interpretant le fichier server.js, qui est le code source du programme qu'on veut lancer. NodeJS ne nécessite pas de compiler le code à l'avance.

### 5. Lancer le jeu dans ton navigateur web

Ouvrir Google Chrome et se rendre sur

    http://localhost:4242

## Exercices d'apprentissage

Maintenant que le jeu de démo fonctionne, tu peux essayer de jouer avec. Le jeu consiste en une balle qui se déplace et rebondit. Quand on clic sur la balle, sa vitesse horizontale (x) s'inverse.

1. Faire rebondir la balle sur les bords d'en-haut et de gauche
2. Faire tourner la balle sur elle-même à vitesse constante
3. Maintenant que la balle tourne sur elle-même, il est possible qu'elle dépasse les bords avant de rebondir. Corriger ce problème.
4. Faire que quand on clic sur la balle, elle rebondit à l'opposé de où se trouve la souris (par exemple, si on clic en-haut à droite de la balle, elle repart en-bas à gauche)
5. Ajouter une deuxième balle sur la scène, qui se comporte de manière identique à la première, en ajoutant un minimum de lignes de codes.
6. Faire que quand on clic ailleurs que sur la balle, cela crée une nouvelle balle dans la scène, qui se comporte de la même manière que toutes les autres balles.
7. Faire que quand deux balles se touchent, elles disparaissent de la scène
8. Ajouter un score en-haut à gauche de l'écran. Quand deux balles se touche, le score doit augmenter de 50 points
9. Rajouter dans la scène un joueur de foot qui se déplace un plus lentement que les balles (vitesse légèrement inférieure) et qui court toujours après la balle la plus proche de lui
10. Faire que si le joueur touche une balle, elle disparait, et le score baisse de 100 points 


## Pour trouver de l'aide

Attention, il existe plusieurs versions de Phaser en même temps. Nous utilisons la version 2, en Community Edition (CE).

L'API complète se situe ici. Attention, Google a parfois l'habitude de trouver les documents dans une ancienne version:
https://photonstorm.github.io/phaser-ce/

Il existe un tas d'exemples sur le site de phaser:
https://phaser.io/examples
