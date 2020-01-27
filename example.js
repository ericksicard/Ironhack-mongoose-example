const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/exampleApp', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch( err => console.log('Error connecting to MongoDB', err));


// Data Model == JavaScript constructor functions
const Cat = mongoose.model('Cat', { name: String });



//saving kitty to the database
function addNewCat( catName ) {    
    // New instance of Cat
    const kitty = new Cat({ name: catName });
    
    kitty
        .save()
        .then( newCat => console.log(`A new cat is created: ${newCat}`))
        .catch( err => console.log(`Error while creating a new cat: ${err}`))
}

//retriving all cats form the database
function showCats() {
    console.log( 'All the CAT');
    Cat.find()
        .then( catsFromDB => {
            // catsFromDB is an array of Cat instances
            catsFromDB.forEach( oneCat => console.log(`--> cat: ${oneCat.name}`));
        })
        .catch( err => console.log(`Error ocurred during getting cats from DB: ${err}`));
}

//adding cats to the database
function addTenCats() {
    for( let i = 0; i < 10; i++ ) {
        addNewCat(`Ironhacker ${i}`)
    }
}

addTenCats();

/* We have to wait for our cats to save before displaying them
 Remember, it's async */
 setTimeout(showCats, 1500);