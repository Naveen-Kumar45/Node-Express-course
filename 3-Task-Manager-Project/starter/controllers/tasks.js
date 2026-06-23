const Task = require("../models/TASK.js")

const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({
            success : true,
            tasks : tasks
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}


const getTask = async (req,res) => {
    try {
        const task = await Task.findOne({_id : req.params.id } /*, 'name completed'(the response will be given with these keys)*/ ).exec()

        if (task === null){
            return res.status(404).json({msg : `The ID ${req.params.id} does'nt contain any information`})
        }

        res.status(200).json({task})
    }
    catch(err){
        res.status(500).send(err)
    }
}


const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    }
    catch(err){
        res.status(500).send(err)
    }
}


const updateTask = async (req,res) => {
    try{
        const task = await Task.findOneAndUpdate({_id : req.params.id},req.body,{
            returnDocument : 'after', // return the updated doc
            //returnDocument : 'before', // return the old doc
        })

        if (!task){
            return res.status(404).json({msg : `The ID ${req.params.id} does'nt contain any information`})
        }

        res.status(201).json({task})
    }
    catch(err){
        res.status(500).send(err)
    }
}


const deleteTask = async (req,res) => {
    const taskID = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id : req.params.id})

        if (!task){
            return res.status(404).json({msg :`The ID ${taskID} does'nt contain any information`})
        }

        res.status(200).json({task})
    }
    catch(err){
        res.status(500).send(err)
    }
}

/*const editTask = async (req,res) => {
    try{
        const task = await Task.findOneAndReplace({_id : req.params.id},req.body,{
            returnDocument : 'after',
            runValidators : true,
            overwrite : true
        })

        if (!task){
            return res.status(404).json({msg : `The ID ${req.params.id} does'nt contain any information`})
        }

        res.status(201).json({task})
    }
    catch(err){
        res.status(500).send(err)
    }
}*/

module.exports={getTasks, getTask, createTask, updateTask, deleteTask}