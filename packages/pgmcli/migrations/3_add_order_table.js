export default {
  /**
   * @param {import('pg').Client} db
   * @param {{ logLevel: string }} options
   */
  async up(db) {
    return db.query(`
    CREATE TABLE "order" (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES customer(id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount NUMERIC(10, 2) NOT NULL
    );
  `);
  },

  /**
   * @param {import('pg').Client} db
   * @param {{ logLevel: string }} options
   */
  async down(db) {
    return db.query('DROP TABLE "order"');
  },
};
