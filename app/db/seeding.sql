BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE "user", "website", "comment", "article" CASCADE;
-- L'utilisation de CASCADE dans la commande TRUNCATE permet de tronquer non seulement la table spécifiée, mais aussi toutes les tables qui dépendent directement ou indirectement de la table spécifiée via des contraintes de clé étrangère.


INSERT INTO "user" ("email", "hash") 
VALUES 
('utilisateur1@gmail.com', '$2b$10$2woNoucdg00SlRj7GradG.VwUS1uQWPYfhTmWCn0UeXD47NAYLxNW'),
('utilisateur2@gmail.com', '$2b$10$2woNoucdg00SlRj7GradG.VwUS1uQWPYfhTmWCn0UeXD47NAYLxNW'),
('utilisateur3@gmail.com', '$2b$10$2woNoucdg00SlRj7GradG.VwUS1uQWPYfhTmWCn0UeXD47NAYLxNW'),
('utilisateur4@gmail.com', '$2b$10$2woNoucdg00SlRj7GradG.VwUS1uQWPYfhTmWCn0UeXD47NAYLxNW');


-- $2b$10$2woNoucdg00SlRj7GradG.VwUS1uQWPYfhTmWCn0UeXD47NAYLxNW = Utilisateur-7805

INSERT INTO "website" ("title", "slug", "description", "address", "device", "level", "image", "user_id")
VALUES 
('Google', 'google', 'Il y a un tout petit problème.', 'https://www.google.com/', 'Ordinateur', 'Casse-tête', 'ph1.jpg', 1),
('Wikipédia', 'wikipedia', 'Pas jojo', 'https://fr.wikipedia.org/', 'Mobile', 'Bloquant', 'ph2.jpg', 2),
('Facebook', 'facebook', 'Nul', 'https://facebook.com/', 'Mobile', 'Bloquant', 'ph3.jpg', 3),
('Npm', 'npm', 'Des soucis', 'https://www.npmjs.com/', 'Mobile', 'Casse-tête', 'ph4.jpg', 4);


INSERT INTO "comment" ("description", "user_id", "website_id") 
VALUES 
('Jai rencontré le même problème le 27/01/2023 cela na toujours pas été corrigé', 1, 1),
('Cest problématique quand les devs ne corrigent pas ces bugs..', 2, 1),
('Alala', 3, 1),
('Non mais on est où là?', 2, 2),
('Ils se font tellement d''argent comment c''est possible', 2, 3);
('Ridicule', 2, 4);
('Sans rigole..', 4, 4);
('Faut les emmener au pilori', 3, 1);
('On dira rien..', 3, 2);


COMMIT;
