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

app.get('/posts', async (req, res) => {
    const posts = await prisma.wpis.findMany({
        include: { category: true, comments: true },
    });
    res.json(posts);
});

app.post('/posts/:postId/comments', async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    const comment = await prisma.komentarz.create({
        data: { content, postId: parseInt(postId) },
    });
    res.json(comment);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});