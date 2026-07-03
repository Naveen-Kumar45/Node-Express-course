const Job = require("../models/job-schema")
const createError = require("http-errors")

const getAllJobs = async(req,res) => {
    const jobs = await Job.find({})
    res.status(200).json({jobsCount : jobs.length, jobs})
}

const getJob = async (req,res) => {
    //console.log(req.params.id)
    //console.log(req.user.userId)
    const jobId = req.params.id 
    const userId = req.user.userId
    const job = await Job.findOne({
        _id : jobId,
        createdBy : userId
    })

    res.status(200).json(job)
}

const postJob = async(req,res) => {
    console.log(req.body)
    req.body.createdBy = req.user.userId
    console.log(req.body)
    const job = await Job.create(req.body)

    res.status(201).json({job})
}

const updateJob = async (req,res) => {
    //console.log(req.body)
    const {
        params : { id : jobId},
        user : {userId },
        body : {company,position}
    } = req

    if ( company === "" || position === ""){
        throw createError.BadRequest("Company and position fields cannot be empty")
    }

    const job = await Job.findByIdAndUpdate({_id : jobId, createdBy : userId}, req.body, { returnDocument : 'after', runValidators : true})

    if (!job){
        throw createError(401, `No Job with the ID ${jobId}`)
    }

    res.status(201).json(job)
}

const deleteJob = async (req,res) => {
    const {
        params : {id : jobId},
        user : {userId}
    } = req

    const job = await Job.findByIdAndDelete({_id : jobId, createdBy : userId})

    if (!job){
        throw createError.BadRequest(`No Job with the ID ${jobId}`)
    }

    res.status(200).json(job)
}



module.exports = {getAllJobs, getJob, updateJob, deleteJob, postJob}

