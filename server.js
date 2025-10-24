import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import path from "path";


var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./healthcare.db', (err) => {
    if (err) {
        console.log('Error connecting:', err)
    } else  {
        console.log("http://localhost:3000")
    }
});

app.post('/api/query', (req, res) => {
    const sqlQuery = req.body.query;
    
    if (!sqlQuery) {
        return res.json({ error: "No query provided" });
    }
    
    if (!sqlQuery.trim().toLowerCase().startsWith('select')) {
        return res.json({ error: "Only SELECT queries are allowed" });
    }
    
    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

app.listen(3000);