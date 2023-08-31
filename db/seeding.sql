BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

INSERT INTO "website" ("title", "slug", "description", "address","device", "level")
VALUES 
('Google', 'google', 'Il y a un tout petit problème.', 'https://www.google.com/', 'Ordinateur', 'Casse-tête'),
('Wikipédia', 'wikipedia', 'Pas jojo', 'https://fr.wikipedia.org/', 'Mobile', 'Bloquant'),
('Facebook', 'facebook', 'Nul', 'https://facebook.com/', 'Mobile', 'Bloquant'),
('Npm', 'npm', 'Des soucis', 'https://www.npmjs.com/', 'Mobile', 'Casse-tête');


TRUNCATE "user", "website";




COMMIT;
