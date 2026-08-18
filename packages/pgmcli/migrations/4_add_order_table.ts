/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Client } from 'pg';

export async function up(connection: Client): Promise<void> {
  await connection.query(`
    CREATE TABLE "order" (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES customer(id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount NUMERIC(10, 2) NOT NULL
    );
  `);
}

export async function down(connection: Client): Promise<void> {
  await connection.query('DROP TABLE "order"');
}
