require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
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

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, email, hashedPassword]
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required.'
            });
        }

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password.'
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                error: 'Invalid email or password.'
            });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Failed to log in'
        });
    }
});

app.put('/users/:id/details', async (req, res) => {
    try {
        // Grab the ID from the URL (e.g., /users/59/details -> id is 59)
        const { id } = req.params;
        
        // Grab the data sent from your Angular frontend
        const { firstName, lastName, dob, gender, countryCode, phoneNumber } = req.body;

        // Update the database securely
        const result = await pool.query(
            `UPDATE users 
             SET first_name = $1, last_name = $2, dob = $3, gender = $4, country_code = $5, phone_number = $6 
             WHERE id = $7 
             RETURNING id, username, email, first_name, last_name, dob, gender, country_code, phone_number`,
            [firstName, lastName, dob, gender, countryCode, phoneNumber, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Details updated successfully', 
            user: result.rows[0] 
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update details' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});