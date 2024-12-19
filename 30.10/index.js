const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());



app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.wpis.findMany({
            data: {
                kategorie: true,
                komentarze: true,
            },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
