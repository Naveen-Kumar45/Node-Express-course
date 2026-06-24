const getTasks = async () => {
    try {
        const tasks = await axios.get("/api/v1/tasks")
        console.log(tasks)
        console.log(tasks.data)
        //console.log(tasks.data[0])
        console.log(tasks.statusText)

    }
    catch(err){
        console.log(err)
    }
}

getTasks()