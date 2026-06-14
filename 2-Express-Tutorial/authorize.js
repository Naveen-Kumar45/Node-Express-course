const auth = (req,res,next) => {
    const {user} =req.query;
    console.log(req.query)
    if (user === "Rama"){
        req.user = {name : "Rama" , id : "2016"}
        return res.send(`Welcome to  our website ${user}`)
        
    }
    else if (user === undefined){
        return next()
    }
    
    res.send(`<h1>There is no account registered with the username of ${user}</h1>`)

    
}

module.exports = auth