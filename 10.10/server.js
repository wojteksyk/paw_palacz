const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const req = require("express/lib/request");
const hostname = '127.0.0.1';
const port = 3000;
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'hp.html'));
})
app.get('/o-nas', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
})
app.get('/oferta', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'offer.html'));
})
app.get('/kontakt', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
})

///post teraz
app.post('/kontakt', (req,res)=>{
    const { firstName, lastName, email, msg } = req.body;
    console.log(`Imie: ${firstName} Nazwissko: ${lastName} Email: ${email} Wiadomosc: ${msg}`);
    res.redirect("/");

})
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})