const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
const CORRECT_CODE = '1234';

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.post('/verify', (req, res) => {
  const { code } = req.body;

  if (code === CORRECT_CODE) {
    res.status(200).json({ message: 'Verification successful' });
  } else {
    res.status(400).json({ error: 'Verification failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
