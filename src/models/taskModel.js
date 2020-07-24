const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema ({
    descTarefa: {type : String, required: true},
    ok: {type : Boolean, default: false },
    data: {type : Date, default: Date.now},
    lista: {type : String},
    usuario: {type : String}
});

module.exports = mongoose.model('task', taskSchema);