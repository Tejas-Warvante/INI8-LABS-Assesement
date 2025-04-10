const express = require('express');
const cors = require('cors');
const app = express();
const registrationRoutes = require('./routes/registrationRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/registration', registrationRoutes);

const PORT = 5000;
console.log('available routes:/api/registration');
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
