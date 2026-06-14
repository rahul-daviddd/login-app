const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_db',
    password: 'walkzz_1412',
    port: 5432,
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email FROM users'
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Database error'
        });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required.'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({
                error: 'Invalid email format.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long.'
            });
        }

        const result = await pool.query(
            `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, email, password]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Email already exists'
            });
        }

        res.status(500).json({
            error: 'Failed to register user'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});