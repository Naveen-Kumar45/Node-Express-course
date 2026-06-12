const os = require('os')

// os platform
console.log(os.platform())

// info about current user
const user = os.userInfo()
console.log(user)
console.log(os.hostname())


// method returns the system uptime in seconds (System uptime is the continuous amount of time a computer or server has been running without being shut down or restarted.)
console.log(`The system Uptime is ${os.uptime()} seconds`)

console.log(os.type())
console.log(os.release())

// method returns the total amount of system memory in bytes
const bytesToGb = bytes => 
   (bytes / 1024 / 1024 / 1024).toFixed(2)


console.log(`Total memory: ${bytesToGb(os.totalmem())} GB`)
console.log(`Free memory: ${bytesToGb(os.freemem())} GB`)

// info about cpu
console.log(os.cpus())

// info about network
console.log(os.networkInterfaces())








