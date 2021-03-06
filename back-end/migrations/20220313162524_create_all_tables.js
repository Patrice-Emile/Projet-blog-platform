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
      title: "Boucanier des ??les",
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
        "Certains attendent toujours quelque chose dans cette saga, et ne le trouvant pas, ou trouvant quelque chose qui lui d??pla??t, se compla??t ?? se plaindre. Moi, j'adore la guerre des ??toiles et je prends chaque film pour ce qu'il est une suite (ou une pr??quelle) qui nous donne plus d'informations sur cette magnifique saga, des nouveaux combats des surprises. Le retour de Palpatine ne m'a pas surpris (pour le coup), car depuis l'Episode 1, il a toujours ??t?? l??, dans l'ombre ?? pr??parer son coup. Puis comme Empereur, et enfin en ayant cr???? le premier ordre avec sa marionnette Snoke pour nous d??sorienter, mais il a toujours ??t?? l??. Star wars, c'est autant la saga des Skywalker que la Saga de Palpatine lui m??me. Il ne manquerait qu'un ??pisode 0 pour connaitre sa jeunesse et sa formation avec Dark Plagueis pour que la guerre des ??toiles soit sa biographie compl??te ^^ Sur le fond, cet ??pisode m'a pleinement satisfait, une totale r??ussite, avec des combats superbes, et un final ??poustouflant. Seule chose, une grande tristesse en sortant de la salle en se disant que cette grande saga qui a 42 ans s'ach??ve ainsi. Mais bon, peut ??tre reverrons nous Rey dans 10 ans devoir combattre un nouvel ennemi (un dernier disciple de Palaptine, non pr??sent lors du final ?). Tout est possible et c'est cela que j'aime dans La guerre des newbies.",

      created_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 2,
      id_user: 2,
      id_post: 2,

      content:
        "J'adore ce film! Il est incroyable. Je l'ai ??couter des centaines de fois et j'adore comment il est fait avec tout les bon acteurs! Si vous voulez ??couter ce film, je vous le dit vous devez absolument l'??couter!!! Si vous ??tes sur le point de l'??couter: Bon film!!! Et si vous venez de l'??couter: Comment l'avez vous trouver?!",

      created_at: new Date(Date.now()).toUTCString(),
      updated_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 3,
      id_user: 3,
      id_post: 2,

      content:
        "Un film incroyable qui est  le premier volet de plusieurs suite. Dans ce film nous faisons la d??couverte d'un nouvel univers, l'univers de la piraterie. De nombreux combat ?? l'??p??e, bataille sur mer, nous ??blouissent durant ce film. M??me s'il y a quand m??me quelques faux raccords, on ne les remarque g??n??ralement pas.",

      created_at: new Date(Date.now()).toUTCString(),
    },
    {
      id: 4,
      id_user: 3,
      id_post: 1,

      content:
        "C'est toujours une ??motion intense de retrouver l'univers de Star Wars. La magie a op??r??e en moi car les moyens techniques d??ploy??s sont impressionnants et le visuel frise la perfection.Oui, il y a quelques incrustations d'images qui n'ont pas ??t?? assez peaufin??es. J'imagine la pression au niveau du timing pour terminer le projet. Ceci dit, plusieurs passages m'ont troubl?? par leur manque de finesse. L'??quipe de sc??naristes a d?? se tordre les m??ninges pour r??pondre ?? toutes les donn??es de Lucas et instructions de Disney. Il y a m??me une performance au niveau du montage pour faire revenir la Princesse Leia. Mais n'??tait il pas possible de r??aliser un film digne avec une histoire originale avec sa nouvelle troupe d'acteurs tout en gardant les anciens pour donner du cr??dit ?? leur qu??te. J'esp??rais un nouveau d??part mais pas assister ?? un ensemble de recettes d??j?? utilis??es par Lucas. ?? l'??poque, il s'agissait de rebondissements grandioses. Quand Luke apprend qu'il est le fils de Vador, c'est g??nial et tellement original ?? l'??poque. Mais dans ce 9??me volet, 40 ans apr??s, JJ Abrams abuse et tourne au ridicule certaines sc??nes qui malgr?? le d??ploiement de moyens m'ont donn?? envie de rire. J'ai eu du mal ?? comprendre les objectifs de Rey et me sentir touch?? par le conflit avec Kylo. Apr??s coup, j'ai l'impression qu'elle suivait la trame d'un ??pisode de Dora l'exploratrice. J'ai eu du mal ?? comprendre l'enjeu de son aventure alors que tout ??tait r??solu ?? la fin du Retour des Jedis.George Lucas avait selon moi un peu p??dal?? dans le vide avec sa seconde trilogie qui est devenue la premi??re. On a pu d??couvrir les origines de Dark Vador mais consacrer 3 films ??tait un peu trop ambitieux. Certains passages ??taient tr??s ennuyeux. Sans int??r??t.  Si ce n'est que Lucas a permis de d??velopper un march?? pour les produits d??riv??s. ?? l'??poque du Retour du Jedi, Walt Disney participait d??j?? au d??veloppement du marketing. Pour preuve, j'ai un produit de l'??poque estampill?? par Disney. Donc, il s'agit d'un oubli de la part des fans de condamner trop facilement la 3??me trilogie. Lucas avait succomb?? au plaisir d'accumuler des dollars. Comme Lucas ??tait un tr??s bon conteur, nous sommes tomb??s sous le charme des Ewoks. ?? vrai dire, ils enrichissaient l'univers. Et j'ai ressenti une ??motion intense quand j'ai vu leur propre aventure au cin??ma. Mais c'??tait ?? une certaine p??riode et aussi, je faisais partie du public cible.. ??tant un enfant. Nous ??tions baign??s dans les Rocky 1-2-3-4-5 et autres superproductions cin??matographiques du genre qui nous semblent maintenant des navets, qui agacaient certains mais qui faisaient partie d'une ??poque. Je respecte ces films car ils nous ont procur?? des ??motions, du plaisir mais ils appartiennent ?? ces ann??es.J'esp??re que Disney, qui a maintenant pu largement r??cup??rer son investissement en 2019, va bient??t nous offrir une nouvelle s??rie d'aventures dans l'univers de Star Wars et nous faire revivre des ??motions dignes d'un 'Empire contre-attaque'. Comme nous avons largement contribu?? ?? leur enrichissement, il est temps de nous r??compenser.'",

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
