const Task = require("../models/TASK.js")
const asyncWrapper = require("../middlewares/asyncWrapper.js")
const errorCreation = require("http-errors")

const getTasks = asyncWrapper(async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
})


const getTask = async (req,res) => {
        const task = await Task.findOne({_id : req.params.id } /*, 'name completed'(the response will be given with these keys)*/ ).exec()

        if (task === null){
            const error = new Error(`The ID ${req.params.id} does'nt contain any information`)
            error.statusCode = 404
            throw error
        }

        res.status(200).json({task})
}


const createTask = asyncWrapper(async (req,res) => {
        const task = await Task.create(req.body)
        res.status(201).json(task)
})


const updateTask = async (req,res) => {
        const task = await Task.findOneAndUpdate({_id : req.params.id},req.body,{
            returnDocument : 'after', // return the updated doc
            //returnDocument : 'before', // return the old doc
            runValidators : true
        })

        if (!task){
            return res.status(404).json({msg : `The ID ${req.params.id} does'nt contain any information`})
        }

        res.status(201).json({task})
}


const deleteTask = async (req,res) => {
    const taskID = req.params.id
        const task = await Task.findOneAndDelete({_id : req.params.id})

        if (!task){
            throw errorCreation(404,`there is no task with the ID ${taskID}`)
        }

        res.status(200).json({task})
}

module.exports={getTasks, getTask, createTask, updateTask, deleteTask}



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