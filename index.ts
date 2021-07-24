const express = require('express');

const PORT = 1234;
const app = express();

// Allow CORS
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => {
  res.json({ where: 'Storemaven' });
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});