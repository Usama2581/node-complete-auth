const mongoose = require("mongoose")

// const mongoURI = "mongodb://kashif:kashif36@ds117909.mlab.com:17909/expertizodatabase";
const mongoURI = 'mongodb+srv://nabeel:YXhuJyFvkRPJ07AU@cluster0.qib4lja.mongodb.net/olx?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose;