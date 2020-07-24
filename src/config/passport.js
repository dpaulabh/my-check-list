const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const user = require('../models/userModel');

passport.use(new localStrategy({usernameField : 'email', passwordField:'senha'}, async (email, senha, done) => {
  
    const usuario = await user.findOne({email:email});
    if (!usuario){
        return done(null, false, {message: 'Email não registrado!'} );
    } else {
        console.log(senha);
        const match = await usuario.matchPassword(senha)
        if (match) {
            return done(null, usuario);
        } else {
            return done(null, false, {message: 'Senha incorreta!'} );
        }
    }

} ));

passport.serializeUser((usuario, done) => {
   done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    const usuario = await user.findById(id).lean();
    done(null, usuario);
})