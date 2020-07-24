const router = require('express').Router();
const list = require('../models/ListModel');
const { authenticate } = require('passport');
const {Autenticado} = require('../helpers/auth');
const task = require('../models/taskModel');

router.get('/lists/add', Autenticado, (req, res) => {
    res.render('lists/newList')
});

router.get('/lists/edit/:id', Autenticado, async (req, res) => {
    const lista = await list.findById(req.params.id).lean();
    res.render('lists/editList', {lista});

})

router.get('/lists',  Autenticado, async (req, res) => {
    const listas = await list.find({usuario:req.user._id}).sort({data : 'desc'}).lean();
    const tarefas = await task.find({usuario:req.user._id}).sort({data : 'asc'}).lean();
    res.render('lists/allLists', {tarefas, listas});
} )

router.delete('/lists/delete/:id', Autenticado, async (req, res) => {
    await list.findByIdAndDelete(req.params.id);
    await task.deleteMany({lista:req.params.id})
    req.flash('success_msg', 'Check-list excluída com sucesso!');     
    res.redirect('/lists');
})

router.post('/lists/editList', Autenticado, async (req, res) => {
    const {id, titulo, descricao} = req.body;

    const erros = [];
    if (!titulo){
        erros.push({texto: 'Informe um título para a lista!'});
    }
    if (erros.length > 0)
    {
        const lista = await list.findById(id).lean();
        res.render('lists/editList', {erros, lista});
    } else {
        await list.findByIdAndUpdate(id, {titulo, descricao})
        req.flash('success_msg', 'Check-list atualizada com sucesso!');        
        res.redirect('/lists');
    }

} )


router.post('/lists/newList', Autenticado, async (req, res) => {
    const {titulo, descricao} = req.body;
    const erros = [];
    if (!titulo){
        erros.push({texto: 'Informe um título para a lista!'});
    }
    if (erros.length > 0)
    {
        res.render('lists/newList', {erros, titulo, descricao});
    } else {
        const newList = new list({titulo, descricao});
        newList.usuario = req.user._id;
        await newList.save();
        req.flash('success_msg', 'Check-list criada com sucesso!');
        res.redirect('/lists');
    }

} )

module.exports = router;