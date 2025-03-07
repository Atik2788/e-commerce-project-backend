const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./utiles/db")
require('dotenv').config()
const port = process.env.PORT
dbConnect()

app.use(cors({
    origin : ['http://localhost:3000'],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json())
// app.use(cookieParser())

app.use(cookieParser());



app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))

app.get('/', (req, res) => res.send('My backend'))


app.listen(port, () => console.log(`Server is running on port: ${port} `))