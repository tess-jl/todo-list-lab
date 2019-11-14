const client = require('../lib/client');
// import our seed data:
const todos = require('./todos');
const users = require('./users');

run();

async function run() {

    try {
        await client.connect();

        const savedUser = await Promise.all(
            users.map(async user => {
                return client.query(`
                    INSERT INTO users (email, hash, display_name)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `, 
                [user.email, user.hash, user.displayName]);

            })
        );
    
        await Promise.all(
            todos.map(todo => {
                //find the corresponding user id 
                const user = savedUser.find(user => {
                    return user.id === todo.user_id;
                });
                const userId = user.id; 

                return client.query(`
                    INSERT INTO todos (task, complete, user_id)
                    VALUES ($1, $2, $3);
                `,
                [todo.task, todo.complete, userId]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
