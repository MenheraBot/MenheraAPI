const { Pool } = require('pg')
/* const { db_user, db_host, db_database, db_password, db_port } = require("../config.json") */

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.on('connect', () => {
    console.log("Nova conexão estabelecida")
});

pool.on("error", () => {
    console.log("ERRO DURANTE UMA CONEXÂO")
})

console.log(pool.idleCount)

/* 

    ; (async () => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const queryText = 'INSERT INTO users (id, uses) VALUES($1, $2) RETURNING id'
            const res = await client.query(queryText, ['757295289630720031', 0])
            const insertPhotoText = 'INSERT INTO logs(command, user_id, guild, data) VALUES ($1, $2, $3, $4)'
            const insertPhotoValues = ["botinfo", res.rows[0].id, "717061688460967988", Date.now()]
            await client.query(insertPhotoText, insertPhotoValues)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(e => console.error(e.stack))

 */
export default pool;