const mongoose = require('mongoose')

require('dotenv').config();

const blogDb = () => {

        mongoose.connect(process.env.DATABASE_URL)
        .then( 
            () => console.log('Database connection successfully')
        )
        .catch( (error) => {
            console.error(error)
            console.log('Database error')
            process.exit(1)
        })
}

module.exports = blogDb;