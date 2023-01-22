const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', async (req, res) => {
    let query = {}
    const minAge = req.query.minAge
    const sortBy = req.query.sortBy
    if (minAge) {
        query = { ...query, age: { $gt: minAge }}   
    }
    const users = await Users.find(query).sort({ [sortBy]: 1 })
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    const user = await Users.findOne({ _id: userId })

    res.send(user)    
})

router.post('/registration', async (req, res) => {
    try {
        const user = new Users(req.body)
        await user.save()
    
        res.send({ message: 'Successfully added' })
    } catch (e) {
        console.log('e --->', e)
        res.send({ message: e.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if (!user) {
        res.send({ message: "User doesn't exist." })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.send({ message: "Password is invalid "})
    }

    const token = await user.generateToken()


    res.send({ message: "Successfully logged in", token })
})

router.put('/update', verifyToken, (req, res) => {
    console.log('req headers ', req.headers.authorization)
    res.send({ message: 'Successfully updated' })
})

router.delete('/delete', (req, res) => {
    res.send({ message: 'Successfully deleted' })
})

router.delete('/logout', verifyToken, async (req, res) => {
    let token = req.headers.authorization

    if (token.indexOf('Bearer') !== -1) {
        token = token.slice(7)
    }

    try {
        await Users.removeToken(token)
        res.send({ message: 'Logged out successfully' })
    } catch (e) {
        console.log('e--->', e)
        res.send({ message: e })
    }

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
