const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
let savedNum = 35674;
let filePath = "SavedNum.txt";

app.use( express.json() );
app.use( cors() );

const fs = require('fs');

function readNumber(){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        savedNum = data;
      });
}

function writeNumber(number){
    fs.writeFile(filePath, number, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Number saved.");
    }
    });
}


app.get('/saved', (req, res) => {
    readNumber();
    res.status(200).send({
        operation: `${savedNum}`,
    });
})

app.post('/save', (req, res) => {
    savedNum = req.body.operation;
    writeNumber(savedNum);
    if (!savedNum){
        res.status(400).send({ message: "I need a number."})
    } else {
        res.send({
            operation: `${savedNum}`,
        });
    }

})

app.listen(PORT, () => console.log(`It's running on http://localhost:${PORT}`));