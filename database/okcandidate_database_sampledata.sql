-------------------
-- Response Type --
-------------------
INSERT INTO response_type (response_type)
VALUES ('Candidate'), ('Citizen');

------------
-- Survey --
------------
INSERT INTO survey (survey_name)
VALUES ('2016 Norfolk Mayor & Council Race');

--------------
-- Category --
--------------
INSERT INTO category (category_name)
VALUES ('Education'), ('Environment'), ('Public Works'), ('Revenue'), ('Economic Development'),
('Tourism'), ('Public Safety'), ('Health and Human Services'), ('Arts, Entertainment, and Culture');

---------------
-- Data Type --
---------------
INSERT INTO data_type (type_name)
VALUES ('Multiple Choice'), ('Scale');

--------------
-- Question --
--------------
INSERT INTO question (survey_id, category_id, data_type, question_text) VALUES
((SELECT id FROM survey WHERE survey_name = '2016 Norfolk Mayor & Council Race'), 
 (SELECT id FROM category WHERE category_name = 'Education'),
 (Select id FROM data_type WHERE type_name = 'Multiple Choice'),
 'Which of the following best describes your attitude toward K-12 education in your city?'),
((SELECT id FROM survey WHERE survey_name = '2016 Norfolk Mayor & Council Race'), 
 (SELECT id FROM category WHERE category_name = 'Education'),
 (Select id FROM data_type WHERE type_name = 'Scale'),
 'How important is K-12 education in your city?');

------------
-- Answer --
------------
INSERT INTO answer (question_id, answer_label, answer_value, answer_order) VALUES
((SELECT id FROM question WHERE question_text = 'Which of the following best describes your attitude toward K-12 education in your city?'),
 'We need to overhaul and reinvest in our public K-12 system',
 1,
 1),
 ((SELECT id FROM question WHERE question_text = 'Which of the following best describes your attitude toward K-12 education in your city?'),
 'We need to change our approach to K-12 education in support of privately funded alternatives',
 2,
 2),
 ((SELECT id FROM question WHERE question_text = 'Which of the following best describes your attitude toward K-12 education in your city?'),
 'We need a comprehensive approach that boosts our public system while introducing alternative approaches',
 3,
 3),
((SELECT id FROM question WHERE question_text = 'How important is K-12 education in your city?'),
 'Not Important',
 1,
 1),
((SELECT id FROM question WHERE question_text = 'How important is K-12 education in your city?'),
 '2',
 2,
 2),
((SELECT id FROM question WHERE question_text = 'How important is K-12 education in your city?'),
 '3',
 3,
 3),
((SELECT id FROM question WHERE question_text = 'How important is K-12 education in your city?'),
 '4',
 4,
 4),
((SELECT id FROM question WHERE question_text = 'How important is K-12 education in your city?'),
 'Important',
 5,
 5);