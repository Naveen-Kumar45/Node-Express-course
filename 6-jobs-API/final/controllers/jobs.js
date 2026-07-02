
const getAllJobs = (req,res) => {
    res.status(200).send("Here is all jobs")
}

const getJob = (req,res) => {
    console.log(req.id)
    res.status(200).send("Here is a job")
}

const postJob = (req,res) => {
    res.status(201).send("Job is Posted")
}

const deleteJob = (req,res) => {
    res.status(200).send("Job is deleted")
}

const updateJob = (req,res) => {
    res.status(201).send("Job is updated")
}

module.exports = {getAllJobs, getJob, updateJob, deleteJob, postJob}

