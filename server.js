const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./server/config/database');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
connectDB();

const serviceRoutes = require('./server/routes');
app.use('/api', serviceRoutes);

const { swaggerUiServe, swaggerUiSetup } = require('./server/config/swagger');
app.use("/api/swagger", swaggerUiServe, swaggerUiSetup);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

const handleErrors = require('./server/middleware/handle-errors');
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışmaya başladı!`);
});
