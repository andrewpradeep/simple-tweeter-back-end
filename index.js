const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.get('/getMyName', (req, res, next)=>{
    const paramName = req.query.name;
    res.status(200).json({data: paramName})
})

app.post('/getMyName', (req, res, next)=>{
    const paramName = req.body;
    res.status(200).json(paramName)
})

app.listen('3300', function(err){
    err ? console.log(err) : console.log('server started')
});