const router = require('express').Router();
const task = require('../models/taskModel');
const { authenticate } = require('passport');
const {Autenticado} = require('../helpers/auth');

router.get('/tasks/concluir', Autenticado, async (req, res) => {
    const id = req.query.idLista;

    const tarefa = await task.findById(id);
    const ok = ! tarefa.ok; 
    await task.findByIdAndUpdate(id, {ok});
    res.redirect('/lists');    
})

router.get('/tasks/excluir', Autenticado, async (req, res) => {
    const id = req.query.idLista;
    await task.findByIdAndDelete(id);
    res.redirect('/lists');    
})




router.post('/tasks/add/:idList', Autenticado, async (req, res) => {
    const idList = req.params.idList;
    const {descTarefa} = req.body;
    const ok = false;
    const erros = [];
    if (!descTarefa){
        erros.push({texto: 'Informe a tarefa!'});
    }
    if (erros.length > 0)
    {
        res.redirect('/lists');
    } else {
        const newTask = new task({descTarefa, ok});
        newTask.lista = idList;
        newTask.usuario = req.user._id;
        await newTask.save();
        req.flash('success_msg', 'Tarefa criada com sucesso!');
        res.redirect('/lists');
    }

} )

module.exports = router;