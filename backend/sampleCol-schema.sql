CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
);

CREATE TABLE sample_col (
  sample_id SERIAL,
  common_name TEXT NOT NULL,
  scientific_name  TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  location TEXT NOT NULL,
  image_url TEXT ,
  note TEXT ,
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
  username VARCHAR(25) NOT NULL,
  CONSTRAINT fk_users_username
    FOREIGN KEY (username)
    REFERENCES users (username)
);

CREATE TABLE sample_folder (
  id SERIAL PRIMARY KEY,
  folder_name TEXT NOT NULL,
  username VARCHAR(25) NOT NULL,
  CONSTRAINT fk_users_username
    FOREIGN KEY (username)
    REFERENCES users (username) ON DELETE CASCADE
);



