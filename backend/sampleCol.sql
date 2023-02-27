\echo 'Delete and recreate sample collector db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sampleCol;
CREATE DATABASE sampleCol;
\connect sampleCol

\i sampleCol-schema.sql
\i sampleCol-seed.sql

\echo 'Delete and recreate sampleCol_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sampleCol_test;
CREATE DATABASE sampleCol_test;
\connect sampleCol_test

\i sampleCol-schema.sql