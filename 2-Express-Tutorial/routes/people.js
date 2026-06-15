const express = require("express")
const router = express.Router()

//const {people} = require("../data.js")
const {deletePeople, putPeople, getPeople} = require("../controllers/people.js")

//router.get('/',getPeople)

//router.put('/:id',putPeople)

//router.delete("/:id",deletePeople)

router.route('/:id').put(putPeople).delete(deletePeople)
router.route('/').get(getPeople)
module.exports = router 