const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const cors = require('cors');

let corsOptions = {
    origin: (process.env.NODE_ENV === 'production' ? "https://muscle-metrics.onrender.com": "*")
}

router.use('/api', cors(corsOptions), apiRouter)

router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
})

if (process.env.NODE_ENV !== 'production'){ // env !== production
    // adding XSRF token cookie
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-Token', req.csrfToken());
        return res.json({})
    })
}

module.exports = router;