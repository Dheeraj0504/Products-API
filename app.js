const express = require('express')


const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'productAPI.db')
let database = null 

const app = express()
app.use(express.json())


const initilizeDBAndServer = async () => {
    try {
        database = await open({
            filename:dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => {
            console.log("Server Running at http://localhost:3000")
        })
    } catch (error) {
        console.log(`DB ERROR: ${error.message}`)
        process.exit(1)
    }
}
initilizeDBAndServer()

// Insert products details 
app.post('/add-products', async (request, response) =>{
    const {products} = request.body 

    if (!Array.isArray(products) || !products.every(p => p.name && p.price && p.quantity)){
        return response.status(400).json({error: "Each products must have name, price and quantity"})
    }

    try {
        const addedProducts = []

        for (const product of products){
            const addProductsDetails = `
                INSERT INTO products (name, price, quantity)
                VALUES (?, ?, ?)
            `;
            await database.run(addProductsDetails, [product.name, product.price, product.quantity]);
            addedProducts.push(product)    
        }
        response.status(200).json({
            message: "Products Added Successfully",
            addedProducts: addedProducts
        })
        
    } catch (error) {
        console.log(`Error: ${error.message}`)
        response.status(500).json({error: "Internal Server Error"})
    }
})

// Claculate total values 
app.get('/calculate-total', async (request, response) => {
    try {
        const getResult = `
            SELECT SUM(price * quantity) AS totalValue
            FROM products
        `;
        const totalResult = await database.get(getResult)

        if (totalResult.totalValue === null){
            response.status(200).json({totalValue: 0})
        }
        else {
            response.status(200).json({totalValue: totalResult.totalValue})
        }        
        
    } catch (error) {
        console.log(`Error: ${error.message}`)
        response.status(500).json({Error: error.message})
    }
})

// Delete Products 
app.delete('/delete-product/:id', async (request, response) => {
    const {id} = request.params 

    try {

        const checkProduct = await database.get(
            `   SELECT * 
                FROM products
                WHERE id = ?        
            `, [id]
        );
        if (!checkProduct){
            response.status(404).json({message: "Product Not Found"})
        } 

        await database.run( 'DELETE FROM products WHERE id = ?', id)
        response.status(200).json({message: "Product Deleted Successfully"})

        
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        response.status(500).json({ERROR: error.message})
    }
})