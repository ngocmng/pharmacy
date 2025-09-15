import bcrypt from 'bcrypt'
import db from './database.js'

const register = async() => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const hashPassword = await bcrypt.hash("123", 10);
        await conn.query('INSERT INTO user (user_name, pass_word, role) VALUES (?, ?, ?)',
            ["admin", hashPassword, "admin"]
        )
        console.log("Amdin created successfully")
    } catch (error) {
        console.error(error);
    }
}

register();