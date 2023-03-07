const express = require('express');
const app = express();
const PORT = 3001;
var savedNum = null;

app.use( express.json() );

app.get('/saved', (req, res) => {
    res.status(200).send({
        value: `${savedNum}`,
    });
})

app.post('/saved', (req, res) => {
    savedNum = req.body.value;
    if (!savedNum){
        res.status(400).send({ message: "I need a number."})
    } else {
        res.send({
            value: `${savedNum}`,
        });
    }

})

app.listen(PORT, () => console.log(`It's running on http://localhost:${PORT}`));