const {readFile,writeFile} = require('fs');



// The readFile method is asynchronous, which means it does not block the execution of the program while it reads the file. Instead, it takes a callback function as an argument that is called when the file has been read. The callback function receives two arguments: an error object (if an error occurred) and the data read from the file.
/* The below is an example of how to use the readFile method to read the contents of a file and then write the result to another file using the writeFile method, demonstrating the asynchronous nature of these operations in Node.js.
 This is achieved through nested callbacks, which is a common pattern in Node.js for handling asynchronous operations that depend on each other. The console.log statements are used to demonstrate the order of execution and the asynchronous nature of the operations. */
readFile('./content/first.txt','utf8',(err,data) => {

    console.log("Started a new task") // This will be logged before the file is read, demonstrating the asynchronous nature of the readFile method.
    if(err){
        console.log(err) // Log the error if it occurs
        console.log("Error reading the file") // Log a custom error message
        return
    };
    const first = data;
    
    // the second readFile is nested inside the callback of the first readFile to ensure that it is executed only after the first file has been successfully read. This is a common pattern in Node.js for handling asynchronous operations that depend on each other.
    readFile('./content/second.txt','utf8',(err,data) => {
        if (err){
            console.log(err) 
            console.log("Error reading the file")
            return
        }
        const second = data;
        
        // the writeFile method is nested inside the callback of the second readFile to ensure that it is executed only after both files have been successfully read. This demonstrates how asynchronous operations can be chained together in Node.js.
        writeFile('./content/result-async.txt',
            `Here is the result; ${first}, ${second}`, (err) => {
                if (err){
                    console.log(err)
                    console.log("Error writing to the file")
                    return
                }
                console.log("File written successfully")
                console.log("Completed the task") // This will be logged after the file is written, demonstrating the asynchronous nature of the writeFile method.
            }
        )
    })
    console.log("Task is in progress...") // This will be logged before the file is read and written, demonstrating the asynchronous nature of the readFile method.
});

// The above code demonstrates the asynchronous nature of Node.js, where the execution of tasks does not block the main thread, allowing for efficient handling of I/O operations. The use of callbacks allows for handling the results of asynchronous operations once they are completed, without blocking the execution of other tasks in the program.
// However, this pattern can lead to "callback hell" when there are multiple nested callbacks, making the code difficult to read and maintain. To address this issue, modern JavaScript provides promises and async/await syntax, which can help to write cleaner and more readable asynchronous code.


/* Now the same code can be written using promises and async/await to avoid callback hell and make the code more readable and maintainable. 
This is achieved by using the fs.promises API, which provides promise-based versions of the readFile and writeFile methods. The async/await syntax allows for writing asynchronous code in a synchronous-like manner, making it easier to read and understand the flow of the program. */

const fs = require('fs/promises') // or require('fs').promises or const {readFile, writeFile} = require('fs').promises

const start = async () => {

    console.log("Started a new task using async/await") // This will be logged before the file is read, demonstrating the asynchronous nature of the readFile method.

    try {
        const first = await fs.readFile('./content/first.txt','utf-8')
        const second = await fs.readFile('./content/second.txt','utf-8')
        await fs.writeFile('./content/result-async.txt',
            `\n Here is the result from async/await: ${first}, ${second}`,
            { flag: 'a' }
        )
        console.log("File written successfully using async/await") // This will be logged after the file is written, demonstrating the asynchronous nature of the writeFile method.
    }
    catch (error){ // This will catch any errors that occur during the asynchronous operations and log them to the console.
        console.log( `Error occured: ${error}`) // Log the error message if an error occurs
        console.log("Error occurred while reading or writing the file using async/await") 
    }
}

start() // This will start the asynchronous operations defined in the start function. The execution of this function will not block the main thread, allowing for efficient handling of I/O operations in Node.js.
