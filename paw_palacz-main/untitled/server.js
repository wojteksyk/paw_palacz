const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types');
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/home') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('home page');

    } else if (pathname === '/json') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const jsonData = {
            message: 'json dupa',
            status: 'success'
        };
        res.end(JSON.stringify(jsonData));

    } else if (pathname === '/file11') {
        const readFile = path.join(__dirname, 'dupa.html');
        fs.readFile(readFile, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end("df");
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }

    else if (req.method === 'GET' && pathname === '/get_params') {
        const parsedUrl = url.parse(req.url, true);
        const timestamp = Date.now();
        const paramsArray = Object.entries(parsedUrl.query);

        console.log(parsedUrl.query);


        fs.writeFile(`./params_${timestamp}.json`, JSON.stringify(paramsArray, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log("zapis do pliku", `params_${timestamp}.json`);
            }
        });


        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: 'ok' }));
    }
    else{
        const filePath = path.join(__dirname, 'assets', "mileage.html");
        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'error 404 type shit' }));
                return;
            }
            else{
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ error: 'blad odczytu' }));
                        return;
                    }
                    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', mimeType);
                    res.end(data);
                });
            }
        });
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});