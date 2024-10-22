import pg from 'pg';
export async function uninstall(options, config) {
    const client = new pg.Client({
        ...config?.client,
        host: options.host,
        port: options.port,
        user: options.user,
        password: options.password,
        database: options.db,
    });
    try {
        await client.connect();
        const table = client.escapeIdentifier(options.table);
        await client.query(`DROP TABLE ${table}`);
    }
    finally {
        await client.end();
    }
}
//# sourceMappingURL=uninstall.js.map