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
('Google', 'google', 'Il y a un tout petit problème sur : sur l''accueil du site on ne peut pas activer nos extensions de navigateur.. Personnelement je trouve ça très chiant', 'https://www.google.com/', 'Ordinateur', 'Casse-tête', 'ph1.jpg', 1),
('Wikipédia', 'wikipedia', 'Le site ne s''ouvre plus sur téléphone quand on passe par Safari j''ai essayé sur d''autres navigateurs et je n''ai eu aucun problème', 'https://fr.wikipedia.org/', 'Mobile', 'Bloquant', 'ph2.jpg', 2),
('Facebook', 'facebook', 'Sur téléphone les messages bloquent à cause de messenger..', 'https://facebook.com/', 'Mobile', 'Bloquant', 'ph3.jpg', 3),
('Npm', 'npm', 'Impossible d''y accèder sur téléphone ou alors il faut le faire en navigation privé', 'https://www.npmjs.com/', 'Mobile', 'Casse-tête', 'ph4.jpg', 4);


INSERT INTO "comment" ("description", "user_id", "website_id") 
VALUES 
('Jai rencontré le même problème le 27/01/2023 cela na toujours pas été corrigé', 1, 1),
('Cest problématique quand les devs ne corrigent pas ces bugs..', 2, 1),
('Alala', 3, 1),
('Non mais on est où là?', 2, 2),
('Ils se font tellement d''argent comment c''est possible', 2, 3),
('Ridicule', 2, 4),
('Sans rigole..', 4, 4),
('Faut les emmener au pilori', 3, 1),
('On dira rien..', 3, 2);

-- Mettre un slug pour chaque titre
INSERT INTO "article" ("title", "slug", "description", "user_id")
VALUES 
('Les lecteurs d''écrans : Une Porte Virtuelle vers l''Accessibilité Numérique', 'les-lecteurs-decrans-une-porte-virtuelle-vers-laccessibilite-numerique','Les lecteurs d''écrans sont des héros discrets de l''accessibilité numérique. Pour les utilisateurs malvoyants ou aveugles, ces logiciels transforment le texte affiché à l''écran en discours vocal, ou en braille pour ceux équipés de dispositifs tactiles. Cette technologie révolutionnaire ouvre les portes du cyberespace à une plus grande diversité d''utilisateurs, leur permettant de naviguer sur Internet, de lire des documents et de communiquer en ligne de manière autonome. À mesure que la technologie évolue, les lecteurs d''écrans s''améliorent, offrant une expérience toujours plus fluide et intuitive pour les personnes en situation de handicap visuel.', 1),
('Police d''Écriture et Accessibilité : Allier Style et Clarté', 'police-decriture-et-accessibilite-allier-style-et-clarte','Dans l''univers du design web, choisir la bonne police d''écriture revêt une importance cruciale pour l''accessibilité. Pour les personnes atteintes de déficiences visuelles, une police claire et lisible est essentielle pour naviguer sur les sites web. Des polices comme Arial, Verdana ou Open Sans sont largement recommandées pour leur lisibilité sur divers écrans et tailles de texte. En France, où l''accessibilité numérique est réglementée, le choix de la police fait partie intégrante de la conception inclusive des sites web. Allier style et clarté permet de garantir une expérience de navigation fluide pour tous les utilisateurs, indépendamment de leurs capacités visuelles.', 1),
('Accessibilité Web en France : Une Voie vers l''Inclusion Numérique', 'accessibilite-web-en-france-une-voie-vers-linclusion-numerique','En France, l''accessibilité web est au cœur des préoccupations pour garantir une expérience en ligne inclusive. La loi Handicap de 2005 exige que les sites web, tant publics que privés, soient accessibles à tous, notamment aux personnes en situation de handicap. Des directives strictes sont établies pour assurer que les sites web respectent les normes d''accessibilité, allant de l''utilisation de balises alt pour décrire les images aux pratiques de conception adaptées pour une navigation aisée au clavier. Cette démarche vise à briser les barrières numériques et à promouvoir une société plus inclusive, où chacun peut pleinement participer à la vie en ligne.', 1);
COMMIT;
