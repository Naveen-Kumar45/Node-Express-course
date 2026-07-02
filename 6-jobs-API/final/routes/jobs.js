const express = require("express")
const router = express.Router()

const {getAllJobs, getJob, updateJob, deleteJob, postJob} = require("../controllers/jobs.js")

router.route("/").get(getAllJobs).post(postJob)
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob)


module.exports=router