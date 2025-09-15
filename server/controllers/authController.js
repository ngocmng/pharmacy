import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database'

const login = async (req, res) => {
    let conn;
    try {
        const {username, password} = req.body;

        conn = await db.pool.getConnection()
        const rows = conn.query('SELECT * FROM user WHERE user_name = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({success: false, message: "Invalid username or password"})  
        }
        const isMatch = await bcrypt.compare(password, user.pass_word)
        if (!isMatch) {
            return res.status(401).json({success: false, message: "Invalid username or password"})
        }
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '7d'})
        return res.status(200).json({success: true, token})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false})
    }
}

export { login }