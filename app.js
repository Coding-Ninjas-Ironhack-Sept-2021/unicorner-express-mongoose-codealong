const express = require("express");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static("public"));


const unicornData = {
    hoofie: {
        path: "profile-hoofie",
        unicornName: "Hoofie",
        favouriteFood: "Candy",
        imgFile: "hoofie.jpg",
        age: 44,
        hobbies: ["Sports", "Eating candy", "Nature", "Baking"]
    },
    marcello: {
        path: "profile-marcello",
        unicornName: "Marcello",
        favouriteFood: "Bananas",
        imgFile: "marcello.jpg",
        age: 456
    },
    sparky: {
        path: "profile-sparky",
        unicornName: "Sparky",
        favouriteFood: "Chocolate",
        imgFile: "sparky.jpg"
    },
};




app.get('/', (request, response, next) => {
    const data = {
        unicorns: unicornData
    }
    response.render("homepage", data);
});

app.get('/support', (request, response, next) => {
    response.render("support");
});


app.get('/profile-hoofie', (request, response, next) => {
    response.render("profile", unicornData.hoofie);
});


app.get('/profile-marcello', (request, response, next) => {
    response.render("profile", unicornData.marcello);
});


app.get('/profile-sparky', (request, response, next) => {
    response.render("profile", unicornData.sparky);
});



app.listen(3000);