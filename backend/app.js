const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes')
const { ValidationError } = require('sequelize');

const app = express();

// logging requests
app.use(morgan('dev'));

// json
app.use(express.json());

// populates req with a cookies obj
app.use(cookieParser())

app.use(cors({
    origin: ["https://muscle-metrics.onrender.com", "http://localhost:3000"],
    credentials: true,
}))


// app.use(
//     helmet.crossOriginResourcePolicy({
//         policy: 'cross-origin'
//     })
// );

// app.use(
//     csurf({
//         cookie: {
//             secure: isProduction,
//             sameSite: isProduction && 'Lax',
//             httpOnly: true
//         }
//     })
// )

app.use(routes);


// error handling
app.use((req, res, next) => {
    const err = new Error('The requested resource could not be found');
    err.title = 'Resource Not Found';
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    if (err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null: err.stack,
    })
})
// error handling

module.exports = app;