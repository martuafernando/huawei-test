/*
  Menambahkan satu personal dalam table dengan nama employee Albert dengan posisi
  enginner, join date 24 Januari 2024, dengan Year of experience 2.5 year. With
  salary $50.
*/
INSERT INTO huawei_employee_test (name, position, join_date, release_date, year_of_experience, salary)
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, 2.5, 50);

/*
  Update table dengan posisi enginner with salaray $85
*/
UPDATE huawei_employee_test 
SET salary = 85 
WHERE position = 'Engineer';

/*
  Hitung total pengeluaran salary saat tahun 2021 (asumsi salary adalah per bulan).
*/
SELECT SUM(
	CASE
    WHEN join_date >= '2021-01-01' AND release_date <= '2021-12-31' THEN 
        (EXTRACT(MONTH FROM AGE(release_date, join_date)) + 1) * salary
    WHEN join_date < '2021-01-01' AND release_date <= '2021-12-31' THEN 
        (EXTRACT(MONTH FROM AGE(release_date, '2021-01-01')) + 1) * salary
    WHEN join_date >= '2021-01-01' AND (release_date IS NULL OR release_date > '2021-12-31') THEN 
        (EXTRACT(MONTH FROM AGE('2021-12-31', join_date)) + 1) * salary
    ELSE 12 * salary
  END
) AS total_salary
FROM huawei_employee_test
WHERE (join_date <= '2021-12-31') AND (release_date IS NULL OR release_date >= '2021-01-01');

/*
  Sorting menampilkan 3 employee paling banyak yang memiliki Years of
  Experience
*/
SELECT * 
FROM huawei_employee_test 
ORDER BY year_of_experience DESC 
LIMIT 3;

/*
  subquery untuk employee dengan posisi engginer yang memiliki
  exeperience kurang dari sama dengan 3 tahun
*/
SELECT * 
FROM huawei_employee_test 
WHERE id IN (
    SELECT id 
    FROM huawei_employee_test 
    WHERE position = 'Engineer' 
    AND year_of_experience <= 3
);
