const path = require('path');

// path module provides utilities for working with file and directory paths. It can be used to handle and transform file paths in a way that is consistent across different operating systems.
console.log(path.sep)

// join method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
const filePath = path.join('content','subcontent','test.txt')
console.log(filePath)

// basename method returns the last portion of a path, similar to the Unix basename command.
const base = path.basename(filePath)
console.log(base)

// resolve method resolves a sequence of paths or path segments into an absolute path.
const absolute = path.resolve(__dirname,'content','subcontent','test.txt');
console.log(absolute)

console.log(path.parse(absolute))
console.log(__filename)