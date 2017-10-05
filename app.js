import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
// import tokenValid from './server/auth/local';
import apiRoutesv1 from './server/routes/api/v1';
import apiRoutesv2 from './server/routes/api/v2';
import pageLoaderRoutes from './server/routes/pageLoader';

const app = express();

// Log requests to the console.
app.use(logger('dev'));

const port = parseInt(process.env.PORT, 10) || 8080;

app.set('Port', port);

// Add middleware to console log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// middle-ware that sets public folder as the default directory
app.use(express.static(path.join(__dirname, '/client')));

// // middle-ware that
// app.use(tokenValid);


// Set other static directories before defining routes
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/fonts', express.static(path.join(__dirname, '/template')));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false })); //
app.use(bodyParser.json());

// Call to server /routes
app.use('/', pageLoaderRoutes);
// Call to server /routes/api/v1
app.use('/api/v1', apiRoutesv1);
// Call to server /routes/api/v2
app.use('/api/v2', apiRoutesv2);

const server = app.listen(app.get('Port'), () => {
  const portCheck = server.address().port;
  console.log('Magic happens on port ', portCheck);
});


export default app;
