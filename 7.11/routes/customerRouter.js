const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await prisma.customer.findMany();
    res.json(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await prisma.customer.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
});

module.exports = router;
