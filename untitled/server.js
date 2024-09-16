const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const server = createServer((req, res) => {
    const url = req.url;
    if(url==="/"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('strona glowna');
    }

    else  if(url==="/json"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log('plik .json');
        fs.readFile('package.json', (err, data) => {
            if (err) {
                res.end(err);
                return;
            }
            res.end(data);
        });



    }
    else  if(url==="/html-json"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('dokument HTML generowany wewnątrz kodu Node.js');
    }
    else  if(url==="/html"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('dokument HTML pobrany z pliku');
    }

});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});