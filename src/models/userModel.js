const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
    nome : {type : String, required : true},
    email: {type : String, required: true},
    senha: {type : String, required: true},    
    data: {type : Date, default: Date.now}
    
});

userSchema.methods.encryptPassword = async (senha) => {
   const salt = await bcrypt.genSalt(10);
   const hash = bcrypt.hash(senha, salt);
   return hash;
};

userSchema.methods.matchPassword = async function (senha) {
   return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('user', userSchema);