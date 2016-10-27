--CREATE DATABASE okcandidate WITH ENCODING='UTF8' CONNECTION LIMIT=-1;

--CREATE ROLE survey_manager LOGIN ENCRYPTED PASSWORD 'password' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

--GRANT SELECT, INSERT, UPDATE, DELETE
--ON ALL TABLES IN SCHEMA public
--TO okc;
-- --
--GRANT USAGE, SELECT
--ON ALL SEQUENCES IN SCHEMA public
--TO okc;

DROP TABLE IF EXISTS candidate_geography;
DROP TABLE IF EXISTS candidate_answer;
DROP TABLE IF EXISTS candidate;
DROP TABLE IF EXISTS candidate_type;
DROP TABLE IF EXISTS survey_answer;
DROP TABLE IF EXISTS survey_response;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS data_type;
DROP TABLE IF EXISTS survey;
DROP TABLE IF EXISTS congressional_district;
DROP TABLE IF EXISTS geography;
DROP TABLE IF EXISTS response_type;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username varchar(100),
	email varchar(255),
	scope varchar(100),
	password varchar(100),
	survey int
);

CREATE TABLE IF NOT EXISTS geography (
 	id SERIAL PRIMARY KEY,
 	geography_name varchar(100)
 );

CREATE TABLE IF NOT EXISTS survey (
	id SERIAL PRIMARY KEY,
	survey_name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
	id SERIAL PRIMARY KEY,
	category_name varchar(100) NOT NULL,
	survey_id int NOT NULL references survey
);

CREATE TABLE IF NOT EXISTS question (
	id SERIAL PRIMARY KEY,
	survey_id int NOT NULL REFERENCES survey,
	category_id int REFERENCES category,
	question_text varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS answer (
	id SERIAL PRIMARY KEY,
	question_id int NOT NULL REFERENCES question,
	answer_label varchar(255) NOT NULL,
	answer_value varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS survey_response (
	id SERIAL PRIMARY KEY,
	survey_id int NOT NULL REFERENCES survey,
	geography_id int NOT NULL REFERENCES geography,
	user_email varchar(100),
	user_phone varchar(50),
	neighborhood varchar(100)
);

CREATE TABLE IF NOT EXISTS survey_answer (
	id SERIAL PRIMARY KEY,
	survey_response_id int NOT NULL REFERENCES survey_response,
	question_id int NOT NULL REFERENCES question,
	answer_id int NOT NULL REFERENCES answer,
	intensity int
);

CREATE TABLE IF NOT EXISTS candidate_type (
	id SERIAL PRIMARY KEY,
	type_name varchar(100)
);

CREATE TABLE IF NOT EXISTS candidate (
	id SERIAL PRIMARY KEY,
	candidate_name varchar(100),
	candidate_img varchar(100),
	candidate_website varchar(100),
	candidate_type_id int NOT NULL REFERENCES candidate_type
);

CREATE TABLE IF NOT EXISTS candidate_answer (
	id SERIAL PRIMARY KEY,
	candidate_id int NOT NULL REFERENCES candidate,
	question_id int NOT NULL REFERENCES question,
	answer_id int NOT NULL REFERENCES answer,
	intensity int
);

CREATE TABLE IF NOT EXISTS candidate_geography (
	id SERIAL PRIMARY KEY,
	candidate_id int NOT NULL REFERENCES candidate,
	geography_id int NOT NULL REFERENCES geography
);
