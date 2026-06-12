const {readFile,writeFile} = require('fs') // or const fs = require('fs') and then use fs.readFile and fs.writeFile

readFile('./content/first.txt','utf8',(err,data) => {

    console.log("Started a new task")
    if (err){
        console.log(err)
    }
    console.log(data)
    console.log("Completed the task")
})

console.log("Starting the next task")