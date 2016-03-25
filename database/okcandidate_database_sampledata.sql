---------------
-- Geography --
---------------
INSERT INTO geography (id, geography_name)
VALUES (1, 'Super Ward 6'), (2, 'Super Ward 7');

------------
-- Survey --
------------
INSERT INTO survey (id, survey_name)
VALUES (1, '2016 Norfolk Mayor & Council Race');

--------------
-- Category --
--------------
INSERT INTO category (id, category_name) VALUES 
(1, 'Transportation'),
(2, 'Economic Development'),
(3, 'City Engagement & Government'),
(4, 'Public Safety & Crime'),
(5, 'Sea Level Rise & The Environment'),
(6, 'Neighborhoods and Quality of Life'),
(7, 'Education');

--------------
-- Question --
--------------
INSERT INTO question (id, survey_id, category_id, question_text) VALUES
(1, 1, 1, 'Do you support the city''s Complete Streets initiative?'),
(2, 1, 1, 'Was The Tide a good use of city money?'),
(3, 1, 1, 'Would you support reducing car lanes to accommodate more bike lanes?'),
(4, 1, 1, 'Where should The Tide go next?'),
(5, 1, 1, 'Choose one project:'),
(6, 1, 1, 'Do you own a bike?'),
(7, 1, 1, 'Have you ridden public transit in the past three months?'),
(8, 1, 1, 'The city spend limited transportation dollars on:'),
(9, 1, 2, 'What should the city emphasize first:'),
(10, 1, 2, 'Was The Main a good use of city money?'),
(11, 1, 2, 'How will the new Waterside affect local businesses?'),
(12, 1, 2, 'Has the city spent too much, too little or the right amount of money downtown?'),
(13, 1, 2, 'What is your opinion on the best method of luring business to Norfolk?'),
(14, 1, 2, 'Should Norfolk embrace the sharing economy (things like Uber, AirBNB)?'),
(15, 1, 2, 'Would you have voted for $18 million to redevelop J.C. Penney at Military Circle?'),
(16, 1, 2, 'Is the city doing enough to keep as much of the Navy and other military installations here in Norfolk?'),
(17, 1, 3, 'Which word better describes the City of Norfolk government:'),
(18, 1, 3, 'What is your opinion on government meetings?'),
(19, 1, 3, 'Has Norfolk''s efforts to engage citizens on major decisions been:'),
(20, 1, 3, 'Should mayor and city council have term limits in Norfolk?'),
(21, 1, 3, 'Should municipal elections be moved to November?'),
(22, 1, 4, 'Pick one: What do you think should be done to decrease crime in Norfolk?'),
(23, 1, 4, 'My feelings on marijuana in Norfolk are:'),
(24, 1, 4, 'How should the city address the disparate incarceration rates between white and black citizens?'),
(25, 1, 5, 'Pick one project:'),
(26, 1, 5, 'Should the city be more aggressive in changing codes to require green infrastructure (i.e., green roofs, permeable pavement)?'),
(27, 1, 5, 'How should the city  deal with coal dust?'),
(28, 1, 6, 'What do you think should be done to preserve distressed properties in historic districts?'),
(29, 1, 6, 'Pick one spending priority for the neighborhoods outside of downtown:'),
(30, 1, 6, 'How would you help Norfolk''s waterfront?'),
(31, 1, 6, 'Norfolk''s park system is:'),
(32, 1, 6, 'Should the city require affordable housing in new developments?'),
(33, 1, 6, 'Should there be incentives to encourage reuse of vacant properties?'),
(34, 1, 6, 'Should backyard chickens be legal in Norfolk?'),
(35, 1, 7, 'Is the city spending enough on schools?'),
(36, 1, 7, 'Do you support magnet schools?'),
(37, 1, 7, 'Do you support charter schools?'),
(38, 1, 7, 'Did you send your kids to the Norfolk Public Schools?');

------------
-- Answer --
------------
INSERT INTO answer (id, question_id, answer_label, answer_value) VALUES
(1, 1, 'Yes, streets should accommodate bikes and pedestrians in addition to cars.', 'Yes, streets should accommodate bikes and pedestrians in addition to cars.'),
(2, 1, 'To a degree.', 'To a degree.'),
(3, 1, 'No. Our city was designed for vehicular traffic and should stay that way.', 'No. Our city was designed for vehicular traffic and should stay that way.'),
(4, 2, 'Absolutely. The Tide showed visionary leadership.', 'Absolutely. The Tide showed visionary leadership.'),
(5, 2, 'It remains to be seen.', 'It remains to be seen.'),
(6, 2, 'No. This was inefficient transportation spending.', 'No. This was inefficient transportation spending.'),
(7, 3, 'Yes.', 'Yes.'),
(8, 3, 'Possibly.', 'Possibly.'),
(9, 3, 'No.', 'No.'),
(10, 4, 'ODU', 'ODU'),
(11, 4, 'Norfolk International Airport', 'Norfolk International Airport'),
(12, 4, 'Naval Station Norfolk', 'Naval Station Norfolk'),
(13, 4, 'Virginia Beach', 'Virginia Beach'),
(14, 4, 'Nowhere', 'Nowhere'),
(15, 5, 'Bus service to the Norfolk International Airport', 'Bus service to the Norfolk International Airport'),
(16, 5, 'A citywide bike share program', 'A citywide bike share program'),
(17, 5, 'Expanded waterway transportation', 'Expanded waterway transportation'),
(18, 6, 'Yes.', 'Yes.'),
(19, 6, 'No.', 'No.'),
(20, 7, 'Yes.', 'Yes.'),
(21, 7, 'No.', 'No.'),
(22, 8, 'Expanding The Tide', 'Expanding The Tide'),
(23, 8, 'Expanding bus service', 'Expanding bus service'),
(24, 9, 'Expansion of existing businesses', 'Expansion of existing businesses'),
(25, 9, 'Attraction of businesses from outside the region', 'Attraction of businesses from outside the region'),
(26, 9, 'Development of new local businesses', 'Development of new local businesses'),
(27, 10, 'Absolutely', 'Absolutely'),
(28, 10, 'The jury is out', 'The jury is out'),
(29, 10, 'No', 'No'),
(30, 11, 'Healthy competition will benefit everyone.', 'Healthy competition will benefit everyone.'),
(31, 11, 'They’re appealing to different demographics, so it’s a moot point.', 'They’re appealing to different demographics, so it’s a moot point.'),
(32, 11, 'Negatively. The city is betting against itself.', 'Negatively. The city is betting against itself.'),
(33, 12, 'Too much.', 'Too much.'),
(34, 12, 'Too little.', 'Too little.'),
(35, 12, 'The right amount.', 'The right amount.'),
(36, 13, 'Incentives for small businesses including tax/rent reductions and other perks (similar to Vibrant Spaces).', 'Incentives for small businesses including tax/rent reductions and other perks (similar to Vibrant Spaces).'),
(37, 13, 'Tax breaks and real estate incentives for large companies to relocate.', 'Tax breaks and real estate incentives for large companies to relocate.'),
(38, 13, 'A mix of both methods.', 'A mix of both methods.'),
(39, 14, 'Yes, and quickly.', 'Yes, and quickly.'),
(40, 14, 'Yes, but it should wait for the state to develop a framework.', 'Yes, but it should wait for the state to develop a framework.'),
(41, 14, 'No. Everyone should play by the same rules.', 'No. Everyone should play by the same rules.'),
(42, 15, 'Yes.', 'Yes.'),
(43, 15, 'No.', 'No.'),
(44, 16, 'Yes.', 'Yes.'),
(45, 16, 'We can always do more.', 'We can always do more.'),
(46, 16, 'No.', 'No.'),
(47, 17, 'Transparent.', 'Transparent.'),
(48, 17, 'Closed.', 'Closed.'),
(49, 18, 'More can be done to increase transparency including recording meetings in their entirety.', 'More can be done to increase transparency including recording meetings in their entirety.'),
(50, 18, 'Enough is being done.', 'Enough is being done.'),
(51, 18, 'I think transparent government processes are unnecessary.', 'I think transparent government processes are unnecessary.'),
(52, 19, 'Good; people feel their voices are heard.', 'Good; people feel their voices are heard.'),
(53, 19, 'Adequate, if maybe too top down.', 'Adequate, if maybe too top down.'),
(54, 19, 'What citizen engagement?', 'What citizen engagement?'),
(55, 20, 'Yes.', 'Yes.'),
(56, 20, 'No.', 'No.'),
(57, 21, 'Yes.', 'Yes.'),
(58, 21, 'No.', 'No.'),
(59, 22, 'Increased staffing of the police department.', 'Increased staffing of the police department.'),
(60, 22, 'Increased community outreach and assistance to low-income families.', 'Increased community outreach and assistance to low-income families.'),
(61, 22, 'Increased investment in struggling neighborhoods to increase the quality of living and increase quality of local services.', 'Increased investment in struggling neighborhoods to increase the quality of living and increase quality of local services.'),
(62, 23, 'We need more police resources on the issue.', 'We need more police resources on the issue.'),
(63, 23, 'Norfolk’s approach is appropriate', 'Norfolk’s approach is appropriate'),
(64, 23, 'Marijuana should be policed and regulated like alcohol. ', 'Marijuana should be policed and regulated like alcohol. '),
(65, 24, 'It shouldn''t. The people who commit crimes are incarcerated blind to race.', 'It shouldn''t. The people who commit crimes are incarcerated blind to race.'),
(66, 24, 'The city should evaluate the possibility that law enforcement processes can be made more equitable.', 'The city should evaluate the possibility that law enforcement processes can be made more equitable.'),
(67, 24, 'America''s laws are inherently racist.', 'America''s laws are inherently racist.'),
(68, 25, 'A storm wall at the mouth of the Hague.', 'A storm wall at the mouth of the Hague.'),
(69, 25, 'Creek and wetland restoration in the St. Paul''s quadrant.', 'Creek and wetland restoration in the St. Paul''s quadrant.'),
(70, 25, 'Lifting houses and streets in vulnerable neighborhoods.', 'Lifting houses and streets in vulnerable neighborhoods.'),
(71, 25, 'Replenishing beaches.', 'Replenishing beaches.'),
(72, 26, 'Yes. This will be a priority of mine.', 'Yes. This will be a priority of mine.'),
(73, 26, 'No. Private property rights are sacred.', 'No. Private property rights are sacred.'),
(74, 27, 'Norfolk Southern is following the law', 'Norfolk Southern is following the law'),
(75, 27, 'The city should hire an independent researcher to test the impact on citizen health.', 'The city should hire an independent researcher to test the impact on citizen health.'),
(76, 27, 'The city should push Norfolk Southern to minimize impact on the surrounding neighborhoods, regardless of the EPA report.', 'The city should push Norfolk Southern to minimize impact on the surrounding neighborhoods, regardless of the EPA report.'),
(77, 28, 'Increase incentives to companies willing to invest.', 'Increase incentives to companies willing to invest.'),
(78, 28, 'Increase flexibility of local ordinances/codes/zoning to allow a greater flexibility of uses in historic structures as long as the building is preserved.', 'Increase flexibility of local ordinances/codes/zoning to allow a greater flexibility of uses in historic structures as long as the building is preserved.'),
(79, 28, 'Historic properties should not be given priority or special treatment by local ordinances.', 'Historic properties should not be given priority or special treatment by local ordinances.'),
(80, 28, 'Code enforcement should require property owners to adhere to the law', 'Code enforcement should require property owners to adhere to the law'),
(81, 29, 'Economic development.', 'Economic development.'),
(82, 29, 'Entertainment and tourist attractions', 'Entertainment and tourist attractions'),
(83, 29, 'Parks and schools.', 'Parks and schools.'),
(84, 30, 'City should spend money on boat slips, kayak launches, watercraft rental.', 'City should spend money on boat slips, kayak launches, watercraft rental.'),
(85, 30, 'City should spend money on cleaning up and rehabilitating the waterfront.', 'City should spend money on cleaning up and rehabilitating the waterfront.'),
(86, 30, 'City should spend money on neighborhood access to the water.', 'City should spend money on neighborhood access to the water.'),
(87, 31, 'A gem.', 'A gem.'),
(88, 31, 'Adequate and should be maintained.', 'Adequate and should be maintained.'),
(89, 31, 'Needs a lot of work', 'Needs a lot of work'),
(90, 32, 'Yes.', 'Yes.'),
(91, 32, 'No.', 'No.'),
(92, 33, 'Yes.', 'Yes.'),
(93, 33, 'No.', 'No.'),
(94, 34, 'Yes.', 'Yes.'),
(95, 34, 'No.', 'No.'),
(96, 35, 'Yes.', 'Yes.'),
(97, 35, 'No.', 'No.'),
(98, 36, 'Yes.', 'Yes.'),
(99, 36, 'No.', 'No.'),
(100, 37, 'Yes.', 'Yes.'),
(101, 37, 'No.', 'No.'),
(102, 38, 'Yes.', 'Yes.'),
(103, 38, 'No.', 'No.'),
(104, 38, 'Some of them, some years.', 'Some of them, some years.');

---------------------
--- Candidate Type --
---------------------
INSERT INTO candidate_type (id, type_name)
VALUES (1, 'Mayor'), (2, 'City Council');

---------------
-- Candidate --
---------------
INSERT INTO candidate (id, candidate_name, candidate_type_id) VALUES
(1, 'Kenneth Cooper Alexander', 1),
(2, 'Robert J. McCabe', 1),
(3, 'Andy A. Protogyrou', 1),
(4, 'Andria P. McClellan', 2),
(5, 'Warren A. Stewart', 2),
(6, 'Barclay C. Winn', 2),
(7, 'Harry David Candela', 2),
(8, 'G.W. "Billy" Cook, Jr.', 2),
(9, 'Angelia Williams Graves', 2),
(10, 'Kendrick J. Turner', 2);

----------------------
-- Candidate Answer --
----------------------

-------------------------
-- Candidate Geography --
-------------------------
INSERT INTO candidate_geography (candidate_id, geography_id) VALUES
(1, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(1, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(2, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(2, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(3, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(3, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(4, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(5, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(6, (SELECT id FROM geography WHERE geography_name = 'Super Ward 6')),
(7, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(8, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(9, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7')),
(10, (SELECT id FROM geography WHERE geography_name = 'Super Ward 7'));