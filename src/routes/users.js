const router = require('express').Router();
const user = require('../models/userModel');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/lists');
});



router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/lists',
    failureRedirect: '/users/signin',
    failureFlash: true
}) )

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {nome, email, senha, confirmarsenha} = req.body;
    const erros = [];
    if (!nome){
        erros.push({texto: 'Informe o nome do usuário!'});
    }
    if (!email){
        erros.push({texto: 'Informe o e-mail do usuário!'});
    }
    if (senha.length < 4){
        erros.push({texto: 'Senha deve ter pelo menos 4 digitos!'});
    }    
    if (senha != confirmarsenha){
        erros.push({texto: 'Senha não confere!'});
    } 
    if (email)
    {
        const emailExistente = await user.findOne({email:email});
        if (emailExistente){
            erros.push({texto: 'Email já cadastrado!'}); 
        }
    }
    
    if (erros.length > 0)
    {
        res.render('users/signup', {erros, nome, email});
    } else {
        const newUser = new user({nome, email, senha});
        newUser.senha = await newUser.encryptPassword(senha);
        await newUser.save();
        req.flash('success_msg', 'Registro realizado com sucesso!');
        res.redirect('/users/signin');
    }

});


module.exports = router;