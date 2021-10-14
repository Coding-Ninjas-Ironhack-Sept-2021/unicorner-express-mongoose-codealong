const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');

const Unicorn = require('./models/Unicorn');


mongoose
  .connect('mongodb://localhost/unicorner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));




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



app.get('/create-unicorn', (request, response, next) => {

    const unicornDetails = {
        name: "grumpy", 
        country: "France"
    };

    Unicorn
        .create(unicornDetails)
        .then( (newUnicorn) => {
            console.log(`our new unicorn was successfully saved in the DB.... ${newUnicorn}`);
            response.send("yeeeeeah");
        })
        .catch( (errorMsg) => {
            console.log(`oops, there was an error saving data in DB.... ${errorMsg}`);
            response.send("nooooooo");
        });
        
});

app.get('/list-unicorns', (request, response, next) => {

    //Get a list of all unicorns from France:
    // Unicorn.find({country: "France"})

    Unicorn
        .find()
        .then( unicornsFromDB => {
            console.log(unicornsFromDB);

            const data = {
                unicornArr: unicornsFromDB
            }

            response.render("unicornList", data);
        })
        .catch( errorMsg => {
            console.log(`oops.... ${errorMsg}`);
            response.send("oops, something went wrong");
        });
});


app.get('/update-unicorns', (request, response, next) => {
    
    // update all unicorns from "Italy" so that they like JavaScript
    Unicorn
        .updateMany({country: "Italy"}, {likesJavaScript: true})
        .then( responseFromDB => {
            response.send("Italian unicorns were updated");
        } )
        .catch( errorMsg => {
            console.log(`oops.... ${errorMsg}`);
            response.send("oops, something went wrong");
        });

});


app.get('/delete-unicorns', (request, response, next) => {

    // delete all unicorns from "Argentina" (you know, there are no unicorns in Tierra de Fuego)
    Unicorn
        .deleteMany({country: "Argentina"})
        .then( responseFromDB => {
            response.send("All unicorns from Argentina were deleted");
        } )
        .catch( errorMsg => {
            console.log(`oops.... ${errorMsg}`);
            response.send("oops, something went wrong");
        });
});




app.listen(3000);