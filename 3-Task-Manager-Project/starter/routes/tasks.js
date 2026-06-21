const express = require("express")
const router = express.Router()

const {getTasks, getTask, createTask, updateTask, deleteTask} = require("../controllers/tasks.js")
/*router.get("/",getTasks)
router.post("/",postTask)
router.get("/:id",getTask)
router.patch("/:id",updateTask)
router.delete("/:id",removeTask)*/


router.route("/").get(getTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router