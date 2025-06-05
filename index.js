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

client.connect().then(() => console.log("CONNECTED"));

