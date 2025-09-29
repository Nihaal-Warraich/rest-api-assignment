const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
// **************************************************************


let users = [];

//id generator because uuid was giving me issues 
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

//creating a user 
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Bad Request: Name or email is missing'});
    }

    const newUser = {
        id: generateId(),
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//getting a user
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({error: 'User was not found'});
    }

    res.status(200).json(user);
});

//updating a user 
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Name or email is missing'});
    }

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({error: 'User was not found'});
    }

    users[userIndex] = { id, name, email };
    res.status(200).json(users[userIndex]);
});

//deleting a user 
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User was not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
