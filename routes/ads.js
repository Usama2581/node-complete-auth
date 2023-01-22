const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('req --->', req.query)
    res.send({ message: 'Success' })
})
//localhost:/3000/ads/insert
router.post('/insert', (req, res) => {
    console.log('req', req.body)
    res.send({ message: 'Successfully added' })
})

router.put('/update', (req, res) => {
    res.send({ message: 'Successfully updated' })
})

router.delete('/delete', (req, res) => {
    res.send({ message: 'Successfully deleted' })
})

module.exports = router

/*
    In order to get BODY from frontend in your POST request:

    1. In main index.js, put the following code:
    
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

    2. Use fetch like this:

    fetch('ads/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Iphone',
            price: 50000
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
*/


//YXhuJyFvkRPJ07AU