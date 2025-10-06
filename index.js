const express = require('express');
const  app = express();
const port = 8080;
const path = require('path');

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/dice', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    res.render("rollDice.ejs", {num : randomNumber});
})

app.get('/ig/:userName', (req, res) => {
    let instaData = require('./data.json');
    let { userName } = req.params;
    let user = instaData[userName];
    if (!user) {
        res.render('invalid.ejs');
    } else {
        res.render('instagram.ejs', { user });
    }
    
});

app.get('/:user/:age', (req, res) => {
    let { user, age } = req.params;
    res.send(`Hello ${user}, you are ${age} years old`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});