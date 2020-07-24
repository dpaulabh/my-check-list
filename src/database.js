const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://dpaulabh:puc123@cluster0.m8emv.mongodb.net/CheckList?retryWrites=true&w=majority'
mongoose.connect(connectionString, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then (db => console.log('Banco conectado!'))
.catch(err => console.log(err));

