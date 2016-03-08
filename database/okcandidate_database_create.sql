--CREATE ROLE survey_manager LOGIN ENCRYPTED PASSWORD 'md52e5db3de6105661d19e5f4dd2e7b67cc' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
--CREATE DATABASE okcandidate WITH ENCODING='UTF8' CONNECTION LIMIT=-1;

DROP TABLE IF EXISTS survey_answer;
DROP TABLE IF EXISTS survey_response;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS data_type;
DROP TABLE IF EXISTS survey;
DROP TABLE IF EXISTS congressional_district;
DROP TABLE IF EXISTS response_type;
DROP TABLE IF EXISTS users;

-- CREATE TABLE IF NOT EXISTS users (
-- 	id SERIAL PRIMARY KEY,
-- 	user_name char(50) NOT NULL,
-- 	user_password char(50) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS response_type (
-- 	id SERIAL PRIMARY KEY,
-- 	response_type char(100) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS congressional_district (
-- 	id SERIAL PRIMARY KEY,
-- 	district char(100) 
-- );
-- 
-- CREATE TABLE IF NOT EXISTS survey (
-- 	id SERIAL PRIMARY KEY,
-- 	survey_name char(255) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS category (
-- 	id SERIAL PRIMARY KEY,
-- 	category_name char(100) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS data_type (
-- 	id SERIAL PRIMARY KEY,
-- 	type_name char(100) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS question (
-- 	id SERIAL PRIMARY KEY,
-- 	survey_id int NOT NULL REFERENCES survey,
-- 	category_id int REFERENCES category,
-- 	data_type int REFERENCES data_type,
-- 	question_text char(255) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS answer (
-- 	id SERIAL PRIMARY KEY,
-- 	question_id int NOT NULL REFERENCES question,
-- 	answer_label char(255) NOT NULL,
-- 	answer_value char(255) NOT NULL,
-- 	answer_order int NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS survey_response (
-- 	id SERIAL PRIMARY KEY,
-- 	survey_id int NOT NULL REFERENCES survey,
-- 	response_type int NOT NULL REFERENCES response_type,
-- 	congressional_district int NOT NULL REFERENCES congressional_district,
-- 	score numeric(10, 6) NOT NULL
-- );
-- 
-- CREATE TABLE IF NOT EXISTS survey_answer (
-- 	id SERIAL PRIMARY KEY,
-- 	survey_response_id int NOT NULL REFERENCES survey_response,
-- 	question_id int NOT NULL REFERENCES question,
-- 	answer_id int NOT NULL REFERENCES answer,
-- 	score numeric(10, 6) NOT NULL
-- );