const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
let savedNum = 35674;

app.use( express.json() );
app.use( cors() );

app.get('/saved', (req, res) => {
    res.status(200).send({
        operation: `${savedNum}`,
    });
})

app.post('/save', (req, res) => {
    savedNum = req.body.operation;
    if (!savedNum){
        res.status(400).send({ message: "I need a number."})
    } else {
        res.send({
            operation: `${savedNum}`,
        });
    }

})

app.listen(PORT, () => console.log(`It's running on http://localhost:${PORT}`));