CREATE KEYSPACE ecommerce WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE ecommerce.advertisements (id uuid PRIMARY KEY, name text, description text, createdAt timestamp, updatedAt timestamp, expiresAt timestamp, shownCount int);

CREATE TABLE ecommerce.logs (id uuid PRIMARY KEY, user text, createdAt timestamp, request text, params text);