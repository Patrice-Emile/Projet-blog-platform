# Projet-blog-platform

une plateforme de blog, le front et le back

Prerequis :

- postgres
- node

/!\---------------------------------------------/!\
/!\ Lancer la partie back avant la partie front /!\
/!\---------------------------------------------/!\

# Lancer la partie back-end :

- Créer une base de donnée "DATABASE" avec postgres
- Paramétrer le fichier '.env'

Directement dans le dossier back-end :

- Installer les dépendences du projet avec la commande :
  npm i

- Charger la base de donnée en lançant la commande :

  - Sous Windows : 'npm run env $(cat .env) ./node_modules/.bin/knex migrate:latest'
  - Sous Mac / Linux : 'npm run knex_latest'

  ( Il exist aussi les scripts 'knex', 'knex_up' et 'knex_down' )

- Lancer la partie back-end avec :

  - Sous Windows : 'npm run env $(cat .env) nodemon server.js'
  - Sous Mac / Linux : 'npm run dev'

Le port d'écoute est 3000, et vous pouvez, depuis votre navigateur déjà accéder à l'api 'http://localhost:3000/posts'

# Lancer la partie front-end :

Directement dans le dossier back-end :

- Installer les dépendences du projet avec la commande :
  npm i
  - Sous Windows / Mac / Linux : npm run dev

Le projet vous indiquera le pour d'écoute ( trying 3001 ), ensuite, vous pourrez depuis votre navigateur accéder à l'application depuis 'http://localhost:3001'
