
CREATE TABLE payment (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES "order"(id) ON DELETE CASCADE,
  payment_method VARCHAR(50) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount_paid NUMERIC(10, 2) NOT NULL
);

-- DO NOT REMOVE - THIS LINE SEPARATES APPLY AND REVERT OPERATIONS. REVERT BEGIN

DROP TABLE payment;
