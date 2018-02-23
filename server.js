// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/client/dist' ));
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Pet');
mongoose.Promise = global.Promise;


let PetSchema = new mongoose.Schema({

    name:{ type:String, unique:[true,'This name has already registered'], required:[true,'Pet name is required.'],minlength:[3,'At least 3 characters for pet name']},

    type:{ type:String, required:[true,'Pet type is required.'], minlength:[3,'At least 3 characters for pet type']},

    description:{ type:String, required:[true,'Pet type is required.'], minlength:[3,'At least 3 characters for pet type']},

    like: {type:Number, default:0},

    skillone: {type:String},

    skilltwo: {type:String},

    skillthree: {type:String}
})

let Pet = mongoose.model("Pet", PetSchema);
// // ==============================




// // ===== ROUTES about author ======
// // Retrieve all 
app.get('/pets', function(req, res){
    Pet.find({}, function(err, results){
        if(err){
            res.json({message: "Error", error: err})
        }else{
            // console.log(results);
            res.json(results);
        }
    })
})

// Create authors
app.post('/addpets', function(req, res){
    console.log("8888",req.body);
    let newPet = new Pet(req.body);
    newPet.save(function(err){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json("created pet")
        }
    })
})


// //update an author
app.put('/pets/:id', function(req, res){
    console.log(req.body);
    Pet.findOneAndUpdate({_id: req.params.id},
    {$set: {name: req.body.name, type: req.body.type, description: req.body.description, skillone: req.body.skillone, skilltwo: req.body.skilltwo, skillthree: req.body.skillthree}}, function(err){
        if(err){
            console.log('Error during updates');
            res.json({message:"Error", error:err})
        }else{
            console.log('Successfully to update the author');
            res.json({message: "Success"});
        }
    })
})

// // Delete by ID
app.delete('/pets/:id', function(req, res){
    console.log("delete:::",req.params.id);
    Pet.remove({_id: req.params.id}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message:'Success delete'});
        }
    })
})

// // ===== ROUTES about author ======

// // Retrieve all 
// app.get('/quotes', function(req, res){
//     Author.find({}, function(err, results){
//         if(err){
//             res.json({message: "Error", error: err})
//         }else{
//             // console.log(results);
//             res.json(results);
//         }
//     })
// })

// // Create
// app.post('/quotes', function(req, res){
//     console.log(req.body);
//     let newQuotes = new Quote(req.body);
//     newQuotes.save(function(err){
//         if(err){
//             res.json({message: "Error", error: err});
//         }else{
//             res.json("create success")
//         }
//     })
// })

// // getAuthorById
app.get('/pet/:id', function(req, res){
    // console.log(req.params.id);
    Pet.findOne({_id: req.params.id}, function(err, pet) {
        if(err){
            res.json({message: "error", error: err});
        }else{
            res.json(pet)
        }
    })
})

// // delete a quote
// app.delete('/quote/:id/:index', function(req, res){
//     Author.findOne({_id: req.params.id}, function(err,author){
//         console.log(author);
//         if(err){
//             res.json({message:"error", error: err});
//         }else{
//             author.quotes.splice(req.params.index, 1);
//             author.save(function(err) {
//                 if(err) {
//                     console.log("after delete quote: ", err);
//                 }
//                 else {
//                     res.json("success delete quote")
//                 }
//             })
//         }
//     })
// })

// // create quotes by author id
// app.put("/write/:id", function(req, res){
//     console.log("5555 newQuote pass to server.js", req.body.text);
//     Author.update({_id: req.params.id}, {$push: {quotes: req.body}}, function(err){
//         if(err){
//             console.log("err from server.js", err);
//             res.json({error:err});
//         }else{
//             res.json("success create quote");
//         }
//     })
// })

// // vote up
app.put("/vote/:id", function(req, res){
    Pet.findOne({_id: req.params.id}, function(err,pet){
        if(err){
            res.json({message: "error", error: err})
        }
        else{
            pet.like ++;
            pet.save(function(err) {
                if(err) {
                    console.log("err from save vote: ", err);
                }
                else {
                    res.json(pet);
                }
            })
        }
    })
})



// ======================
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/dist/index.html'));
});
// ======================


// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================