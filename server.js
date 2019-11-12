// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
// Initiate database connection
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

// API Routes

// *** TODOS ***
app.get('/api/todos', async (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'WHERE inactive = FALSE';

    try {
        const result = await client.query(`
            SELECT *
            FROM todos
            ${where}
            ORDER BY task;
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.post('/api/todos', async (req, res) => {
    const todo = req.body;

    try {
        const result = await client.query(`
            INSERT INTO todos (name)
            VALUES ($1)
            RETURNING *;
        `,
        [todo.task]);

        res.json(result.rows[0]);
    }
    catch (err) {
        if (err.code === '23505') {
            res.status(400).json({
                error: `Type "${todo.task}" already exists`
            });
        } else {
            console.log(err);
            res.status(500).json({
                error: err.message || err
            });
        }
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        const result = await client.query(`
            UPDATE todos
            SET     name = $2,
                    inactive = $3
            WHERE  id = $1
            RETURNING *;
        `, [id, todo.task, todo.inactive]);
        res.json(result.rows[0]);
    }
    catch (err) {
        if (err.code === '23505') {
            res.status(400).json({
                error: `Type "${todo.task}" already exists`
            });
        } else {
            console.log(err);
            res.status(500).json({
                error: err.message || err
            });
        }
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    // get the id that was passed in the route:
    const id = req.params.id; 

    try {
        const result = await client.query(`
            DELETE FROM todos
            WHERE  id = $1
            RETURNING *;
        `, [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        if (err.code === '23503') {
            res.status(400).json({
                error: `Could not remove, type is in use. Make inactive or delete all cats with that type first.`
            });
        } else {
            console.log(err);
            res.status(500).json({
                error: err.message || err
            });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});