const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {

    // * By default server makes the request of favicon so here it is been removed just because not to add entry of favicon request in log.txt
    if (req.url === "/favicon.ico") return res.end();

    // * capturing the log details using
    // ? req.url -> /about
    // ? req.method -> GET, POST, PUT, PATCH, DELETE
    const log = `${Date.now()}: New Req Received from ${req.url} and used ${req.method} Method\n`


    // * parsing the req.url in small parts like destructing into
    // ? protocol, slashes, auth, host, port, hostname, hash, query, pathname, path, href
    const myUrl = url.parse(req.url, true)

    // * using file-system creating the log.txt and appending in it to make new logs
    fs.appendFile("./log.txt", log, (err, data) => {

        // * Path routing
        // ? .pathname is the key of myUrl Object i.e the url.parse
        switch (myUrl.pathname) {
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                // ? MyUrl Object -> query Object -> myname Key
                const userName = myUrl.query.myname
                res.end(`Hi ${userName ? userName : 'User'}`);
                break;
            case '/search':
                const search = myUrl.query.search_query
                res.end(`This is you search result for ${search}`);
                break;
            default:
                res.end("404 Not Found");
        }
    })
});

myServer.listen(8000, () => {
    console.log(`Server is listening on Port 8000`);
})