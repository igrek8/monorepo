import { strict as assert } from 'assert/strict';
import { mkdirSync, writeFileSync } from 'fs';
import { basename, dirname, extname, join } from 'path';

const TS = `import type { Client } from "pg";

export async function up(db: Client, _: { logLevel: string }) {
  console.log("Applying");
}

export async function down(db: Client, _: { logLevel: string }) {
  console.log("Reverting");
}
`;

const ESM = `/**
 * @param {import('pg').Client} db
 * @param {{ logLevel: string }} options
 */
export async function up(db) {
  console.log("Applying");
}

/**
 * @param {import('pg').Client} db
 * @param {{ logLevel: string }} options
 */
export async function down(db) {
  console.log("Reverting");
}
`;

const CJS = `/**
 * @param {import('pg').Client} db
 * @param {{ logLevel: string }} options
 */
module.exports.up = async function up(client) {
  console.log("Applying");
}

/**
 * @param {import('pg').Client} db
 * @param {{ logLevel: string }} options
 */
module.exports.down = async function down(client) {
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
  '.js': CJS,
  '.cjs': CJS,
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

export function create(options: CreateOptions, console = globalThis.console) {
  const fileExtension = extname(options.name);
  const fileName = basename(options.name, fileExtension);
  const fileContent = templates[fileExtension]?.replace('<revert_tag>', options.tag);
  assert(fileContent, `Supported extensions ${extensions}`);
  const timestamp = Date.now();
  const outputFileName = `${timestamp}_${fileName}${fileExtension}`;
  const outputFilePath = join(options.dir, outputFileName);
  mkdirSync(dirname(outputFilePath), { recursive: true });
  if (!options.plan) writeFileSync(outputFilePath, fileContent);
  console.info(`created: ${outputFilePath}`);
}
