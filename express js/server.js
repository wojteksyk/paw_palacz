const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const hostname = '127.0.0.1';
const port = 3000;
const mime = require('mime-types');

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'palacz'
});

db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych MySQL.');
    }
});

app.post('/api/contact-messages', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(404).json({ error: 'Brak wymaganych danych.' });
    }

    const query = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err);
            return res.status(500).json({ error: 'Błąd zapisu do bazy danych.' });
        }
        res.status(201).json({ message: 'Wiadomość zapisana.', id: results.insertId });
    });
});

app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error('Błąd pobierania wiadomości:', err);
            return res.status(500).json({ error: 'Błąd pobierania wiadomości.' });
        }
        res.json(results);
    });
});

app.get('/api/contact-messages/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Błąd pobierania wiadomości:', err);
            return res.status(500).json({ error: 'Błąd pobierania wiadomości.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID.' });
        }
        res.json(results[0]);
    });
});

app.get('/home', (req, res) => {
    res.status(200).send("homepage");
});

app.get('/json', (req, res) => {
    const json = { "msg": "sum random shit" };
    res.json(json);
});

app.get("/html", (req, res) => {
    const html = `<html><body><h1>Html </h1></body></html>`;
    res.status(200).send(html);
});

app.get('/file1', async (req, res) => {
    const readFile = path.join(__dirname, 'dupa.html');
    fs.readFile(readFile, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("df");
        } else {
            res.status(200).send(data);
        }
    });
});

app.get('/get_params', (req, res) => {
    const params = JSON.stringify(req.query);
    console.log(params);
    fs.writeFile(`params_${Date.now()}.json`, params, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(JSON.stringify({ "ok": "ok" }));
        }
    });
});

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'mileage.html');
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).json({ error: 'error 404 type shit' });
        }

        res.sendFile(filePath, err => {
            if (err) {
                res.status(500).json({ error: 'blad odczytu' });
            }
        });
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
