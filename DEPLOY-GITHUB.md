# Mettre le site The RougH en ligne gratuitement avec GitHub Pages

## 1. Créer le compte

Créez un compte gratuit sur GitHub si vous n'en avez pas.

## 2. Créer un dépôt

1. Cliquez **New repository**.
2. Nom conseillé : `the-rough-site`.
3. Choisissez **Public**.
4. Créez le dépôt.

## 3. Envoyer les fichiers

Dans le dépôt :

1. **Add file → Upload files**.
2. Déposez **tout le contenu de ce dossier** (pas le ZIP lui-même).
3. Validez avec **Commit changes**.

Le fichier `index.html` doit se trouver à la racine du dépôt.

## 4. Activer GitHub Pages

1. Ouvrez **Settings → Pages**.
2. Dans **Build and deployment**, choisissez **Deploy from a branch**.
3. Branche : **main** ; dossier : **/(root)**.
4. Enregistrez.

Après quelques minutes, GitHub indique l'adresse gratuite du site, typiquement :

`https://VOTRE-COMPTE.github.io/the-rough-site/`

## 5. Ajouter un nom de domaine plus tard

Dans **Settings → Pages → Custom domain**, entrez votre domaine (par exemple `theroughmetal.com`). GitHub vous indiquera les DNS à configurer chez votre vendeur de domaine.

Avant cela, remplacez `https://example.com/` dans `index.html`, `robots.txt` et `sitemap.xml` par l'adresse définitive.

## 6. Modifier les liens streaming / réseaux

Vous n'avez pas besoin de toucher au HTML : ouvrez `site-config.js`, collez les URL entre guillemets et validez la modification.
