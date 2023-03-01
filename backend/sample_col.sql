\echo 'Delete and recreate sample collector db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sample_col;
CREATE DATABASE sample_col;
\connect sample_col

\i sample_col-schema.sql
\i sample_col-seed.sql

\echo 'Delete and recreate sampleCol_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sample_col_test;
CREATE DATABASE sample_col_test;
\connect sample_col_test

\i sample_col-schema.sql
