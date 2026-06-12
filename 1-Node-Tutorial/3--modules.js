console.log("Hi Everyone")
console.log(__dirname)

const names = require('./4-name')
const batsman = require('./5-utils')

const data = require('./6-alternative')
require('./1-default')

batsman(names.opener)
batsman(names.finisher)

console.log(data)
console.log(names)

data.items[0] = 'item3'
console.log(data)

require(`./7.mind-grenade`)


