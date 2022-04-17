export const up = async (knex) => {
  await knex.schema.createTable("role", (table) => {
    table.increments("id").primary().notNullable();

    table.string("name").notNullable();
  });

  await knex("role").insert([
    { id: 1, name: "ADMIN" },
    { id: 2, name: "AUTHOR" },
    { id: 3, name: "READER" },
  ]);

  // USERS
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("id_role").nullable();

    table.string("name").notNullable();
    table.string("email").notNullable().unique();

    table.string("password_hash").notNullable();
    table.string("password_salt").notNullable();

    table.date("created_at").defaultTo(new Date(Date.now()).toUTCString());
    table.date("updated_at").nullable();
    table.date("deleted_at").nullable();
    table.boolean("active").notNullable().defaultTo(1);
  });

  await knex("users").insert([
    {
      id: 1,
      id_role: 1,
      name: "Obi Wan Kenobi",
      email: "obi@fromthestar.star",
      password_hash: "test",
      password_salt: "test",
    },
    {
      id: 2,
      id_role: 2,
      name: "johnny depp",
      email: "lejoe@fromthesea.pirate",
      password_hash: "test",
      password_salt: "test",
    },
    {
      id: 3,
      id_role: 3,
      name: "Paul Walker",
      email: "rapideetfurieux@lesbagnols.vroumvroum",
      password_hash: "test",
      password_salt: "test",
    },
    {
      id: 4,
      id_role: 1,
      name: "The Testeur",
      email: "test@test.test",
      password_hash: "test",
      password_salt: "test",
    },
  ]);
  // POST
  await knex.schema.createTable("post", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("id_user").notNullable();

    table.string("title").nullable();
    table.text("save_title").nullable();

    table.text("content").nullable();
    table.text("save_content").nullable();

    table.boolean("is_published").notNullable().defaultTo(0);

    table.date("created_at").defaultTo(new Date(Date.now()).toUTCString());
    table.date("updated_at").nullable();
    table.date("deleted_at").nullable();
  });
  await knex("post").insert([
    {
      id: 1,
      id_user: 1,
      title: "La guerre des newbies ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      created_at: new Date(Date.now()).toUTCString(),
      is_published: 1,
    },
    {
      id: 2,
      id_user: 2,
      title: "Boucanier des îles",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      created_at: new Date(Date.now()).toUTCString(),
      updated_at: new Date(Date.now()).toUTCString(),
      is_published: 1,
    },
  ]);
  // COMMENT
  await knex.schema.createTable("comment", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("id_post").notNullable();
    table.integer("id_user").notNullable();

    table.text("content").notNullable();

    table.date("created_at").defaultTo(new Date(Date.now()).toUTCString());
    table.date("updated_at").nullable();
    table.date("deleted_at").nullable();
  });

  await knex("comment").insert([
    {
      id: 1,
      id_user: 1,
      id_post: 1,

      content:
        "Certains attendent toujours quelque chose dans cette saga, et ne le trouvant pas, ou trouvant quelque chose qui lui déplaît, se complaît à se plaindre. Moi, j'adore la guerre des étoiles et je prends chaque film pour ce qu'il est une suite (ou une préquelle) qui nous donne plus d'informations sur cette magnifique saga, des nouveaux combats des surprises. Le retour de Palpatine ne m'a pas surpris (pour le coup), car depuis l'Episode 1, il a toujours été là, dans l'ombre à préparer son coup. Puis comme Empereur, et enfin en ayant créé le premier ordre avec sa marionnette Snoke pour nous désorienter, mais il a toujours été là. Star wars, c'est autant la saga des Skywalker que la Saga de Palpatine lui même. Il ne manquerait qu'un épisode 0 pour connaitre sa jeunesse et sa formation avec Dark Plagueis pour que la guerre des étoiles soit sa biographie complète ^^ Sur le fond, cet épisode m'a pleinement satisfait, une totale réussite, avec des combats superbes, et un final époustouflant. Seule chose, une grande tristesse en sortant de la salle en se disant que cette grande saga qui a 42 ans s'achève ainsi. Mais bon, peut être reverrons nous Rey dans 10 ans devoir combattre un nouvel ennemi (un dernier disciple de Palaptine, non présent lors du final ?). Tout est possible et c'est cela que j'aime dans La guerre des newbies.",

      created_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 2,
      id_user: 2,
      id_post: 2,

      content:
        "J'adore ce film! Il est incroyable. Je l'ai écouter des centaines de fois et j'adore comment il est fait avec tout les bon acteurs! Si vous voulez écouter ce film, je vous le dit vous devez absolument l'écouter!!! Si vous êtes sur le point de l'écouter: Bon film!!! Et si vous venez de l'écouter: Comment l'avez vous trouver?!",

      created_at: new Date(Date.now()).toUTCString(),
      updated_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 3,
      id_user: 3,
      id_post: 2,

      content:
        "Un film incroyable qui est  le premier volet de plusieurs suite. Dans ce film nous faisons la découverte d'un nouvel univers, l'univers de la piraterie. De nombreux combat à l'épée, bataille sur mer, nous éblouissent durant ce film. Même s'il y a quand même quelques faux raccords, on ne les remarque généralement pas.",

      created_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 4,
      id_user: 3,
      id_post: 1,

      content:
        "C'est toujours une émotion intense de retrouver l'univers de Star Wars. La magie a opérée en moi car les moyens techniques déployés sont impressionnants et le visuel frise la perfection.Oui, il y a quelques incrustations d'images qui n'ont pas été assez peaufinées. J'imagine la pression au niveau du timing pour terminer le projet. Ceci dit, plusieurs passages m'ont troublé par leur manque de finesse. L'équipe de scénaristes a dû se tordre les méninges pour répondre à toutes les données de Lucas et instructions de Disney. Il y a même une performance au niveau du montage pour faire revenir la Princesse Leia. Mais n'était il pas possible de réaliser un film digne avec une histoire originale avec sa nouvelle troupe d'acteurs tout en gardant les anciens pour donner du crédit à leur quête. J'espérais un nouveau départ mais pas assister à un ensemble de recettes déjà utilisées par Lucas. À l'époque, il s'agissait de rebondissements grandioses. Quand Luke apprend qu'il est le fils de Vador, c'est génial et tellement original à l'époque. Mais dans ce 9ème volet, 40 ans après, JJ Abrams abuse et tourne au ridicule certaines scènes qui malgré le déploiement de moyens m'ont donné envie de rire. J'ai eu du mal à comprendre les objectifs de Rey et me sentir touché par le conflit avec Kylo. Après coup, j'ai l'impression qu'elle suivait la trame d'un épisode de Dora l'exploratrice. J'ai eu du mal à comprendre l'enjeu de son aventure alors que tout était résolu à la fin du Retour des Jedis.George Lucas avait selon moi un peu pédalé dans le vide avec sa seconde trilogie qui est devenue la première. On a pu découvrir les origines de Dark Vador mais consacrer 3 films était un peu trop ambitieux. Certains passages étaient très ennuyeux. Sans intérêt.  Si ce n'est que Lucas a permis de développer un marché pour les produits dérivés. À l'époque du Retour du Jedi, Walt Disney participait déjà au développement du marketing. Pour preuve, j'ai un produit de l'époque estampillé par Disney. Donc, il s'agit d'un oubli de la part des fans de condamner trop facilement la 3ème trilogie. Lucas avait succombé au plaisir d'accumuler des dollars. Comme Lucas était un très bon conteur, nous sommes tombés sous le charme des Ewoks. À vrai dire, ils enrichissaient l'univers. Et j'ai ressenti une émotion intense quand j'ai vu leur propre aventure au cinéma. Mais c'était à une certaine période et aussi, je faisais partie du public cible.. Étant un enfant. Nous étions baignés dans les Rocky 1-2-3-4-5 et autres superproductions cinématographiques du genre qui nous semblent maintenant des navets, qui agacaient certains mais qui faisaient partie d'une époque. Je respecte ces films car ils nous ont procuré des émotions, du plaisir mais ils appartiennent à ces années.J'espère que Disney, qui a maintenant pu largement récupérer son investissement en 2019, va bientôt nous offrir une nouvelle série d'aventures dans l'univers de Star Wars et nous faire revivre des émotions dignes d'un 'Empire contre-attaque'. Comme nous avons largement contribué à leur enrichissement, il est temps de nous récompenser.'",

      created_at: new Date(Date.now()).toUTCString(),
      updated_at: new Date(Date.now()).toUTCString(),
    },
  ]);
};

export const down = async (knex) => {
  await knex.schema.dropTable("role");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("post");
  await knex.schema.dropTable("comment");
};
