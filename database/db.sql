-- consultas de la base de datos
CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2; --se autoincrementara de 2 en 2

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

DESCRIBE users;

--links
CREATE TABLE links (
  id INT(11) NOT NULL, --id
  title VARCHAR(150) NOT NULL, --titulo
  url VARCHAR(255) NOT NULL, --url
  description TEXT, --descripcion de que es el sitio
  user_id INT(11), --este enlace le pertenece a 1 usuario especifico
  created_at timestamp NOT NULL DEFAULT current_timestamp, --cuando fue creado este registro, se llena solo
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) --clave foranea para user_id
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;