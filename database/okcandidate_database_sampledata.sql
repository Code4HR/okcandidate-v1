﻿---
-- Password Temp --
---
INSERT INTO users (username, email, scope, password, survey) VALUES
('blueberry', 'katyperry@january.apothecary','admin', 'evolutionary', 0),
('other', 'other@keepinitreal.com','user', 'otherpass', 1);

---------------
-- Geography --
---------------
INSERT INTO geography (id, geography_name)
VALUES (1, 'At Large');

------------
-- Survey --
------------
INSERT INTO survey (id, survey_name)
VALUES (1, '2016 Virginia Beach Election');

--------------
-- Category --
--------------
INSERT INTO category (id, category_name, survey_id) VALUES
(1, 'Vision / Quality of Life', 1),
(2, 'Local Economy / Economic Development', 1),
(3, 'Planning', 1),
(4, 'Transportation', 1),
(5, 'Education', 1),
(6, 'Environment', 1),
(7, 'Public Safety', 1),
(8, 'Regionalism', 1);

--------------
-- Question --
--------------
INSERT INTO question (id, survey_id, category_id, question_text) VALUES
(1,1,1,'Should Virginia Beach do more, less, or about the same to attract and retain young residents?'),
(2,1,1,'Should Virginia Beach do more, less, or about the same to attract and retain retirees?'),
(3,1,2,'Do you want the arena at the Oceanfront?'),
(4,1,2,'Should we do more, less, or the same amount to diversify our economy in Virginia Beach?'),
(5,1,2,'Should some City Hall offices be moved to Town Center?'),
(6,1,3,'Do you support the plan to concentrate redevelopment in Strategic Growth Areas like Pembroke, Centerville, Rosemont, and Lynnhaven?'),
(7,1,3,'What is your view of development south of the Green Line urban growth boundary?'),
(8,1,4,'Should Virginia Beach extend The Tide light rail to Town Center?'),
(9,1,4, 'Is it important to you to have easier travel between work and home?'),
(10,1,4, 'Is it important to you to have better neighborhood roads and connectors?'),
(11,1,4, 'Is it important to you to have easier travel between major areas in the Virginia Beach?'),
(12,1,4, 'Is it important to you to have better public transportation options?'),
(13,1,4, 'Is it important to you to maintain our existing road infrastructure?'),
(14,1,5,'How do you feel about the city budget?'),
(15,1,5,'Should we decrease, maintain current levels, or increase funding for Virginia Beach City Public Schools?'),
(16,1,5,'Should we change the funding formula for Virginia Beach City Public Schools?'),
(17,1,7,'Should there be greater civilian oversight of the police department?'),
(18,1,8,'Should Virginia Beach cooperate with Norfolk more, less, or the same amount?'),
(19,1,8,'Is Virginia Beach engaged with regional planning too little, too much, or the right amount?'),
(20,1,6,'Should we do more, less, or about the same to protect Virginia Beach homes, businesses, and public facilities from flooding? '),
(21,1,6,'Should Virginia Beach do more, less, or about the same to mitigate sea level rise?');

------------
-- Answer --
------------
INSERT INTO answer (id, question_id, answer_label, answer_value) VALUES
(1,1,'Less','Less'),
(2,1,'Same','Same'),
(3,1,'More','More'),
(4,2,'Less','Less'),
(5,2,'Same','Same'),
(6,2,'More','More'),
(7,3,'Yes','Yes'),
(8,3,'No','No'),
(9,4,'Less','Less'),
(10,4,'Same','Same'),
(11,4,'More','More'),
(12,5,'Yes','Yes'),
(13,5,'No','No'),
(14,6,'SGAs are great for the city','SGAs are great for the city'),
(15,6,'I like the SGAs but want changes to them','I like the SGAs but want changes to them'),
(16,6,'I don''t like SGAs at all','I don''t like SGAs at all'),
(17,7,'No development should be allowed south of the Green Line','No development should be allowed south of the Green Line'),
(18,7,'Some development should be allowed south of the Green Line','Some development should be allowed south of the Green Line'),
(19,7,'South of the Green Line should be wide open to development','South of the Green Line should be wide open to development'),
(20,8,'Yes','Yes'),
(21,8,'No','No'),
(22,9,'Yes','Yes'),
(23,9,'No','No'),
(24,10,'Yes','Yes'),
(25,10,'No','No'),
(26,11,'Yes','Yes'),
(27,11,'No','No'),
(28,12,'Yes','Yes'),
(29,12,'No','No'),
(30,13,'Yes','Yes'),
(31,13,'No','No'),
(32,14,'The budget demonstrates good management of our taxes','The budget demonstrates good management of our taxes'),
(33,14,'The budget is OK but needs some work','The budget is OK but needs some work'),
(34,14,'We are mismanaging our funds should overhaul the budget','We are mismanaging our funds should overhaul the budget'),
(35,15,'Decrease','Decrease'),
(36,15,'Maintain','Maintain'),
(37,15,'Increase','Increase'),
(38,16,'Yes','Yes'),
(39,16,'No','No'),
(40,17,'Yes','Yes'),
(41,17,'Maybe','Maybe'),
(42,17,'No','No'),
(43,18,'More','More'),
(44,18,'Less','Less'),
(45,18,'Same','Same'),
(46,19,'Too little','Too little'),
(47,19,'Too much','Too much'),
(48,19,'The right amount','The right amount'),
(49,20,'More','More'),
(50,20,'Less','Less'),
(51,20,'Same','Same'),
(52,21,'More','More'),
(53,21,'Same','Same'),
(54,21,'Less','Less');

---------------------
--- Candidate Type --
---------------------
INSERT INTO candidate_type (id, type_name)
VALUES (1, 'Mayor'), (2, 'City Council - At Large')
    , (3, 'City Council - Centerville'), (4, 'City Council - Kempsville')
    , (5, 'City Council - Rose Hall');

---------------
-- Candidate --
---------------
INSERT INTO candidate (id, candidate_name, candidate_website, candidate_type_id) VALUES
(1, 'A.M. "Don" Weeks', 'http://www.donweeksformayor.com', 1),
(2, 'Jessica Abbott', 'https://jessicapabbott.com', 4),
(3, 'Shannon Kane', 'http://shannonforcouncil.com', 5),
(4, 'Rosemary Wilson', 'http://www.rosemarywilson2016.com', 2),
(5, 'Pam Witham', 'http://www.pamwitham.com', 2),
(6, 'Dane U. Blythe', 'http://www.blytheforcitycouncil.com', 2),
(7, 'Robert K. Dean', 'http://robertdeanforcitycouncil.com', 5),
(8, 'Bobby Dyer', 'http://pilotonline.com/news/government/local/find-out-who-s-running-for-virginia-beach-mayor-and/article_1e1d1356-fba7-5123-9f75-1374ea9dc3d8.html', 3),
(9, 'Richard W. "RK" Kowalewitch', 'http://rkformayor.com', 1),
(10, 'William D. Sessoms, Jr.', 'http://www.sessomsformayor.com', 1),
(11, 'Courtney LaLonde', 'http://www.courtneylalonde.com', 2),
(12, 'George Furman III', 'https://ballotpedia.org/George_Furman_III', 1),
(13, 'Amelia Ross-Hammond', 'https://www.rosshammond.org', 4);

----------------------
-- Candidate Answer --
----------------------
INSERT INTO candidate_answer (id, candidate_id, question_id, answer_id, intensity) VALUES
(1,2,1,3,5),
(2,2,2,6,5),
(3,2,3,8,4),
(4,2,4,11,5),
(5,2,5,13,2),
(6,2,6,15,3),
(7,2,7,18,3),
(8,2,8,21,4),
(9,2,9,22,5),
(10,2,10,24,5),
(11,2,11,26,5),
(12,2,12,28,5),
(13,2,13,30,5),
(14,2,14,34,5),
(15,2,15,37,5),
(16,2,16,38,4),
(17,2,17,40,4),
(18,2,18,45,3),
(19,2,19,48,3),
(20,2,20,49,5),
(21,2,21,52,4),
(22,3,1,3,5),
(23,3,2,6,4),
(24,3,3,7,4),
(25,3,4,11,5),
(26,3,5,13,2),
(27,3,6,15,4),
(28,3,7,17,3),
(29,3,8,20,3),
(30,3,9,22,5),
(31,3,10,24,5),
(32,3,11,26,5),
(33,3,12,28,5),
(34,3,13,30,5),
(35,3,14,33,4),
(36,3,15,37,5),
(37,3,16,39,3),
(38,3,17,40,4),
(39,3,18,43,4),
(40,3,19,46,5),
(41,3,20,49,5),
(42,3,21,52,5),
(43,4,1,3,5),
(44,4,2,5,4),
(45,4,3,7,4),
(46,4,4,11,5),
(48,4,6,15,4),
(49,4,7,17,5),
(50,4,8,20,4),
(51,4,9,22,5),
(52,4,10,24,5),
(53,4,11,26,5),
(54,4,12,28,5),
(55,4,13,30,5),
(56,4,14,34,5),
(57,4,15,37,5),
(58,4,16,38,4),
(59,4,17,40,5),
(60,4,18,43,5),
(61,4,19,46,5),
(62,4,20,49,5),
(63,4,21,52,5),
(64,5,1,2,4),
(65,5,2,5,5),
(66,5,3,8,4),
(67,5,4,11,5),
(68,5,5,13,3),
(69,5,6,16,4),
(70,5,7,17,5),
(71,5,8,21,5),
(72,5,9,23,5),
(73,5,10,25,5),
(74,5,11,27,5),
(75,5,12,29,5),
(76,5,13,30,5),
(77,5,14,34,5),
(78,5,15,36,5),
(79,5,16,39,3),
(80,5,17,42,4),
(81,5,18,45,4),
(82,5,19,47,4),
(83,5,20,49,5),
(84,5,21,52,5),
(85,1,1,3,5),
(86,1,2,5,3),
(87,1,3,8,4),
(88,1,4,11,5),
(89,1,5,13,2),
(90,1,6,16,4),
(91,1,7,17,3),
(92,1,8,21,4),
(93,1,9,22,4),
(94,1,10,24,4),
(95,1,11,26,4),
(96,1,12,28,4),
(97,1,13,30,4),
(98,1,14,34,5),
(99,1,15,37,5),
(100,1,16,38,5),
(101,1,17,41,3),
(102,1,18,43,4),
(103,1,19,46,4),
(104,1,20,49,5),
(105,1,21,52,4),
(106,6,1,3,5),
(107,6,2,6,5),
(108,6,3,8,1),
(109,6,4,11,5),
(110,6,5,13,4),
(111,6,6,16,4),
(112,6,7,17,4),
(113,6,8,21,5),
(114,6,9,22,5),
(115,6,10,24,5),
(116,6,11,26,5),
(117,6,12,28,5),
(118,6,13,30,5),
(119,6,14,34,5),
(120,6,15,36,5),
(121,6,16,39,4),
(122,6,17,42,5),
(123,6,18,43,3),
(124,6,19,48,4),
(125,6,20,49,5),
(126,6,21,52,5),
(127,7,1,2,3),
(128,7,2,5,5),
(129,7,3,8,5),
(130,7,4,11,5),
(131,7,5,13,1),
(132,7,6,16,5),
(133,7,7,18,4),
(134,7,8,21,5),
(135,7,9,23,4),
(136,7,10,24,4),
(137,7,11,27,4),
(138,7,12,29,4),
(139,7,13,30,4),
(140,7,14,34,5),
(141,7,15,36,5),
(142,7,16,38,5),
(143,7,17,41,3),
(144,7,18,44,1),
(145,7,19,47,1),
(146,7,20,49,5),
(147,7,21,52,5),
(148,8,1,3,5),
(149,8,2,6,5),
(150,8,3,7,5),
(151,8,4,11,5),
(152,8,5,13,3),
(153,8,6,15,3),
(154,8,7,17,3),
(155,8,8,21,5),
(156,8,9,22,5),
(157,8,10,24,5),
(158,8,11,26,5),
(159,8,12,28,5),
(160,8,13,30,5),
(161,8,14,33,5),
(162,8,15,37,5),
(163,8,16,39,5),
(164,8,17,40,4),
(165,8,18,43,4),
(166,8,19,48,4),
(167,8,20,49,5),
(168,8,21,53,3),
(169,9,1,3,5),
(170,9,2,6,5),
(171,9,3,8,5),
(172,9,4,10,5),
(173,9,5,13,1),
(174,9,6,16,3),
(175,9,7,17,5),
(176,9,8,21,5),
(177,9,9,23,3),
(178,9,10,25,3),
(179,9,11,27,3),
(180,9,12,28,3),
(181,9,13,30,3),
(182,9,14,34,5),
(183,9,15,36,5),
(184,9,16,39,1),
(185,9,17,40,5),
(186,9,18,45,3),
(187,9,19,48,5),
(188,9,20,49,5),
(189,9,21,52,3),
(190,10,1,3,5),
(191,10,2,6,5),
(192,10,3,7,5),
(193,10,4,11,5),
(195,10,6,14,5),
(196,10,7,17,5),
(197,10,8,20,5),
(198,10,9,22,5),
(199,10,10,24,5),
(200,10,11,26,5),
(201,10,12,28,5),
(202,10,13,30,5),
(203,10,14,32,5),
(204,10,15,37,5),
(205,10,16,39,1),
(206,10,17,41,3),
(207,10,18,45,5),
(208,10,19,48,5),
(209,10,20,49,5),
(210,10,21,52,5),
(211,11,1,3,4),
(212,11,2,5,4),
(213,11,3,7,4),
(214,11,4,11,5),
(215,11,5,13,2),
(216,11,6,14,4),
(217,11,7,18,3),
(218,11,8,20,5),
(219,11,9,22,5),
(220,11,10,24,5),
(221,11,11,26,5),
(222,11,12,28,5),
(223,11,13,30,5),
(224,11,14,32,5),
(225,11,15,37,5),
(226,11,16,38,4),
(227,11,17,42,3),
(228,11,18,43,5),
(229,11,19,46,5),
(230,11,20,49,5),
(231,11,21,52,5),
(232,12,1,3,5),
(233,12,2,6,5),
(234,12,3,8,5),
(235,12,4,11,5),
(236,12,5,12,3),
(237,12,6,15,4),
(238,12,7,17,3),
(239,12,8,21,5),
(240,12,9,22,5),
(241,12,10,24,5),
(242,12,11,26,5),
(243,12,12,28,5),
(244,12,13,30,5),
(245,12,14,34,5),
(246,12,15,37,5),
(247,12,16,38,5),
(248,12,17,40,4),
(249,12,18,45,3),
(250,12,19,48,3),
(251,12,20,49,5),
(252,12,21,52,5),
(253,13,1,3,5),
(254,13,2,5,3),
(255,13,3,7,4),
(256,13,4,11,4),
(257,13,5,13,3),
(258,13,6,14,3),
(259,13,7,17,5),
(260,13,8,20,5),
(261,13,9,22,5),
(262,13,10,24,5),
(263,13,11,26,5),
(264,13,12,28,5),
(265,13,13,30,5),
(266,13,14,32,5),
(267,13,15,37,5),
(268,13,16,39,3),
(269,13,17,42,3),
(270,13,18,43,4),
(271,13,19,48,4),
(272,13,20,49,5),
(273,13,21,52,5);

-------------------------
-- Candidate Geography --
-------------------------
INSERT INTO candidate_geography (candidate_id, geography_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1);
