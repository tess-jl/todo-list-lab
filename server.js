// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
// Initiate database connection
client.connect();

//user auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        console.log(user);
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

//middleware
app.use('/api/auth', authRoutes);
// everything that starts with "/api" below here requires an auth token! need to lock user out of some data if they don't have the token 
app.use('/api', ensureAuth);

// API Routes

// *** TODOS ***
app.get('/api/todos', async (req, res) => {

    try {
        const result = await client.query(`
            SELECT *
            FROM todos;
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
    const userId = req.userId; 

    try {
        const result = await client.query(`
            INSERT INTO todos (task, complete, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
        [todo.task, todo.complete, userId]);

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
            SET     task = $2,
                    complete = $3
            WHERE  id = $1
            RETURNING *;
        `, [id, todo.task, todo.complete]);
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