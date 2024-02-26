const express = require("express");

const app = express()
const PORT = 8000

app.get("/", (req, res) => {
    res.send("This is the Home Page");
})

app.get("/about", (req, res) => {
    res.send("This is the About Page");
})

app.get("/contact", (req, res) => {
    res.send(`Hello ${req.query.name}`)
})

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
})