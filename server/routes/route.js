const express = require('express');
const router = express.Router();
const Todo = require('../models/todoSchema');


router.post('/',async(req,res)=>{
    try{
        const {title}=req.body;
        const todo=new Todo({title});

        const newTodo = await todo.save();
        res.status(200).json(newTodo);

    } catch(error){
        res.status(500).json({message : error.message});

    }
  
})

router.get('/',async(req,res)=>{
    try{
        const todos = await Todo.find();
    res.json(todos);
} catch (error){
    res.status(500).json({message:error.message});

}
})

//get specified document based ID
router.get('/:id',async (req,res)=>{
    try{
        const todo=await Todo.findById(req.params.id);
        if(todo==null){
            return res.status(404).json({message:"Item does not exist"});
        }
        return res.json(todo);
    } catch(error){
        res.status(404).json({message: error.message});

    }
})


router.delete('/:id', async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id);
        if(todo==null){
         return response.status(200).json({ message: "Item Does exist" })
        }
        return response.status(200).json({message:"Item deleted successfully"});
    } catch (error) {
      response.status(500).json({message:error.message})
    }

})

router.patch('/:id', async (request, response) => {
    try {
        const { title } = request.body;
        const todo = await Todo.findByIdAndUpdate(request.params.id);
        todo.title = title;

        const updatedTodo = await todo.save();
        response.status(200).json(updatedTodo);
    } catch (error) {
        response.status(500).json({message:error.message})
    }
})


router.put('/complete/:id', async (req, res) => {
    try {
        const task = await Todo.findById(req.params.id);
        if(task){
            task.completed = !task.completed;
        }

        const upTodo = await task.save();
        res.json(upTodo)
    } catch (error) {
            console.log(error);
    }
})



module.exports = router;