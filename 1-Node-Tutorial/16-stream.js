const {createReadStream} = require('fs') // This line imports the createReadStream function from the 'fs' module, which is a built-in module in Node.js for working with the file system. The createReadStream function is used to create a readable stream that allows us to read data from a file in chunks, which is especially useful for handling large files without consuming too much memory.

const stream = createReadStream('./content/big.txt', {
    encoding : 'utf8',
    highWaterMark : 90000 // highWaterMark is a property that determines the maximum amount of data (in bytes) that can be stored in the internal buffer of a readable stream before it stops reading from the underlying resource. In this case, setting highWaterMark to 90000 means that the stream will read data in chunks of up to 90,000 bytes at a time. This can help improve performance when working with large files by allowing the stream to read and process data in manageable chunks rather than trying to read the entire file into memory at once.
}) // This line creates a readable stream for the file located at './content/big.txt' with the encoding set to 'utf8'. The createReadStream function takes two arguments: the path to the file and an optional encoding. By specifying 'utf8', we ensure that the data read from the file will be treated as a string rather than a buffer, allowing us to work with it more easily in our application.
 
stream.on('open',() => { // This line sets up an event listener for the 'open' event on the stream. The 'open' event is emitted when the stream is successfully opened and ready to be read from. The callback function provided to the on method will be executed when the 'open' event occurs, allowing us to perform any necessary actions or log messages at that time. In this case, we log "Stream opened" to the console to indicate that the stream has been successfully opened.
    console.log("Stream opened")
});

stream.on('data', (result) => { // This line sets up an event listener for the 'data' event on the stream. The 'data' event is emitted whenever a chunk of data is available to be read from the stream. The callback function provided to the on method will be executed each time a chunk of data is read, and the chunk of data will be passed as an argument (in this case, named 'result'). In this example, we log the length of the chunk of data to the console using result.length, which gives us an indication of how much data has been read in each chunk.
    console.log(result.length)
});

stream.on('error', (err) => { // This line sets up an event listener for the 'error' event on the stream. The 'error' event is emitted when an error occurs while working with the stream, such as if the file cannot be found or if there is an issue with reading the file. The callback function provided to the on method will be executed when an error occurs, and the error object will be passed as an argument (in this case, named 'err'). In this example, we log the error to the console using console.log(err), allowing us to see what went wrong and potentially handle the error in a more specific way if needed.
    console.log(err)
});

stream.on('end', () => {    // This line sets up an event listener for the 'end' event on the stream. The 'end' event is emitted when there is no more data to be read from the stream, indicating that we have reached the end of the file. The callback function provided to the on method will be executed when the 'end' event occurs, allowing us to perform any necessary cleanup or log messages at that time. In this case, we log "Stream ended" to the console to indicate that we have finished reading from the stream and have reached the end of the file.
    console.log("Stream ended")
});

stream.on('close', () => { //  This line sets up an event listener for the 'close' event on the stream. The 'close' event is emitted when the stream is closed, which can happen after the 'end' event or if there is an error that causes the stream to close prematurely. The callback function provided to the on method will be executed when the 'close' event occurs, allowing us to perform any necessary cleanup or log messages at that time. In this case, we log "Stream closed" to the console to indicate that the stream has been closed, whether it was due to reaching the end of the file or due to an error.
    console.log("Stream closed")
});


// the below code demonstrates how to read data in a paused mode using the 'readable' event. In this mode, the stream will not automatically read data as it becomes available. Instead, it will emit a 'readable' event when there is data to be read, and we can use the read() method to read the data in chunks. This allows us to have more control over the flow of data and can be useful in situations where we want to process the data in a specific way or when we want to implement backpressure to prevent overwhelming our application with too much data at once.
const pauseStream = createReadStream('./content/result-async.txt',"utf8")

pauseStream.on('readable', () => { // This line sets up an event listener for the 'readable' event on the pauseStream. The 'readable' event is emitted when there is data available to be read from the stream, but it does not automatically read the data for you. Instead, it allows you to control when and how much data to read from the stream using the read() method. In this example, we use a while loop to continuously call pauseStream.read() until there is no more data to read (i.e., until it returns null). Inside the loop, we log each chunk of data that is read from the stream to the console. This approach gives us more control over the flow of data and allows us to process it in a way that suits our needs.
    let chunk; 
    while ((chunk = pauseStream.read()) !== null){
        console.log(chunk)
    }
})