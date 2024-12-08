const express = require('express')

const app = express();
const port = 3000;


app.use((req, res, next) => {
    console.log('A request was made to:', req.url);
    // console.log("Header", req.headers.ccode)
    // console.log("Query", req.query);
    // console.log("Params", req.params)
    next(); // Pass control to the next middleware or route handler
});


//work as a middle ware in a route handler
const log = (req, res, next) => {
    console.log("Header", req.headers.ccode)
    console.log("Query", req.query);
    console.log("Params", req.params)
    next(); //
}

app.get('/', (req, res) => {
    res.send('Hello, World! anup');
});

app.get('/anup', (req, res) => {
    res.send('Hello, anup!');
});

app.get('/anup/:id', log, (req, res, next) => {
    try {
        const data = "Get the Response"
        if (isNaN(req.params.id)) {
            throw new Error('Invalid ID')
        }
        res.send(data);
    } catch (error) {
        next(error)
    }
});


app.get('/docker', (req, res) => {
    res.send('return the docker file');
});


app.post('/post', (req, res, next) => {
    res.json("data Receive")
})


app.use((err, req, res, next) => {
    console.log(err)
    res.status(400).json({ error: err })
})

app.get('/html', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Home Page</title>
          </head>
          <body>
            <h1>Welcome to My Express App</h1>
            <p>This is a simple HTML response.</p>
          </body>
        </html>
      `);
})



app.listen(3000, '0.0.0.0', () => {
    console.log('App running on port 3000');
});