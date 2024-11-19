const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());


app.post('/posts', async (req, res) => {
    const { title, content, categoryName, categoryDescription, comments } = req.body;

    try {
        const category = await prisma.kategoria.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName, description: categoryDescription },
        });

        const post = await prisma.wpis.create({
            data: {
                title,
                content,
                categoryId: category.id,
            },
        });

        if (comments && comments.length > 0) {
            await Promise.all(
                comments.map(async (commentContent) => {
                    await prisma.komentarz.create({
                        data: {
                            content: commentContent,
                            postId: post.id,
                        },
                    });
                })
            );
        }

        const fullPost = await prisma.wpis.findUnique({
            where: { id: post.id },
            include: { category: true, comments: true },
        });

        res.json(fullPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.wpis.findUnique({
            where: { id: parseInt(id) },
            include: { category: true, comments: true },
        });

        if (!post) {
            return res.status(404).json({ error: 'Wpis nie został znaleziony.' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.wpis.findMany({
            include: { category: true, comments: true },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/posts/update/:postId', async (req, res) => {
    const { postId } = req.params;  // Pobranie postId z URL
    const { title, content, categoryName } = req.query; // Pobranie danych z query params

    try {

        const updatedPost = await prisma.wpis.update({
            where: { id: parseInt(postId) },
            data: {
                title,
                content,
            }
        });

        if (categoryName) {
            const category = await prisma.kategoria.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName },
            });

            await prisma.wpis.update({
                where: { id: updatedPost.id },
                data: { categoryId: category.id },
            });
        }


        const finalPost = await prisma.wpis.findUnique({
            where: { id: updatedPost.id },
            include: { category: true, comments: true },
        });

        res.json(finalPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji posta.' });
    }
});


app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryName, categoryDescription, comments } = req.body;
    try {

        const post = await prisma.wpis.update({
            where: { id: parseInt(id) },
            data: { title, content },
        });

        if (categoryName) {
            const category = await prisma.kategoria.upsert({
                where: { name: categoryName },
                update: { description: categoryDescription },
                create: { name: categoryName, description: categoryDescription },
            });

            await prisma.wpis.update({
                where: { id: post.id },
                data: { categoryId: category.id },
            });
        }

        if (comments && comments.length > 0) {
            await prisma.komentarz.deleteMany({ where: { postId: post.id } });

            await Promise.all(
                comments.map(async (commentContent) => {
                    await prisma.komentarz.create({
                        data: { content: commentContent, postId: post.id },
                    });
                })
            );
        }

        const updatedPost = await prisma.wpis.findUnique({
            where: { id: post.id },
            include: { category: true, comments: true },
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {

        await prisma.komentarz.deleteMany({ where: { postId: parseInt(id) } });

        await prisma.wpis.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Wpis i powiązane komentarze zostały usunięte.' });
    } catch (error) {
        res.status(404).json({ error: 'Wpis nie został znaleziony.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
