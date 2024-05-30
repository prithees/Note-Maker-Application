const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notes = require('./routes/notes.routes'); 
const app = express();

const username = 'prithees';
const password = 'Prithees@007';

const connection = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster1.cmhbhtz.mongodb.net/else?retryWrites=true&w=majority`;

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected Successfully');
    })
    .catch((err) => {
        console.error('Error occurred:', err.message);
    });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/notes', notes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening at port ${port}`));
