const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const req = require("express/lib/request");
const hostname = '127.0.0.1';
const port = 3000;
const mime = require('mime-types');

app.get('/home', (req,res)=>{
res.status(200).send("homepage");
})
app.get('/json', (req,res)=>{
    const json = {"msg":"sum random shit"}
    res.json(json);
})
app.get("/html", (req,res)=>{
    const html = `<html><body><h1>Html </h1></body></html>`;
    res.status(200).send(html);
})
app.get('/file1', async(req,res)=>{
    const readFile = path.join(__dirname,'dupa.html');
    fs.readFile(readFile, "utf-8", (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send("df")
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.get('/get_params', (req,res)=>{
    const params = JSON.stringify(req.query);
    console.log(params);
    fs.writeFile(`params_${Date.now()}.json`,params,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(JSON.stringify({"ok": "ok"}));
        }
    })

})
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
})