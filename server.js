const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static( __dirname + '/petShelter/dist/petShelter' ));

mongoose.connect('mongodb://localhost/petshelterDb');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: [true,"Your Pet's name must be at least 3 characters long."], minlength: 3},
    type: { type: String, required: [true,"what you call the Type of your Pet must be at least 3 characters long."], minlength: 3},
    desc: { type: String, required: [true,"the description of your Pet must be at least 3 characters long."], minlength: 3},
    likes: { type: Number, default: 0 },
    // first_name:{type: String,required:[true,"first name is required, dummy"], maxlength: 30},
    // quotes: [{type: mongoose.Schema.ObjectId, ref: 'Quotes'}]
    skillA: {type: String, default: ""},
    skillB: {type: String, default: ""},
    skillC: {type: String, default: ""},
}, {timestamps: true });

const Pet = mongoose.model('Pet', PetSchema);

// Use native promises
mongoose.Promise = global.Promise;

// #################<Routes>#################

// 1. Retrieve all Pets
app.get('/pets/all', function (req, res) {
    Pet.find({}, null, {sort: {date: -1}}, function(err, docs){
        res.json(docs)
    });
});

// 2. Retrieve one Pet by ID
app.get('/pets/info/:id', function (req, res) {
    Pet.findOne({ _id: req.params.id }, function (err, petdata) {
        if (err) {
            res.json({ message: "Error", error: err });
        } else {
            res.json(petdata);
        }
    });
});

// 3. Create a Pet
app.post('/pets/makenew', function (req, res) {
    Pet.find({}, function (err, allpetdata) {
        if (err) {
            res.json({ message: "Error", error: err });
        } else {
            for(var i = 0; i < (allpetdata).length; i++){
                if(allpetdata[i].name == req.body.name){
                    res.json({ message: "Error", error: "Existing PET FOUND!" });
                    return
                }
            }
            var pet = new Pet(req.body);
            pet.save(function (err) {
                if (err) {
                    res.json({ message: "Error", error: err })
                } else {
                    res.json({ message: "Success", data: pet })
                }
            });
        }
    });

});

// 4. Update a Pet by ID
app.put('/pets/update/:id', function (req, res) {
    var obj = {};
    if (req.body.name) { //if in the body your passing a new firstName.
        obj['name'] = req.body.name;
    }
    if (req.body.type) {
        obj['type'] = req.body.type;
    }
    if (req.body.desc) {
        obj['desc'] = req.body.desc;
    }
    if (req.body.skillA) {
        obj['skillA'] = req.body.skillA;
    }
    if (req.body.skillB) {
        obj['skillB'] = req.body.skillB;
    }
    if (req.body.skillC) {
        obj['skillC'] = req.body.skillC;
    }
    // if (req.body.likes) {
    //     obj['likes'] = req.body.likes;
    // }
    obj['updated_at'] = Date.now();
    Pet.update({ _id: req.params.id }, {
        $set: obj
    }, function (err, updatedata) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success!", data: updatedata })
        }
    });
});

// 4.5 Update a Pet's likes by ONE.
app.put('/pets/like/:id', function (req, res) {
    console.log("##########################################################", req.params.id);
    Pet.findOne({ _id: req.params.id },
        function (err, petdata) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            petdata.likes +=1;
            console.log("##########################################################")
            petdata.save(function(err){
                if (err) {
                    res.json({ message: "Error", error: err })
                }else{
                    res.json({message : 'Win added!'})
                }
            })
        }
    });
});

// 5. Delete a Pet by ID
app.delete('/pets/:id', function(req, res) {
    Pet.remove({ _id: req.params.id }, function(err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success!"})
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
