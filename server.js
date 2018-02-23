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

    name:{ type:String, required:[true,'Pet name is required'],minlength:[3,'At least 3 characters for pet name'], unique:[true,'This name has already registered']},

    type:{ type:String, required:[true,'Pet type is required'], minlength:[3,'At least 3 characters for pet type']},

    description:{ type:String, required:[true,'Pet type is required'], minlength:[3,'At least 3 characters for pet type']},

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

// Create 
app.post('/addpets', function(req, res){
    // console.log("8888",req.body);
    let newPet = new Pet(req.body);
    newPet.save(function(err){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json("created pet")
        }
    })
})


// //update
// app.put('/pets/:id', function(req, res){
//     console.log(req.body);
//     Pet.findOneAndUpdate({_id: req.params.id},
//     {$set: {name: req.body.name, type: req.body.type, description: req.body.description, skillone: req.body.skillone, skilltwo: req.body.skilltwo, skillthree: req.body.skillthree}}, function(err){
//         if(err){
//             console.log('Error during updates');
//             res.json({message: "Error", error: err});
//         }else{
//             console.log('Successfully to update the author');
//             res.json("updated pet");
//         }
//     })
// })

app.put('/pets/:id', function(req, res){
    console.log(req.body);
    Pet.findOne({_id: req.params.id}, function(err, pet) {
        console.log(pet);
        pet.name = req.body.name;
        pet.type = req.body.type;
        pet.description = req.body.description;
        pet.skillone = req.body.skillone;
        pet.skilltwo = req.body.skilltwo;
        pet.skillthree = req.body.skillthree;
        pet.save(function(err) {
            if(err) {
                console.log("err from edit pet: ",err);
                res.json(err);
            }
            else {
                res.json("success edit pet");
            }
        })

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