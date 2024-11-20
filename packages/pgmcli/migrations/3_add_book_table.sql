DO $$
BEGIN
  RAISE INFO 'Creating table book';
  CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100),
    genre VARCHAR(50),
    price NUMERIC(10, 2) NOT NULL,
    stock INT DEFAULT 0
  );
END $$;

-- DO NOT REMOVE - THIS LINE SEPARATES APPLY AND REVERT OPERATIONS. REVERT BEGIN

DO $$
BEGIN
  RAISE INFO 'Dropping table book';
  DROP TABLE book;
END $$;
