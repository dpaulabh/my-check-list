const mongoose = require('mongoose');
const {Schema} = mongoose;

const listSchema = new Schema ({
    titulo : {type : String, required : true},
    descricao: {type : String},
    data: {type : Date, default: Date.now},
    usuario: {type : String}
});

module.exports = mongoose.model('list', listSchema);