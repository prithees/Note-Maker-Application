//import section
const express = require('express');
const router = express.Router();
const Notes = require('../model/structure');

//view the data
router.get('/', (req, res) => {
    Notes.find()
        .exec()
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//add a data
router.post('/add', (req, res) => {
    let newnotes = new Notes(req.body);
    newnotes.save()
        .then(game => {
            res.status(200).json({ 'notes': 'notes added successfully' });
        })
        .catch(err => {
            res.status(400).json({ message: 'Oops something went wrong' });
        });
});

//get by id…
router.get('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    Notes.findById(id)
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});


//delete
router.delete('/de/:id', (req, res) => {
    Notes.findByIdAndDelete(req.params.id)
        .then(deletedNotes => {
            if (!deletedNotes) {
                return res.status(404).json({ message: "Notes not found" });
            }
            res.json({ message: "Notes deleted successfully" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//update
router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    Notes.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedNotes => {
            if (!updatedNotes) {
                return res.status(404).json({ message: "Notes not found" });
            }
            res.json(updatedNotes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});


//exports
module.exports = router;