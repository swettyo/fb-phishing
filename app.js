const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(path.resolve("indexs.html")));
app.post('/login', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  console.log({ email, pass });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));