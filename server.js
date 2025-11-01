import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();



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

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/api/generate-question', async (req, res) => {
    const { difficulty } = req.body;
    
    const prompts = {
        easy: `Generate a beginner SQL practice question for a healthcare database with columns: id, name, age, gender, medical_condition, admission_date, hospital. Focus on basic SELECT and WHERE. Return only the question text.`,
        medium: `Generate an intermediate SQL practice question for a healthcare database. Include GROUP BY, aggregate functions, or multiple conditions. Return only the question text.`,
        hard: `Generate an advanced SQL practice question for a healthcare database. Include complex queries, subqueries, or analytics. Return only the question text.`
    };
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompts[difficulty] }],
            max_tokens: 150,
            temperature: 0.7
        });
        
        res.json({ question: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate question' });
    }
});

app.listen(3000);