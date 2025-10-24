-- Healthcare Dataset SQL Queries
-- Run this file with: sqlite3 -header -table healthcare.db < queries.sql

-- 1. See the first 5 patients
SELECT * FROM patients LIMIT 5;

-- 2. Count total patients
SELECT COUNT(*) as total_patients FROM patients;

-- 3. Count patients by medical condition
SELECT "Medical Condition", COUNT(*) as count 
FROM patients 
GROUP BY "Medical Condition" 
ORDER BY count DESC;
