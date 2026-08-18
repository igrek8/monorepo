/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Client } from 'pg';

export const upParams: Record<string, string | undefined> = {
  transaction: 'false',
};

export async function up(connection: Client): Promise<void> {
  await connection.query('CREATE INDEX CONCURRENTLY ON payment (order_id)');
}

export const downParams: Record<string, string | undefined> = {
  transaction: 'false',
};

export async function down(connection: Client): Promise<void> {
  await connection.query('DROP INDEX CONCURRENTLY payment_order_id_idx');
}
