import { Client } from 'pg';
import express from 'express';
import { password } from './password.js';

const client = new Client({
    user: "postgres",
    password: password,
    host: "localhost",
    port: 5432,
    database: "todo"
});

const app = express();
const port = 3000;

client.connect().then(() => console.log("CONNECTED"));

app.use(express.json());
app.post("/add-task", (req, res) => {
    const {creator, task} = req.body;
    const insertQuery = "INSERT INTO tasks (creator, task) VALUES ($1, $2)"

    client.query(insertQuery, [creator, task], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("ADDED DATA");
        }
    });
});

app.get("/", (req, res) => {
    const selectAllData = "SELECT * FROM tasks";

    client.query(selectAllData, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result.rows);
        }
    });
});

app.get("/get-taks/:id", (req, res) => {
    const id = req.params.id;
    const selectTask = "SELECT * FROM tasks WHERE id = $1"

    client.query(selectTask, [id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result.rows[0]);
        }
    });
});

app.listen(port, () => console.log(`The app is running on http://localhost:${port}`));
