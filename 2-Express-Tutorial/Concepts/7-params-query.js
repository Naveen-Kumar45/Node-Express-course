const express = require("express")
const app = express()

const {products,people} = require("../data.js")
//console.log(people)
//console.log(products)


app.get("/", (req,res) => {
    res.send("<h1>Welcome to our Home Page</h1> <a href='/api/data'>Go to Products</a>")
})

app.get("/api/data", (req,res) => {
    console.log(req.url)
    const item = products.map((product) => {
        const {id,name,image,desc,} = product
        return {id,name,image,desc}
    })
    res.json(item)
})

app.get("/api/data/query", (req,res) => {
    console.log(req.query)
    const {search,age,limit} = req.query
    let specificProducts = [...products]
    let specificPersons = [...people]
    /*const queryProducts = specificProducts.filter((product) => {
        return product.name.startsWith(search)
    })*/

    let queryPersons = specificPersons.filter((person) => {
        return person.name.includes(search) || person.age === Number(age)
    })

    if (queryPersons.length < 1){
        return res.send("<h1>There are no persons with your requirements</h1>")
    }
    if(limit){
        queryPersons = queryPersons.slice(0,Number(limit))
    }
    //res.json(queryProducts)
    res.json(queryPersons)

})

app.get("/api/data/:productID", (req,res) => {
    const {productID} = req.params
    console.log(productID)
    const specificProduct = products.find((item) => {
        return item.id === Number(productID)
    })
    
    if (specificProduct === undefined){
        return res.status(404).send(`<h1>Product with ID ${productID} not found</h1>`)
    }

    res.json(specificProduct)
})

app.get("/api/data/products/:productID/persons/:personID",(req,res) => { 
    //console.log(req.url)
    //console.log(req.query)
    console.log(req.params)
    const {personID,productID} = req.params
    const person = people.find((item) => {
        return item.id === Number(personID)
    })
    const product = products.find((item) => {
        return item.id === Number(productID)
    })

    if (!person){
        return res.status(404).send(`<h1>Person with ID ${personID} not found</h2>`)
    }
    
    if (product === undefined){
        return res.status(404).send(`<h1>Product with ID ${productID} not found</h1>`)
    }

    res.json({person,product})
})


app.use((req,res) => {
    res.status(404).send("<h1>Page Not Found</h1>")
})

const port=5000
app.listen(port,() => {
    console.log(`Server is running on the port ${port}`)
})

/*fetch("http://localhost:5000/api/data")
        .then(function(response){
           return response.json();
        })
        .then(function(data){
            console.log(data)
        })
*/



