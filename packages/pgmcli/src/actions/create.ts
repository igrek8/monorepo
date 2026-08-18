import { strict as assert } from 'assert/strict';
import { mkdirSync, writeFileSync } from 'fs';
import { basename, dirname, extname, join } from 'path';

const TS = `import type { Client } from 'pg';

export const upParams: Record<string, string | undefined> = {
  transaction: 'true'
};

export async function up(connection: Client): Promise<void> {
  console.log("Applying");
}

export const downParams: Record<string, string | undefined> = {
  transaction: 'true'
};

export async function down(connection: Client): Promise<void> {
  console.log("Reverting");
}
`;

const ESM = `/**
 * @param {import('pg').Client} connection
 */
export async function up(connection) {
  console.log("Applying");
}

/**
 * @param {import('pg').Client} connection
 */
export async function down(connection) {
  console.log("Reverting");
}
`;

const SQL = `DO $$
BEGIN
  RAISE LOG 'Applying';
END $$;

-- DO NOT REMOVE - THIS LINE SEPARATES APPLY AND REVERT OPERATIONS. <revert_tag>

DO $$
BEGIN
  RAISE LOG 'Reverting';
END $$;
`;

export const templates: Record<string, string> = {
  '.ts': TS,
  '.js': ESM,
  '.mjs': ESM,
  '.mts': TS,
  '.sql': SQL,
};

export interface CreateOptions {
  name: string;
  dir: string;
  plan?: boolean;
  tag: string;
}

const extensions = Object.keys(templates).join(', ');

export function create(options: CreateOptions, console = globalThis.console): void {
  const fileExtension = extname(options.name);
  const fileName = basename(options.name, fileExtension);
  const fileContent = templates[fileExtension]?.replace('<revert_tag>', options.tag);
  assert(fileContent, `Supported extensions ${extensions}`);
  const timestamp = Date.now();
  const outputFileName = `${timestamp.toString()}_${fileName}${fileExtension}`;
  const outputFilePath = join(options.dir, outputFileName);
  mkdirSync(dirname(outputFilePath), { recursive: true });
  if (!options.plan) writeFileSync(outputFilePath, fileContent);
  console.info(`created: ${outputFilePath}`);
}
