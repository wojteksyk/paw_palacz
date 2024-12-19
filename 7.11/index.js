const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Aby obsłużyć dane z formularza
app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    try {

        const kategorie = await prisma.kategoria.findMany();

        res.send(`
            <h1>Dodaj nowy wpis</h1>
            <form action="/add-wpis" method="POST">
                <div>
                    <label for="tytul">Tytuł:</label>
                    <input type="text" id="tytul" name="tytul" required>
                </div>
                <div>
                    <label for="tresc">Treść:</label>
                    <textarea id="tresc" name="tresc" required></textarea>
                </div>
                <div>
                    <label for="kategoriaId">Wybierz kategorię:</label>
                    <select id="kategoriaId" name="kategoriaId" required>
                        ${kategorie.map(kategoria => `
                            <option value="${kategoria.id}">${kategoria.nazwa}</option>
                        `).join('')}
                    </select>
                </div>
                <div>
                    <button type="submit">Dodaj wpis</button>
                </div>
            </form>
        `);
    } catch (error) {
        console.error('Błąd przy pobieraniu kategorii:', error);
        res.status(500).json({ error: 'Błąd przy pobieraniu kategorii' });
    }
});

app.post('/add-wpis', async (req, res) => {
    const { tytul, tresc, kategoriaId } = req.body;

    try {

        const kategoria = await prisma.kategoria.findUnique({
            where: { id: parseInt(kategoriaId) }
        });

        if (!kategoria) {
            return res.status(400).json({ error: 'Kategoria o podanym ID nie istnieje' });
        }

        const newWpis = await prisma.wpis.create({
            data: {
                tytul,
                tresc,
                kategorie: {
                    connect: { id: parseInt(kategoriaId) }
                }
            }
        });


        res.redirect('/');
    } catch (error) {
        console.error('Błąd przy dodawaniu wpisu:', error);
        res.status(500).json({ error: 'Błąd przy dodawaniu wpisu' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
