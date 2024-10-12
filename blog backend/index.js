const express = require('express')
const app = express()

require('dotenv').config();

PORT = process.env.PORT || 5000;

app.use(express.json()) 

const blogRoutes = require('./routes/blogRoutes')
app.use('/api/v1/',blogRoutes)



app.listen(PORT , () => {
    console.log(`server at ${PORT}`)
})

app.get('/', (req, res) =>{
        res.send(`<h1>Hello home page</h1>`)
} )

const blogDb = require('./config/database')
blogDb();