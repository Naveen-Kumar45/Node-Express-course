const {people} = require("../data.js")

const getPeople = (req,res)=>{
    req.data=people
    console.log(req.data)
    //console.log(req)
    res.send(
        {success : true,
        data : people
    })
}

const putPeople = (req,res)=>{
    const {id} = req.params
    const {name} = req.body

    const person = people.find(function(person){
        return person.id === Number(id)
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the ID ${id}`
        })
    }

    const newPeople = people.map((person)=>{
        if (person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({
        success : true,
        people : newPeople
    })
}


const deletePeople = (req,res)=>{
    const {id} = req.params

    const person = people.find(function(person){
        return person.id === Number(id)
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the ID ${id}`
        })
    }

    const newPeople = people.filter((person)=>{
        return person.id !== Number(id)
    })
    res.status(200).json({
        success : true,
        people : newPeople
    })

}

const putPeopleJS = (req,res)=>{
    const {name} = req.body

    const person = people.find(function(person){
        return person.name === name
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the name ${name}`
        })
    }

    const newPeople = people.map((person)=>{
        if (person.name === name){
            person.name = "Mitchell"
        }
        return person
    })
    res.status(201).json({
        success : true,
        people : newPeople
    })
}

const deletePeopleJS = (req,res)=>{
    console.log(req.body)
    const {name} = req.body

    const person = people.find(function(person){
        return person.name === name
    })

    if (!person){
        return res.status(404).send({
            success : false,
            msg : `There is no person with the name ${name}`
        })
    }

    const newPeople = people.filter((person)=>{
        return person.name !== name
    })
    res.status(200).json({
        success : true,
        people : newPeople
    })

}

module.exports = {deletePeople, putPeople, getPeople, putPeopleJS, deletePeopleJS}