const express = require("express")
const router = express.Router()

//const {people} = require("../data.js")
const {deletePeople, putPeople, getPeople, putPeopleJS, deletePeopleJS, getData} = require("../controllers/people.js")

//router.get('/',getPeople)

//router.put('/:id',putPeople)

//router.delete("/:id",deletePeople)

router.route('/:id').put(putPeople).delete(deletePeople)
router.route('/').get(getPeople)
router.route('/:username').get(getData)
//router.route("/").put(putPeopleJS)
//router.route("/").delete(deletePeopleJS)
module.exports = router