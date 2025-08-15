import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'maria12',
    database: 'pharmacy',
    connectionLimit: 5 // Adjust as needed
});

export default Object.freeze({
    pool: pool
})