const Product = require("../models/products.js")
const errorCreator = require("http-errors")

const getStaticProducts = async (req,res) => {
    //const products = await Product.find(req.query)
    //const products = await Product.find({}).sort('name createdAt')
    const products = await Product.find({price :{ '$gt' : 40},rating : {'$gt' : 0}}).select('name price rating')
    //const products = await Product.find()
    
    if (!products.length){
        throw errorCreator(404,"No Tasks Found")
    }

    res.status(200).json({
        nbHits : products.length,
        products
    })
}

const getProducts = async (req,res) => {
    const queryObject = {}
    const {featured, company, name, sort, fields, page, limit, numericalFilters} = req.query

    
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company 
    }

    if (name) {
        queryObject.name = { $regex : name, $options : 'i'}
    }

    console.log(numericalFilters);

    if (numericalFilters) {
        const symbolsMap ={
            ">" : '$gt',
            "<" : '$lt',
            ">=" : '$gte',
            "<=" : '$lte',
            "=" : '$eq'
        }

        const regEx = /(>=|<=|>|<|=)/g

        let filters = numericalFilters.replace(regEx,(match) => {
            return `-${symbolsMap[match]}-`        
        })

        console.log(filters)
        
        const options = ['price', 'rating'];

        filters=filters.split(",")
        for (let item of filters){
            let [field,operator,value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = { [operator] : Number(value)}
            }
        }

    }
    console.log(queryObject)

    let result =  Product.find(queryObject)

    /*if (sort){
        const sortList = sort.split(",").join(" ")
        //console.log(sortList)
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }*/

    result = result.sort(sort ? sort.split(",").join(" ") : '-price')

    if (fields){
        const fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList)
    }


    console.log(page,limit)
    const pages = Number(page) || 1
    const limits = Number(limit)
    const skip = (pages - 1) * limits

    result = result.skip(skip).limit(limits);

    const products = await result

    if (!products.length){
        throw errorCreator(404,"No Tasks Found")
    }

    res.status(200).json({
        nbHits : products.length,
        products : products
    })
}

module.exports = {getProducts, getStaticProducts}

