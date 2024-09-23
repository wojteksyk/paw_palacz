const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const url = require("url");
const port = 3000;
const fs = require("fs");
const adr = "http://127.0.0.1:3000/get_params"
const q = url.parse(adr,true);
const server = createServer((req, res) => {
    const url = req.url;
    if (url === "/home") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('strona glowna');
    } else if (url === "/json") {
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


    } else if (url === "/html-json") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('dokument HTML generowany wewnątrz kodu Node.js');
    } else if (url === "/html") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('dokument HTML pobrany z pliku');
    }
    /*else  if(url==="/get_params"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
       res.write(q.host+"    ");
        res.write(q.pathname+"       ");
        res.end(q.method);
    }*/

    else if (req.method === 'GET' && url.startsWith('/get_params')){
        const url = require('url');

    const parsedUrl = url.parse(req.url, true);

    console.log(parsedUrl.query);

    fs.writeFile("./parametry.json", JSON.stringify(parsedUrl.query, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log("Zapisano do pliku");
        }
    });

    res.end('Parametry wczytane');

}



    else{
    const url = require("url");
        const file = "dupa.html";
        const parsedUrl = url.parse(req.url, true);
        if(fs.existsSync("assets/dupa.html")){
console.log("file found");
        }
        else{
            console.log("file not found");
        }

    }

});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});