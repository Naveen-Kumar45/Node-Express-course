const express = require("express")
const router = express.Router()


router.post('/',(req,res)=>{
    const {username} = req.body
    console.log(username)
    if (!username){
        return res.status(400).send(`Please Enter a Valid Credentials`)
    }
    res.status(200).send(`Welcome to our Website ${username}`)
})

module.exports = router