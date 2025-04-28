import sql from 'mssql';

const sqlConfig = {
    user: process.env.AZURE_SQL_USERNAME,
    password: process.env.AZURE_SQL_PASSWORD,
    database: process.env.AZURE_SQL_DATABASE,
    server: process.env.AZURE_SQL_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        connectionTimeout: 30000,
        requestTimeout: 30000,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        return pool;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export const closeConnection = async () => {
    try {
        await sql.close();
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
}; 