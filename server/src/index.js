require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const collectionsRouter = require('./routes/collections');
const ordersRouter = require('./routes/orders');
const inquiriesRouter = require('./routes/inquiries');
const storesRouter = require('./routes/stores');
const journalRouter = require('./routes/journal');
const newsletterRouter = require('./routes/newsletter');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim());

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/journal', journalRouter);
app.use('/api/newsletter', newsletterRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`JaneDeraa API listening on http://localhost:${port}`);
});
