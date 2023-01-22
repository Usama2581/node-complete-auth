const express = require('express')
const db = require('./config/db')
const app = express()

db.connection
.once('open', () => console.log("connected to db"))
.on("error", (err) => console.log("error connecting db -->", err))

app.listen(3000, function () {
    console.log('App listening to Port 3000')
})

// app.use('/ads', function (req, res) {
//     //db se data  get karenge
//     const ads = [
//         { title: 'Iphone', price: 5000 },
//         { title: 'Apple Watch', price: 1000 }
//     ]

//     res.send(ads)
// })

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'))


/*
    Steps to connect Mongodb with Nodejs

    1. Login to cloud.mongodb.com
    2. Create Database
    3. Added collections in database
    4. Navigate to Dashboard, click on Connect button, select the 2nd option and copy the connection string.
    5. Install mongoose from npm into your project
    6. Configure moongose into config/db.js and put the connection string there.

    Mongoose:
    1. Connect Mongodb with Nodejs
    2. Create Schema
    3. ALL transactions with Mongodb
*/


/*
Authentication Steps

 1. npm i bcryptjs jsonwebtoken
bcryptjs: Password Encryption
jsonwebtoken: Token generation for Authentication
 2. Create JWT secret (config/jwt)
 3. Add methods in User model
    i. UserSchema.pre('save', function(){})
    ii. UserSchema.methods.comparePassword
    iii. UserSchema.methods.generateToken


 Registration:
    i) Encrypt Password
    ii) Save the data into db


 Login
    i) Check if email exists in db
    ii) Compare passwords
    iii) Generate Token

*/