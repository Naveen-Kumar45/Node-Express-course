/* 
  Events in Node.js are a fundamental part of the event-driven architecture. They allow us to create and handle custom events, enabling us to build applications that can respond to various actions or occurrences. The 'events' module in Node.js provides the EventEmitter class, which is used to create and manage events.
  The EventEmitter class allows us to define custom events and register listeners for those events. When an event is emitted, all the registered listeners for that event are called in the order they were registered. This allows us to create a flexible and modular architecture for our applications, where different parts of the code can respond to specific events without being tightly coupled together.
  In the example provided, we create an instance of EventEmitter and register two listeners for the "orderPlaced" event. When the event is emitted with the order data, both listeners will be executed, allowing us to handle the order placement in different ways (e.g., sending a thank you message and providing delivery information).
*/

// eventEmitter is a class that allows us to create and handle custom events in Node.js. It is part of the 'events' module, which is built into Node.js.

const EventEmitter = require("events") // This line imports the EventEmitter class from the 'events' module, allowing us to create an instance of EventEmitter and use its functionality to handle custom events in our application.
const Emitter = new EventEmitter()

Emitter.on("orderPlaced", (data) => { // This line registers an event listener for the "orderPlaced" event. The on method is used to listen for a specific event, and it takes two arguments: the name of the event ("orderPlaced") and a callback function that will be executed when the event is emitted. The callback function receives the data passed when the event is emitted as an argument (in this case, the data object containing order details).
    console.log(`Thank you ${data.name} for your order of ${data.product}`)
})

Emitter.on("orderPlaced", (data) => {
    console.log(`Your order will be delivered to : ${data.address}`)
})

data = {
    name : "Nehal",
    orderId : 12345,
    product : "Laptop",
    address : "123 Main Street, City, Country"
}
Emitter.emit("orderPlaced",data) // This line emits the "orderPlaced" event, passing the data object as an argument. When this event is emitted, any listeners that are registered for the "orderPlaced" event will be called with the provided data. In this case, the listener will log a thank you message to the console using the name property from the data object.


const event = new EventEmitter()

function event1(){
    console.log("Good Morning Teacher")
}

function event2(){ 
    console.log("How are you teacher?")
}
//event.on("greet",event1)
//event.on("greet",event2)

event.once("greet",event1)
event.once("greet",event2)


event.on("Wishes", ()=>{
    console.log(`Happy Birthday Teacher`)
})

//event.off("greet",event1)
//event.removeAllListeners("greet")
//event.removeAllListeners()
event.emit("greet")
event.emit("Wishes")
event.emit("greet")








