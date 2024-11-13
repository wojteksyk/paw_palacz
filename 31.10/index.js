require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());


app.post('/posts', async (req, res) => {
    const { title, content, categoryId } = req.body;
    const post = await prisma.wpis.create({
        data: { title, content, categoryId },
    });
    res.json(post);
});
app.get('/', (req, res) => {
    res.send('yo');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});