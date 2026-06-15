const express = require("express")
const router = express.Router()

let persons=["Rohit","Rahul","Saaho","Mitchell","Uday"]
router.get("/",(req,res)=>{
    req.data = persons
    res.status(201).send({
        success : true,
        data : persons
    })
    //console.log(req.data)
    //console.log(req)
})

router.post("/",(req,res) => {
    const newPerson = req.body
    console.log(newPerson)

    if (!newPerson.name){
        return res.status(400).send({
            success : false,
            msg : "Please enter a valid Username"
        })
    }
    persons.push(newPerson.name)
    console.log(persons)
    res.status(201).json({
        success : true,
        person : newPerson
    })
})

router.post('/postman',(req,res)=>{
    const {name} = req.body
    if (!name){
        return res.status(400).send({
            success : false,
            msg : "Please enter a valid Username"
        })
    }
    persons.push(name)
    res.status(201).send({
        success : true,
        data : name
    })

})

module.exports = router