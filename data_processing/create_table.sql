CREATE TABLE huawei_employee_test (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL,
	POSITION VARCHAR(100) NOT NULL,
	JOIN_DATE DATE NOT NULL,
	RELEASE_DATE DATE,
	YEAR_OF_EXPERIENCE DECIMAL(4, 2) NOT NULL DEFAULT 0,
	SALARY INT NOT NULL DEFAULT 0
);

INSERT INTO huawei_employee_test 
VALUES
(1, 'Jacky', 'Solution Architect', '2018-07-25', '2022-07-25', 8, 150),
(2, 'John', 'Assistant Manager', '2016-02-02', '2021-02-02', 12, 155),
(3, 'Alano', 'Manager', '2010-11-09', NULL, 14, 175),
(4, 'Aaron', 'Engineer', '2021-08-16', '2022-08-16', 1, 80),
(5, 'Allen', 'Engineer', '2024-06-06', NULL, 4, 75),
(6, 'Peter', 'Team Leader', '2020-01-09', NULL, 3, 85);
