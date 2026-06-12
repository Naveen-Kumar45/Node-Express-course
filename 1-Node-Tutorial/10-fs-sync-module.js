const {readFileSync,writeFileSync, unlinkSync} = require('fs');


// readFileSync method reads the entire contents of a file. It takes the path to the file and the encoding as arguments and returns the contents of the file as a string.
const first = readFileSync('./content/first.txt','utf8')
const second = readFileSync('./content/second.txt','utf8')

console.log(first)
console.log(second)

// writeFileSync method writes data to a file, replacing the file if it already exists. If the file does not exist, it creates a new file.
writeFileSync('./content/result-sync.txt',
    `Here is the result: ${first}, ${second}`
)


// The flag option with the value 'a' stands for "append". When you use this option, it tells the writeFileSync method to append the specified content to the end of the file if it already exists, rather than overwriting it. If the file does not exist, it will create a new file and write the content to it.
writeFileSync('./content/third.txt',
    ' This is Node.js',
    {flag : 'a'}
)

unlinkSync('./content/third.txt') // This method is used to delete a file. It takes the path to the file as an argument and removes the file from the file system. In this case, it deletes the 'third.txt' file from the 'content' directory.

// If the file does not exist, it creates a new file.
writeFileSync('./fourth.txt',
    ' This is Node.js',
)